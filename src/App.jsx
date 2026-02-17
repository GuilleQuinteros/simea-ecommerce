import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Dashboard from './components/Dashboard';
import LoginModal from './components/LoginModal';
import { useProducts } from './context/ProductContext';

// Componente de la tienda
const Store = () => {
  const { products, loading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const filteredProducts = selectedCategory === 'todos'
    ? products
    : products.filter(product => product.category === selectedCategory);

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
            <p className="text-sm uppercase tracking-widest text-gray-600">Cargando productos...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-6 sm:py-8">
      {/* Hero minimalista - Responsivo */}
      <div className="bg-black text-white p-8 sm:p-12 mb-6 sm:mb-8 border border-black">
        <h1 className="text-3xl sm:text-5xl font-light tracking-widest mb-3 sm:mb-4 uppercase">
          Simea
        </h1>
        <p className="text-xs sm:text-sm tracking-wider text-gray-300 mb-4 sm:mb-6">
          Ropa interior de calidad con precios mayoristas
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-xs uppercase tracking-widest">
          <div className="border border-white px-4 py-2 text-center">
            Precios especiales por cantidad
          </div>
          <div className="border border-white px-4 py-2 text-center">
            Envíos a todo el país
          </div>
          <div className="border border-white px-4 py-2 text-center">
            Múltiples formas de pago
          </div>
        </div>
      </div>

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Grid de productos - Responsivo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 border border-gray-200 bg-white">
          <p className="text-sm text-gray-500 uppercase tracking-widest">
            No hay productos en esta categoría
          </p>
        </div>
      )}
    </main>
  );
};

// Componente principal con Provider anidado
function AppContent() {
  const { isAuthenticated } = useAuth();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleToggleMode = () => {
    if (!isAdminMode && !isAuthenticated) {
      // Intentando entrar al admin sin estar autenticado
      setShowLogin(true);
    } else {
      // Toggle normal
      setIsAdminMode(!isAdminMode);
    }
  };

  // Si cierra sesión, volver a modo tienda
  const effectiveAdminMode = isAdminMode && isAuthenticated;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isAdminMode={effectiveAdminMode} 
        onToggleMode={handleToggleMode} 
      />
      
      {effectiveAdminMode ? <Dashboard /> : <Store />}

      {/* Footer minimalista - Responsivo */}
      <footer className="bg-black text-white py-8 sm:py-12 mt-12 sm:mt-16 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl sm:text-2xl font-light tracking-widest mb-2 uppercase">
            Simea
          </h3>
          <p className="text-gray-400 text-xs tracking-wider mb-4 sm:mb-6 uppercase">
            Ropa Interior de Calidad
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-xs uppercase tracking-widest mb-4 sm:mb-6">
            <a href="#" className="hover:text-gray-300 transition-colors">WhatsApp</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Email</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Ubicación</a>
          </div>
          <p className="text-xs text-gray-600 uppercase tracking-wider">
            © 2024 Simea. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      <Cart />
      
      {/* Modal de Login */}
      {showLogin && (
        <LoginModal 
          onClose={() => {
            setShowLogin(false);
            if (isAuthenticated) {
              setIsAdminMode(true);
            }
          }} 
        />
      )}
    </div>
  );
}

// App principal con todos los providers
function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <ProductProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </ProductProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
