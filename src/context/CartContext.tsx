'use client';

import {createContext, useContext, useEffect, useState} from 'react';

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<number>(0);
  const [cartRef, setCartRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const cookies = document.cookie.split('; ');
    const cartCookie = cookies.find(c => c.startsWith('cart='));

    if (cartCookie) {
      try {
        const value = decodeURIComponent(cartCookie.split('=')[1]);
        const parsed = JSON.parse(value); // parsiraš niz objekata
        const totalQuantity = parsed.reduce((sum: number, item: any) => sum + item.quantity, 0);
        setCartItems(totalQuantity);
      } catch (err) {
        console.error('Greška prilikom parsiranja cookie-ja:', err);
      }
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, cartRef, setCartRef }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
