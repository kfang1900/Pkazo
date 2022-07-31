import React, { useContext } from 'react';
import CartContext from './CartContext';

export default function useCart() {
  const cartContext = useContext(CartContext);
  return cartContext;
}
