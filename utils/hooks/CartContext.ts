import { createContext } from 'react';

export type CartItem = {
  id: string;
  quantity: number;
} & (
  | {
      type: 'original';
    }
  | { type: 'print'; size?: string }
);
export type Cart = CartItem[];

export type CartContextType = {
  cartVisible: boolean;
  showCart: () => void;
  hideCart: () => void;
  cart: Cart;
  cartLoading: boolean;
  addCartItem: (item: CartItem) => Promise<void>;
  removeCartItem: (itemId: string) => Promise<void>;
};

const CartContext = createContext<CartContextType>({
  cartVisible: false,
  showCart: () => {
    /* noop */
  },
  hideCart: () => {
    /* noop */
  },
  cart: [],
  cartLoading: false,
  addCartItem: async () => {
    /* noop */
  },
  removeCartItem: async () => {
    /* noop */
  },
});

export default CartContext;
