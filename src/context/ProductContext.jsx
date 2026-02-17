import { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';
import { 
  getAllProducts, 
  createProduct as createProductFirebase,
  updateProduct as updateProductFirebase,
  deleteProduct as deleteProductFirebase 
} from '../firebase/products';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de un ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos desde Firebase al inicio
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await getAllProducts();
      
      // Migrar productos sin stock (agregar stock: 0 por defecto)
      const productsWithStock = fetchedProducts.map(product => ({
        ...product,
        stock: product.stock !== undefined ? product.stock : 50  // ← Si no tiene stock, poner 50
      }));
      
      // Si no hay productos en Firebase, usar los iniciales
      if (fetchedProducts.length === 0) {
        setProducts(initialProducts);
      } else {
        setProducts(productsWithStock);
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setProducts(initialProducts);
    } finally {
      setLoading(false);
    }
  };

  // Crear producto
  const addProduct = async (product) => {
    try {
      // Las imágenes en base64 se guardan directamente en Firestore
      // Sin necesidad de Firebase Storage
      const newProduct = await createProductFirebase(product);
      setProducts([newProduct, ...products]);
      return newProduct;
    } catch (error) {
      console.error('Error al crear producto:', error);
      alert('Error al crear producto. Revisa la consola.');
      throw error;
    }
  };

  // Actualizar producto
  const updateProduct = async (id, updatedData) => {
    try {
      // Verificar si el producto existe en Firebase
      const existsInFirebase = products.some(p => p.id === id && typeof p.id === 'string');
      
      if (!existsInFirebase) {
        // El producto no está en Firebase (es un producto inicial)
        // Lo creamos como nuevo en Firebase
        console.log('⚠️ Producto no existe en Firebase, creándolo...');
        const newProduct = await addProduct(updatedData);
        
        // Eliminar el producto inicial del estado local
        setProducts(products.filter(p => p.id !== id).concat(newProduct));
        return;
      }
      
      // El producto existe en Firebase, actualizarlo normalmente
      await updateProductFirebase(id, updatedData);
      setProducts(products.map(p => 
        p.id === id ? { ...p, ...updatedData, id } : p
      ));
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      alert('Error al actualizar producto. Revisa la consola.');
      throw error;
    }
  };

  // Eliminar producto
  const deleteProduct = async (id) => {
    try {
      // Verificar si el producto existe en Firebase
      const existsInFirebase = products.some(p => p.id === id && typeof p.id === 'string');
      
      if (existsInFirebase) {
        // El producto está en Firebase, eliminarlo de allí
        await deleteProductFirebase(id);
      } else {
        // Es un producto inicial (no está en Firebase)
        // Solo lo eliminamos del estado local
        console.log('⚠️ Producto inicial detectado, eliminando solo del estado local');
      }
      
      // Eliminar del estado local en ambos casos
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('Error al eliminar producto. Revisa la consola.');
      throw error;
    }
  };

  // Obtener producto por ID
  const getProductById = (id) => {
    return products.find(p => p.id === id);
  };

  const value = {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    refreshProducts: loadProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

