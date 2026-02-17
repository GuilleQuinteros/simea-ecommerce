import { useState } from 'react';
import { ShoppingBag, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, calculatePrice, getPriceLabel } from '../utils/helpers';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);

  const currentPrice = calculatePrice(product.pricing, quantity);
  const priceInfo = getPriceLabel(quantity);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setQuantity(1);
  };

  return (
    <div className="bg-white border border-gray-200 overflow-hidden hover:border-black transition-all group">
      {/* Imagen */}
      <div className="relative h-80 overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span className={`text-white text-[10px] px-2 py-1 uppercase tracking-wider
            ${quantity >= 12 ? 'bg-black' : quantity >= 6 ? 'bg-gray-700' : 'bg-gray-500'}`}>
            {priceInfo.label}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="text-base font-light text-black mb-1 uppercase tracking-wide">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Talle */}
        <div className="mb-4">
          <label className="text-[10px] uppercase tracking-widest text-gray-600 block mb-2">
            Talle
          </label>
          <div className="flex gap-2">
            {product.sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 text-xs border transition-all
                  ${selectedSize === size
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 text-gray-700 hover:border-black'
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className="mb-4">
          <label className="text-[10px] uppercase tracking-widest text-gray-600 block mb-2">
            Color
          </label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 text-xs focus:border-black 
                     focus:outline-none bg-white"
          >
            {product.colors.map(color => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>

        {/* Cantidad */}
        <div className="mb-4">
          <label className="text-[10px] uppercase tracking-widest text-gray-600 block mb-2">
            Cantidad
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 text-black border border-gray-300"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 h-10 text-center border border-gray-300 text-sm
                       focus:border-black focus:outline-none"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 text-black border border-gray-300"
            >
              +
            </button>
          </div>
        </div>

        {/* Precio */}
        <div className="mb-4 py-3 border-t border-b border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600 uppercase tracking-wider">
              {quantity > 1 ? 'Total' : 'Precio'}
            </span>
            <span className="text-xl font-light text-black">
              {formatPrice(currentPrice * quantity)}
            </span>
          </div>
        </div>

        {/* Info de precios */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 text-[10px] uppercase tracking-wider 
                   text-gray-600 hover:text-black mb-3"
        >
          <Info size={12} />
          Precios por cantidad
        </button>

        {showDetails && (
          <div className="mb-4 p-3 bg-gray-50 border border-gray-200 text-xs">
            <ul className="space-y-1 text-gray-700">
              <li>1-5 unidades: {formatPrice(product.pricing.unit)}</li>
              <li>6-11 unidades: {formatPrice(product.pricing.wholesale)}</li>
              <li>12+ unidades: {formatPrice(product.pricing.bulk)}</li>
            </ul>
          </div>
        )}
        {/* Indicador de Stock */}
        {product.stock !== undefined && (
          <div className="mb-4 py-2 px-3 border border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center text-xs">
              <span className="uppercase tracking-wider text-gray-600">Stock:</span>
              <span className={`font-medium ${
                product.stock === 0 
                  ? 'text-red-600' 
                  : product.stock < 10 
                    ? 'text-orange-600' 
                    : 'text-green-600'
              }`}>
                {product.stock === 0 
                  ? 'Sin stock' 
                  : product.stock < 10 
                    ? `Últimas ${product.stock} unidades` 
                    : `${product.stock} disponibles`
                }
              </span>
            </div>
          </div>
        )}

        {/* Botón Agregar al Carrito */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}  // ← NUEVO: deshabilitar si no hay stock
          className={`w-full py-3 px-4 text-xs uppercase tracking-widest 
                   flex items-center justify-center gap-2 transition-all
                   ${product.stock === 0
                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed border border-gray-300'
                     : 'bg-black hover:bg-gray-800 text-white border border-black'
                   }`}
        >
          <ShoppingBag size={16} />
          {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
