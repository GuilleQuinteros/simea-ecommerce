// Función para calcular el precio según la cantidad
export const calculatePrice = (pricing, quantity) => {
  if (quantity >= 12) {
    return pricing.bulk;
  } else if (quantity >= 6) {
    return pricing.wholesale;
  } else {
    return pricing.unit;
  }
};

// Función para obtener el badge de descuento
export const getPriceLabel = (quantity) => {
  if (quantity >= 12) {
    return { label: 'Precio Mayorista', color: 'bg-green-500' };
  } else if (quantity >= 6) {
    return { label: 'Precio por Mayor', color: 'bg-blue-500' };
  } else {
    return { label: 'Precio Unitario', color: 'bg-gray-500' };
  }
};

// Formatear precio a pesos argentinos
export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(price);
};

// Calcular el total del carrito
export const calculateCartTotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    const price = calculatePrice(item.product.pricing, item.quantity);
    return total + (price * item.quantity);
  }, 0);
};

// Generar mensaje de WhatsApp con el pedido
export const generateWhatsAppMessage = (cartItems, paymentMethod, total) => {
  let message = `🛍️ *NUEVO PEDIDO - SIMEA*\n\n`;
  message += `📦 *Productos:*\n`;
  
  cartItems.forEach((item, index) => {
    const price = calculatePrice(item.product.pricing, item.quantity);
    message += `\n${index + 1}. ${item.product.name}\n`;
    message += `   • Cantidad: ${item.quantity}\n`;
    message += `   • Talle: ${item.size}\n`;
    message += `   • Color: ${item.color}\n`;
    message += `   • Precio unitario: ${formatPrice(price)}\n`;
    message += `   • Subtotal: ${formatPrice(price * item.quantity)}\n`;
  });
  
  message += `\n💰 *Total: ${formatPrice(total)}*\n\n`;
  message += `💳 *Método de pago:* ${paymentMethod.name}\n`;
  
  if (paymentMethod.id !== 'efectivo') {
    message += `📝 ${paymentMethod.description}\n`;
  }
  
  message += `\n✅ Confirmo el pedido y espero coordinar la entrega. ¡Gracias!`;
  
  return encodeURIComponent(message);
};
