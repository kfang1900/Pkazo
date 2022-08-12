import useAuth from '../auth/useAuth';
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import CartContext, { Cart, CartItem } from './CartContext';
import asyncMemoizer from 'lru-memoizer';

export default function CartProvider({ children }: { children: ReactNode }) {
  const { user, userData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [cartVisible, setCartVisible] = useState(false);
  const showCart = () => setCartVisible(true);
  const hideCart = () => setCartVisible(false);
  const [{ initialized: cartInitialized, state: cart }, updateCart] =
    useReducer(
      (
        { initialized, state }: { initialized: boolean; state: Cart },
        [action, target]:
          | ['removeItem', string]
          | ['addItem', CartItem]
          | ['addItems', Cart]
          | ['setAllItems', Cart]
      ) => {
        switch (action) {
          case 'addItem':
            return {
              initialized: true,
              state: [
                target,
                ...state.filter((stateItem) => stateItem.id !== target.id),
              ],
            };
          case 'addItems':
            return {
              initialized: true,
              state: [
                ...target,
                ...state.filter((stateItem) =>
                  target.every((targetItem) => targetItem.id !== stateItem.id)
                ),
              ],
            };
          case 'removeItem':
            return {
              initialized: true,
              state: state.filter((stateItem) => stateItem.id !== target),
            };
          case 'setAllItems':
            return {
              initialized: true,
              state: target,
            };
          default:
            throw new Error('Unexpected action in updateCart: ' + action);
        }
      },
      {
        initialized: false,
        state: [],
      }
    );

  useEffect(() => {
    if (!cartInitialized) return;
    (async () => {
      localStorage.setItem('pkazo-cart', JSON.stringify(cart));
      if (user) {
        const db = getFirestore();
        await updateDoc(doc(db, 'users', user.uid), {
          cart: cart,
        });
      }
    })();
  }, [cart, cartInitialized]);

  /**
   * Adds the given item to the cart. If an item with the same ID already exists
   * in the cart, it will be replaced with the provided item.
   */
  const addCartItem = (item: CartItem) => {
    updateCart(['addItem', item]);
  };

  const removeCartItem = (itemId: string) => {
    updateCart(['removeItem', itemId]);
  };

  useEffect(() => {
    (async () => {
      const localStorageCart = ((): Cart => {
        try {
          return JSON.parse(localStorage.getItem('pkazo-cart') || '[]');
        } catch (e) {
          return [];
        }
      })();
      const userCart = userData?.cart || [];

      // we add all the items in the user's cart, as well as all the items in
      // the localstorage cart that are not already in the user's cart, to the cart
      const newCart = [
        ...userCart,
        ...localStorageCart.filter((localCartItem) =>
          userCart.every(
            (userCartItem: CartItem) => localCartItem.id !== userCartItem.id
          )
        ),
      ];
      updateCart(['addItems', newCart]);
      setLoading(false);
    })();
  }, [userData]);
  return (
    <CartContext.Provider
      value={{
        cartVisible,
        showCart,
        hideCart,
        cart,
        cartLoading: loading,
        addCartItem,
        removeCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
