import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { sum } from 'lodash';

// ----------------------------------------------------------------------

export type CartItem = {
  cartId: string;
  id: string;
  name: string;
  price: number;
  coverUrl: string;
  quantity: number;
  woodType: string;
  finish: string;
  subtotal: number;
};

export type CartContextProps = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'subtotal' | 'cartId'>) => 'added' | 'updated';
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (id: string, woodType: string, finish: string) => boolean;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextProps | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addToCart = (newItem: Omit<CartItem, 'subtotal' | 'cartId'>): 'added' | 'updated' => {
    let status: 'added' | 'updated' = 'added';
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.woodType === newItem.woodType &&
          item.finish === newItem.finish
      );

      if (existingItemIndex >= 0) {
        status = 'updated';
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        updatedCart[existingItemIndex].subtotal = updatedCart[existingItemIndex].quantity * updatedCart[existingItemIndex].price;
        return updatedCart;
      }

      return [...prevCart, { ...newItem, cartId: `${newItem.id}-${Date.now()}`, subtotal: newItem.quantity * newItem.price }];
    });
    return status;
  };

  const removeFromCart = (cartId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.cartId === cartId) {
          return {
            ...item,
            quantity,
            subtotal: quantity * item.price,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const isInCart = (id: string, woodType: string, finish: string): boolean => {
    return cart.some(
      (item) => item.id === id && item.woodType === woodType && item.finish === finish
    );
  };

  const totalItems = cart.length;
  const subtotal = sum(cart.map((item) => item.subtotal));

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
