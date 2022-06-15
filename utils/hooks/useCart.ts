import React, { useCallback, useEffect, useReducer, useState } from 'react';
import useAuth from '../auth/useAuth';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';

export type CartItem = {
  id: string;
  quantity: number;
} & (
  | {
      type: 'original';
    }
  | { type: 'print'; size: string }
);
export type Cart = CartItem[];

export default function useCart() {
  const { user, userData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [cart, updateCart] = useReducer(
    (
      state: Cart,
      [action, target]:
        | ['removeItem', string]
        | ['addItem', CartItem]
        | ['addItems', Cart]
        | ['setAllItems', Cart]
    ) => {
      switch (action) {
        case 'addItem':
          return [
            target,
            ...state.filter((stateItem) => stateItem.id !== target.id),
          ];
        case 'addItems':
          return [
            ...target,
            ...state.filter((stateItem) =>
              target.every((targetItem) => targetItem.id !== stateItem.id)
            ),
          ];
        case 'removeItem':
          return state.filter((stateItem) => stateItem.id !== target);
        case 'setAllItems':
          return target;
        default:
          throw new Error('Unexpected action in updateCart: ' + action);
      }
    },
    []
  );

  /**
   * Adds the given item to the cart. If an item with the same ID already exists
   * in the cart, it will be replaced with the provided item.
   */
  const addCartItem = useCallback(
    (item: CartItem) => updateCart(['addItem', item]),
    [updateCart]
  );
  const removeCartItem = useCallback(
    (itemId: string) => updateCart(['removeItem', itemId]),
    [updateCart]
  );
  useEffect(() => {
    (async () => {
      const localStorageCart = JSON.parse(
        localStorage.getItem('pkazo-cart') || '[]'
      ) as Cart;
      const userCart = userData?.cart || [];

      // we add all the items in the user's cart, as well as all the items in
      // the localstorage cart that are not already in the user's cart, to the cart
      const newCart = [
        ...userCart,
        ...localStorageCart.filter((localCartItem) =>
          userCart.every((userCartItem) => localCartItem.id !== userCartItem.id)
        ),
      ];
      updateCart(['addItems', newCart]);
      setLoading(false);
    })();
  }, [userData]);
  useEffect(() => {
    (async () => {
      localStorage.setItem('pkazo-cart', JSON.stringify(cart));
      if (user) {
        const db = getFirestore();
        await updateDoc(doc(db, 'users', user.uid), {
          cart: cart,
        });
      }
    })();
  }, [cart]);
  return {
    cartLoading: loading,
    addCartItem,
    removeCartItem,
    cart,
  };
}
