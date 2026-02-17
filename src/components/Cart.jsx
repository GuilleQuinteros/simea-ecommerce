import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, calculatePrice, calculateCartTotal } from '../utils/helpers';
import { useState } from 'react';
import CheckoutModal from './CheckoutModal';

const Cart = () => {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  
  const total = calculateCartTotal(cartItems);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white z-50 flex flex-col border-l border-gray-200">
        {/* Header */}
        <div className="bg-black text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} />
            <h2 className="text-sm uppercase tracking-widest font-light">Carrito</h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="hover:bg-gray-800 p-2"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingBag size={48} className="mb-4 opacity-30" />
              <p className="text-xs uppercase tracking-widest">Carrito vacío</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => {
                const price = calculatePrice(item.product.pricing, item.quantity);
                return (
                  <div key={item.id} className="border border-gray-200 p-3">
                    <div className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover bg-gray-50"
                      />

                      <div className="flex-1">
                        <h3 className="text-xs uppercase tracking-wide text-black mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-[10px] text-gray-500 mb-2">
                          {item.size} • {item.color}
                        </p>
                        <p className="text-sm text-black">
                          {formatPrice(price)}
                        </p>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 bg-gray-100 hover:bg-gray-200 flex items-center justify-center border border-gray-300"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 bg-gray-100 hover:bg-gray-200 flex items-center justify-center border border-gray-300"
                          >
                            <Plus size={12} />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-gray-400 hover:text-black p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between text-xs">
                      <span className="text-gray-600 uppercase tracking-wider">Subtotal</span>
                      <span className="text-black font-light">
                        {formatPrice(price * item.quantity)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-5 bg-gray-50">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
              <span className="text-sm uppercase tracking-widest text-gray-700">Total</span>
              <span className="text-2xl font-light text-black">
                {formatPrice(total)}
              </span>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 
                       text-xs uppercase tracking-widest border border-black"
            >
              Finalizar Compra
            </button>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          cartItems={cartItems}
          total={total}
        />
      )}
    </>
  );
};

export default Cart;
