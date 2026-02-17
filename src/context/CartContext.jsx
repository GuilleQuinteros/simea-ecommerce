import { createContext, useContext, useState, useEffect } from 'react';

// Creamos el contexto del carrito
const CartContext = createContext();

// Hook personalizado para usar el carrito en cualquier componente
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

// Provider del carrito que envuelve toda la aplicación
export const CartProvider = ({ children }) => {
  // Estado del carrito - se guarda en localStorage para persistencia
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('simea-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Estado para mostrar/ocultar el carrito
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('simea-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Agregar producto al carrito
  const addToCart = (product, size, color, quantity = 1) => {
    setCartItems(prevItems => {
      // Verificar si el producto con ese talle y color ya existe
      const existingItemIndex = prevItems.findIndex(
        item => 
          item.product.id === product.id && 
          item.size === size && 
          item.color === color
      );

      if (existingItemIndex > -1) {
        // Si existe, actualizamos la cantidad
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Si no existe, agregamos un nuevo item
        return [...prevItems, { 
          product, 
          size, 
          color, 
          quantity,
          id: `${product.id}-${size}-${color}` // ID único para este item
        }];
      }
    });
    setIsCartOpen(true); // Abrir el carrito al agregar
  };

  // Actualizar cantidad de un item
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Eliminar item del carrito
  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Vaciar todo el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Obtener cantidad total de items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Valor que se compartirá con todos los componentes
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    isCartOpen,
    setIsCartOpen
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
