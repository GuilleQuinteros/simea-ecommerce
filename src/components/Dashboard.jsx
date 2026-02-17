import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, LogOut, Package, Settings as SettingsIcon } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/helpers';
import { categories } from '../data/products';
import ImageUploader from './ImageUploader';
import Settings from './Settings';

const Dashboard = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('products'); // 'products' o 'settings'
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    category: 'conjuntos',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Blanco'],
    stock: 0,  // ← NUEVO
    pricing: {
      unit: 0,
      wholesale: 0,
      bulk: 0
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePricingChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [name]: parseFloat(value) || 0
      }
    }));
  };

  const handleArrayChange = (field, value) => {
    // Si value ya es un array, usarlo directamente
    if (Array.isArray(value)) {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
      return;
    }
    
    // Si es un string, convertirlo a array
    const arrayValue = value.split(',').map(item => item.trim()).filter(Boolean);
    setFormData(prev => ({
      ...prev,
      [field]: arrayValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
    resetForm();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      image: product.image,
      category: product.category,
      sizes: Array.isArray(product.sizes) ? product.sizes : [],
      colors: Array.isArray(product.colors) ? product.colors : [],
      stock: product.stock || 0,  // ← NUEVO
      pricing: product.pricing
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      deleteProduct(id);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: '',
      category: 'conjuntos',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Negro', 'Blanco'],
      stock: 0,  // ← NUEVO
      pricing: { unit: 0, wholesale: 0, bulk: 0 }
    });
    setEditingProduct(null);
    setIsFormOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header con Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-light uppercase tracking-widest text-black">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestión de productos • {products.length} productos
          </p>
        </div>
        <button
          onClick={logout}
          className="bg-white text-black px-6 py-3 border border-gray-300 
                   hover:border-black flex items-center justify-center gap-2 text-xs 
                   uppercase tracking-wider"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Cerrar Sesión</span>
          <span className="sm:hidden">Salir</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 text-sm uppercase tracking-wider transition-all
            ${activeTab === 'products'
              ? 'border-b-2 border-black text-black font-medium'
              : 'text-gray-500 hover:text-black'
            }`}
        >
          <div className="flex items-center gap-2">
            <Package size={18} />
            Productos
          </div>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-6 py-3 text-sm uppercase tracking-wider transition-all
            ${activeTab === 'settings'
              ? 'border-b-2 border-black text-black font-medium'
              : 'text-gray-500 hover:text-black'
            }`}
        >
          <div className="flex items-center gap-2">
            <SettingsIcon size={18} />
            Configuración
          </div>
        </button>
      </div>

      {/* Contenido según tab activo */}
      {activeTab === 'settings' ? (
        <Settings />
      ) : (
        <>
          {/* Botón Nuevo Producto */}
          <div className="mb-6">
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-black text-white px-6 py-3 border border-black hover:bg-gray-800 
                       flex items-center gap-2 text-xs uppercase tracking-wider"
            >
              <Plus size={18} />
              Nuevo Producto
            </button>
          </div>
          {/* Botón Actualizar Stock Manualmente */}
          <button
            onClick={() => {
              const productName = prompt('Nombre del producto vendido:');
              if (!productName) return;
              
              const quantity = parseInt(prompt('Cantidad vendida:'));
              if (!quantity || quantity <= 0) return;
              
              const product = products.find(p => 
                p.name.toLowerCase().includes(productName.toLowerCase())
              );
              
              if (!product) {
                alert('❌ Producto no encontrado');
                return;
              }
              
              const newStock = Math.max(0, (product.stock || 0) - quantity);
              updateProduct(product.id, { ...product, stock: newStock });
              alert(`✅ Stock actualizado: ${product.name} - Nuevo stock: ${newStock}`);
            }}
            className="bg-blue-600 text-white px-6 py-3 border border-blue-600 hover:bg-blue-700 
                     flex items-center gap-2 text-xs uppercase tracking-wider"
          >
            📦 Actualizar Stock Manual
          </button>

      {/* Formulario */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-300">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-light uppercase tracking-widest">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button onClick={resetForm} className="text-gray-600 hover:text-black">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Nombre */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2">
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black 
                           focus:outline-none text-sm"
                  placeholder="Ej: Conjunto de Encaje Clásico"
                />
              </div>

              {/* Descripción */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2">
                  Descripción *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black 
                           focus:outline-none text-sm resize-none"
                  placeholder="Descripción detallada del producto"
                />
              </div>

              {/* Imagen Upload */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2">
                  Imagen del Producto *
                </label>
                <ImageUploader
                  currentImage={formData.image}
                  onImageChange={(base64) => setFormData(prev => ({ ...prev, image: base64 }))}
                />
                <p className="text-[10px] text-gray-500 mt-2">
                  Sube una imagen desde tu equipo (máximo 5MB)
                </p>
              </div>

              {/* Categoría */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2">
                  Categoría *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black 
                           focus:outline-none text-sm bg-white"
                >
                  {categories.filter(cat => cat.id !== 'todos').map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Talles */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2">
                  Talles (separados por coma) *
                </label>
                <input
                  type="text"
                  value={Array.isArray(formData.sizes) ? formData.sizes.join(', ') : formData.sizes}
                  onChange={(e) => handleArrayChange('sizes', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black 
                           focus:outline-none text-sm"
                  placeholder="S, M, L, XL"
                />
              </div>

              {/* Colores */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2">
                  Colores (separados por coma) *
                </label>
                <input
                  type="text"
                  value={Array.isArray(formData.colors) ? formData.colors.join(', ') : formData.colors}
                  onChange={(e) => handleArrayChange('colors', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black 
                           focus:outline-none text-sm"
                  placeholder="Negro, Blanco, Rojo"
                />
              </div>
              {/* Stock */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2">
                  Stock Disponible *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 focus:border-black 
                           focus:outline-none text-sm"
                  placeholder="100"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Cantidad total disponible (se mostrará "Sin stock" cuando sea 0)
                </p>
              </div>
              {/* Precios */}
              <div className="border border-gray-200 p-4">
                <h3 className="text-xs uppercase tracking-widest text-gray-600 mb-4">
                  Precios por Cantidad
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">
                      Precio Unitario (1-5 unidades)
                    </label>
                    <input
                      type="number"
                      name="unit"
                      value={formData.pricing.unit}
                      onChange={handlePricingChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black 
                               focus:outline-none text-sm"
                      placeholder="2500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">
                      Precio por Mayor (6-11 unidades)
                    </label>
                    <input
                      type="number"
                      name="wholesale"
                      value={formData.pricing.wholesale}
                      onChange={handlePricingChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black 
                               focus:outline-none text-sm"
                      placeholder="2200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-2">
                      Precio Mayorista (12+ unidades)
                    </label>
                    <input
                      type="number"
                      name="bulk"
                      value={formData.pricing.bulk}
                      onChange={handlePricingChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black 
                               focus:outline-none text-sm"
                      placeholder="2000"
                    />
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-black text-white px-6 py-3 border border-black 
                           hover:bg-gray-800 flex items-center justify-center gap-2 
                           text-sm uppercase tracking-wider"
                >
                  <Save size={18} />
                  {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 hover:border-black 
                           text-sm uppercase tracking-wider"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white border border-gray-200 overflow-hidden group">
            <div className="relative h-64 overflow-hidden bg-gray-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 
                            transition-all flex items-center justify-center gap-2 opacity-0 
                            group-hover:opacity-100">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-white text-black p-3 hover:bg-gray-100"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-white text-black p-3 hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-light uppercase tracking-wide text-black mb-1">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                {product.description}
              </p>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Unitario:</span>
                  <span className="text-black">{formatPrice(product.pricing.unit)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mayor:</span>
                  <span className="text-black">{formatPrice(product.pricing.wholesale)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mayorista:</span>
                  <span className="text-black">{formatPrice(product.pricing.bulk)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12 border border-gray-200 bg-white">
          <p className="text-gray-500 uppercase tracking-widest text-sm">
            No hay productos. Crea tu primer producto.
          </p>
        </div>
      )}
        </>
      )}
    </div>
  );
};

export default Dashboard;