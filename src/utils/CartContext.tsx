import React, { createContext, useContext, useEffect, useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  totalCartItems: number;
  totalCartPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
} 

export const CartContext = createContext<CartContextProps>({
  cartItems: [],
  totalCartItems: 0,
  totalCartPrice: 0,
  addToCart: () => {},
  removeFromCart: () => {},
});

export function useCart() {
  return useContext(CartContext);
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem('cartItems');
    if (data) {
      setCartItems(JSON.parse(data));
    }
  } , []);

  useEffect(() => {
    setTotalCartItems(cartItems.reduce((acc, item) => acc + item.quantity, 0));
    setTotalCartPrice(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
  } , [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems, item];
      localStorage.setItem('cartItems', JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== itemId);
      localStorage.setItem('cartItems', JSON.stringify(newItems));
      return newItems;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, totalCartItems, totalCartPrice, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};