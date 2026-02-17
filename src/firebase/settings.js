import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './config';

// Configuración por defecto
const DEFAULT_SETTINGS = {
  storeName: 'SIMEA',
  whatsappNumber: '5493794000000',
  paymentMethods: [
    {
      id: 'efectivo',
      name: 'Efectivo',
      description: 'Pago en efectivo al momento de la entrega',
      enabled: true
    },
    {
      id: 'transferencia',
      name: 'Transferencia Bancaria',
      description: 'CBU: 0000003100012345678901 - Banco Nación',
      enabled: true
    },
    {
      id: 'mercadopago',
      name: 'Mercado Pago',
      description: 'Alias: SIMEA.ROPA.MP',
      enabled: true
    },
    {
      id: 'uala',
      name: 'Ualá',
      description: 'CVU: 0000000000000000000000 - Alias: SIMEA.UALA',
      enabled: true
    }
  ],
  updatedAt: new Date().toISOString()
};

// Obtener configuración
export const getSettings = async () => {
  try {
    const docRef = doc(db, 'settings', 'store');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // Si no existe, crear con valores por defecto
      await setDoc(docRef, DEFAULT_SETTINGS);
      return DEFAULT_SETTINGS;
    }
  } catch (error) {
    console.error('Error al obtener configuración:', error);
    return DEFAULT_SETTINGS;
  }
};

// Actualizar configuración
export const updateSettings = async (settings) => {
  try {
    const docRef = doc(db, 'settings', 'store');
    const updatedSettings = {
      ...settings,
      updatedAt: new Date().toISOString()
    };
    
    await setDoc(docRef, updatedSettings);
    return updatedSettings;
  } catch (error) {
    console.error('Error al actualizar configuración:', error);
    throw error;
  }
};
