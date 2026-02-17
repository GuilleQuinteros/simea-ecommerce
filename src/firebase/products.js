import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  getDoc,
  query,
  orderBy 
} from 'firebase/firestore';
import { db } from './config';

const PRODUCTS_COLLECTION = 'products';

// Obtener todos los productos
export const getAllProducts = async () => {
  try {
    const q = query(collection(db, PRODUCTS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return products;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

// Crear producto
export const createProduct = async (productData) => {
  try {
    // Sanitizar datos para Firestore
    const sanitizedData = {
      name: productData.name || '',
      description: productData.description || '',
      image: productData.image || '',
      category: productData.category || 'conjuntos',
      sizes: Array.isArray(productData.sizes) ? productData.sizes : [],
      colors: Array.isArray(productData.colors) ? productData.colors : [],
      stock: Number(productData.stock) >= 0 ? Number(productData.stock) : 0,
      pricing: {
        unit: Number(productData.pricing?.unit) || 0,
        wholesale: Number(productData.pricing?.wholesale) || 0,
        bulk: Number(productData.pricing?.bulk) || 0
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), sanitizedData);
    
    return {
      id: docRef.id,
      ...sanitizedData
    };
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

// Actualizar producto
export const updateProduct = async (productId, productData) => {
  try {
    console.log('📝 Datos recibidos para actualizar:', productData);
    console.log('🆔 Product ID:', productId, 'Tipo:', typeof productId);
    
    // Convertir productId a string (Firebase solo acepta strings)
    const productIdString = String(productId);
    const productRef = doc(db, PRODUCTS_COLLECTION, productIdString);
    
    // Sanitizar datos para Firestore
    const sanitizedData = {
      name: String(productData.name || ''),
      description: String(productData.description || ''),
      image: String(productData.image || ''),
      category: String(productData.category || 'conjuntos'),
      sizes: Array.isArray(productData.sizes) ? [...productData.sizes] : [],
      colors: Array.isArray(productData.colors) ? [...productData.colors] : [],
      stock: Number(productData.stock) >= 0 ? Number(productData.stock) : 0,
      pricing: {
        unit: Number(productData.pricing?.unit) || 0,
        wholesale: Number(productData.pricing?.wholesale) || 0,
        bulk: Number(productData.pricing?.bulk) || 0
      },
      updatedAt: new Date().toISOString()
    };
    
    console.log('✅ Datos sanitizados:', sanitizedData);
    
    // Eliminar campos undefined o null
    Object.keys(sanitizedData).forEach(key => {
      if (sanitizedData[key] === undefined || sanitizedData[key] === null) {
        delete sanitizedData[key];
      }
    });
    
    await updateDoc(productRef, sanitizedData);
    
    return {
      id: productId,
      ...sanitizedData
    };
  } catch (error) {
    console.error('❌ Error detallado al actualizar producto:', error);
    console.error('Datos que causaron el error:', productData);
    throw error;
  }
};

// Eliminar producto
export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
    return true;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};

// Actualizar stock de un producto
export const updateProductStock = async (productId, quantityToSubtract) => {
  try {
    const productIdString = String(productId);
    const productRef = doc(db, PRODUCTS_COLLECTION, productIdString);
    
    // Obtener el producto actual
    const productSnap = await getDoc(productRef);
    
    if (!productSnap.exists()) {
      throw new Error('Producto no encontrado');
    }
    
    const currentStock = productSnap.data().stock || 0;
    const newStock = Math.max(0, currentStock - quantityToSubtract);
    
    // Actualizar solo el stock
    await updateDoc(productRef, {
      stock: newStock,
      updatedAt: new Date().toISOString()
    });
    
    return newStock;
  } catch (error) {
    console.error('Error al actualizar stock:', error);
    throw error;
  }
};