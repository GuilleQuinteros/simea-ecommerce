import { ref, uploadString, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

// Subir imagen base64 a Firebase Storage
export const uploadImage = async (base64Image, imageName) => {
  try {
    // Crear referencia única con timestamp
    const timestamp = Date.now();
    const fileName = `products/${timestamp}_${imageName}`;
    const storageRef = ref(storage, fileName);
    
    // Subir imagen en formato base64
    await uploadString(storageRef, base64Image, 'data_url');
    
    // Obtener URL pública
    const downloadURL = await getDownloadURL(storageRef);
    
    return {
      url: downloadURL,
      path: fileName
    };
  } catch (error) {
    console.error('Error al subir imagen:', error);
    throw error;
  }
};

// Eliminar imagen de Storage
export const deleteImage = async (imagePath) => {
  try {
    if (!imagePath) return;
    
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef);
    return true;
  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    // No lanzar error si la imagen no existe
    if (error.code !== 'storage/object-not-found') {
      throw error;
    }
  }
};
