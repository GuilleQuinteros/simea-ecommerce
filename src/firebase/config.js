import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// 🔥 CONFIGURACIÓN DE FIREBASE
// Reemplaza estos valores con los de TU proyecto Firebase
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdC_PNkwnukG1-6pdMNDSATRMLYxhhnZk",
  authDomain: "simea-ecommerce.firebaseapp.com",
  projectId: "simea-ecommerce",
  storageBucket: "simea-ecommerce.firebasestorage.app",
  messagingSenderId: "349296145058",
  appId: "1:349296145058:web:9bfbabf2c832fad28c5dfb"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

