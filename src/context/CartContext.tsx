import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../components/ProductCard';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (id: number, selectedColor?: string, selectedSize?: string) => void;
  updateQuantity: (id: number, quantity: number, selectedColor?: string, selectedSize?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  cartTotal: number;
  freeShippingThreshold: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('zenith_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 1,
          title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
          price: 109.95,
          image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
          category: "men's clothing",
          quantity: 1,
          selectedColor: 'Midnight Black',
          selectedSize: 'One Size'
        }
      ];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const freeShippingThreshold = 100;

  useEffect(() => {
    try {
      localStorage.setItem('zenith_cart', JSON.stringify(cart));
      const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      localStorage.setItem('cart_count', totalCount.toString());
    } catch (e) {
      console.error('Failed to save cart state:', e);
    }
  }, [cart]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const addToCart = (product: Product, quantity = 1, selectedColor?: string, selectedSize?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity,
            selectedColor: selectedColor || 'Default',
            selectedSize: selectedSize || 'Standard',
          },
        ];
      }
    });

    showToast(`Added "${product.title.slice(0, 24)}..." to Cart!`);
  };

  const removeFromCart = (id: number, selectedColor?: string, selectedSize?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
      )
    );
  };

  const updateQuantity = (id: number, quantity: number, selectedColor?: string, selectedSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, selectedColor, selectedSize);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartTotal,
        freeShippingThreshold,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
