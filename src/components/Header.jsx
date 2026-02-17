import { ShoppingCart, LayoutDashboard, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = ({ isAdminMode, onToggleMode }) => {
  const { getTotalItems, setIsCartOpen } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo Minimalista - Responsivo */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="text-2xl sm:text-3xl font-light tracking-widest text-black">
              SIMEA
            </div>
            <div className="hidden md:flex items-center space-x-2 text-xs text-gray-500 uppercase tracking-wider">
              <div className="w-px h-4 bg-gray-300"></div>
              <span>Ropa Interior</span>
            </div>
          </div>

          {/* Controles - Responsivo */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Toggle Admin/Store */}
            <button
              onClick={onToggleMode}
              className={`px-3 sm:px-4 py-2 border transition-all flex items-center gap-1 sm:gap-2
                ${isAdminMode 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-black border-gray-300 hover:border-black'
                }`}
            >
              {isAdminMode ? (
                <>
                  <Store size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="text-xs sm:text-sm">Tienda</span>
                </>
              ) : (
                <>
                  <LayoutDashboard size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="text-xs sm:text-sm">Admin</span>
                </>
              )}
            </button>

            {/* Carrito (solo en modo tienda) */}
            {!isAdminMode && (
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-black text-white px-3 sm:px-4 py-2 
                         hover:bg-gray-800 flex items-center gap-1 sm:gap-2 border border-black"
              >
                <ShoppingCart size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="text-xs sm:text-sm">Carrito</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-white 
                               text-black text-[10px] sm:text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 
                               flex items-center justify-center font-medium border border-black">
                    {totalItems}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
