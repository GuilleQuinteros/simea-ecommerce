import { useState } from 'react';
import { X, MessageCircle, CheckCircle } from 'lucide-react';
import { formatPrice, generateWhatsAppMessage } from '../utils/helpers';
import { useCart } from '../context/CartContext';
import { useSettings } from '../context/SettingsContext';
import { updateProductStock } from '../firebase/products';
import { useProducts } from '../context/ProductContext';  // ← AGREGAR

const CheckoutModal = ({ isOpen, onClose, cartItems, total }) => {
  const { settings } = useSettings();
  const { clearCart, setIsCartOpen } = useCart();
  const { refreshProducts } = useProducts();  // ← AGREGAR
  
  // Filtrar solo métodos de pago habilitados
  const enabledPaymentMethods = settings?.paymentMethods?.filter(m => m.enabled) || [];
  const [selectedPayment, setSelectedPayment] = useState(enabledPaymentMethods[0]);
  const [whatsappNumber, setWhatsappNumber] = useState(settings?.whatsappNumber || '5493794000000');

  if (!isOpen) return null;

  const handleSendWhatsApp = async () => {
    try {
      // 1. Restar stock de cada producto
      for (const item of cartItems) {
        // Importar la función (asegúrate de tener el import arriba)
        const { updateProductStock } = await import('../firebase/products');
        await updateProductStock(item.product.id, item.quantity);
      }

      // 2. Generar el mensaje de WhatsApp
      const message = generateWhatsAppMessage(cartItems, selectedPayment, total);
      
      // 3. Crear el enlace de WhatsApp
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
      
      // 4. Abrir WhatsApp en una nueva pestaña
      window.open(whatsappUrl, '_blank');
      
      // 5. Limpiar el carrito después de enviar
      clearCart();
      setIsCartOpen(false);
      refreshProducts();  // ← AGREGAR: Refresca la lista de productos
      onClose();

      // 6. Mostrar mensaje de éxito
      alert('✅ Gracias por tu compra, no dejes de hacer las consultas necesarias');
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      alert(' Gracias por tu compra, pronto nos pondremos en contacto');
      
      // Igualmente enviar el mensaje aunque falle el stock
      const message = generateWhatsAppMessage(cartItems, selectedPayment, total);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank');
      
      clearCart();
      setIsCartOpen(false);
      onClose();
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-70 z-50"
        onClick={onClose}
      />

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-white border border-gray-300 z-50 w-full max-w-lg max-h-[90vh] 
                    overflow-y-auto">
        <div className="bg-black text-white p-5 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-sm uppercase tracking-widest font-light">Finalizar Compra</h2>
          <button
            onClick={onClose}
            className="hover:bg-gray-800 p-2"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Resumen */}
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-widest mb-3 text-black">
              Resumen del Pedido
            </h3>
            <div className="bg-gray-50 border border-gray-200 p-4 space-y-2">
              {cartItems.map((item, index) => (
                <div key={item.id} className="flex justify-between text-xs">
                  <span className="text-gray-700">
                    {item.quantity}x {item.product.name} ({item.size}, {item.color})
                  </span>
                </div>
              ))}
              <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between">
                <span className="text-xs uppercase tracking-wider">Total</span>
                <span className="text-black text-lg font-light">{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Métodos de Pago */}
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-widest mb-3 text-black">
              Método de Pago
            </h3>
            <div className="space-y-3">
              {enabledPaymentMethods.map(method => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPayment(method)}
                  className={`border cursor-pointer transition-all p-4
                    ${selectedPayment.id === method.id
                      ? 'border-black bg-gray-50'
                      : 'border-gray-300 hover:border-gray-400'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-sm text-black mb-1">
                        {method.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {method.description}
                      </div>
                    </div>
                    {selectedPayment.id === method.id && (
                      <CheckCircle className="text-black flex-shrink-0" size={20} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Datos de Pago */}
          {selectedPayment.id !== 'efectivo' && (
            <div className="mb-6 p-4 bg-gray-50 border border-gray-300">
              <p className="text-xs text-gray-700">
                <strong className="text-black uppercase tracking-wider">Datos para transferir:</strong>
                <br />
                <span className="mt-1 block">{selectedPayment.description}</span>
              </p>
            </div>
          )}

          {/* WhatsApp 
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-widest mb-3 text-black">
              Número de WhatsApp
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Puedes cambiar el número si lo necesitas
            </p>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, ''))}
              className="w-full px-4 py-3 border border-gray-300 focus:border-black 
                       focus:outline-none text-sm"
              placeholder="5493794000000"
            />
          </div>*/}

          {/* Botón WhatsApp */}
          <button
            onClick={handleSendWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-4 
                     border border-green-600 flex items-center justify-center gap-2 
                     text-xs uppercase tracking-widest mb-3"
          >
            <MessageCircle size={18} />
            Enviar Pedido por WhatsApp
          </button>

          <div className="p-3 bg-gray-50 border border-gray-200">
            <p className="text-[10px] text-gray-600 text-center leading-relaxed">
              Al hacer clic, se abrirá WhatsApp con tu pedido ya redactado.
              Podrás revisarlo antes de enviarlo.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;
