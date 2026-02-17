import { createContext, useContext, useState, useEffect } from 'react';
import { loginWithEmail, logout as logoutFirebase, onAuthChange } from '../firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Credenciales por defecto para desarrollo
  // IMPORTANTE: Debes crear este usuario en Firebase Console
  const DEFAULT_EMAIL = 'admin@simea.com';
  const DEFAULT_PASSWORD = 'simea2024';

  // Escuchar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user);
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login con Firebase
  const login = async (username, password) => {
    try {
      // Convertir username a email si es necesario
      const email = username.includes('@') ? username : `${username}@simea.com`;
      
      const user = await loginWithEmail(email, password);
      setUser(user);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Error en login:', error);
      
      // Mensajes de error más amigables
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        alert('Usuario o contraseña incorrectos');
      } else if (error.code === 'auth/invalid-email') {
        alert('Email inválido');
      } else {
        alert('Error al iniciar sesión. Verifica tus credenciales.');
      }
      
      return false;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await logoutFirebase();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error en logout:', error);
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    defaultCredentials: {
      email: DEFAULT_EMAIL,
      password: DEFAULT_PASSWORD
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

