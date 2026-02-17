import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { auth } from './config';

// Login con email y contraseña
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

// Logout
export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};

// Crear usuario admin (solo para configuración inicial)
export const createAdminUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

// Observador de estado de autenticación
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
