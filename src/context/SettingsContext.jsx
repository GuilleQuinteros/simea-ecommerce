import { createContext, useContext, useState, useEffect } from 'react';
import { getSettings, updateSettings as updateSettingsFirebase } from '../firebase/settings';

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings debe ser usado dentro de un SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar configuración al inicio
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const fetchedSettings = await getSettings();
      setSettings(fetchedSettings);
    } catch (error) {
      console.error('Error al cargar configuración:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      const updated = await updateSettingsFirebase(newSettings);
      setSettings(updated);
      return updated;
    } catch (error) {
      console.error('Error al actualizar configuración:', error);
      throw error;
    }
  };

  const value = {
    settings,
    loading,
    updateSettings,
    refreshSettings: loadSettings
  };

  return (
    <SettingsContext.Provider value={value}>
      {!loading && children}
    </SettingsContext.Provider>
  );
};
