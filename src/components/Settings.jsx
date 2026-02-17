import { useState } from 'react';
import { Save, X, Plus, Trash2, Settings as SettingsIcon } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const Settings = () => {
  const { settings, updateSettings } = useSettings();
  const [formData, setFormData] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (index, field, value) => {
    const updatedMethods = [...formData.paymentMethods];
    updatedMethods[index] = {
      ...updatedMethods[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      paymentMethods: updatedMethods
    }));
  };

  const togglePaymentMethod = (index) => {
    const updatedMethods = [...formData.paymentMethods];
    updatedMethods[index].enabled = !updatedMethods[index].enabled;
    setFormData(prev => ({
      ...prev,
      paymentMethods: updatedMethods
    }));
  };

  const addPaymentMethod = () => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: [
        ...prev.paymentMethods,
        {
          id: `custom_${Date.now()}`,
          name: 'Nuevo Método',
          description: 'Descripción del método de pago',
          enabled: true
        }
      ]
    }));
  };

  const removePaymentMethod = (index) => {
    setFormData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      await updateSettings(formData);
      setMessage('✅ Configuración guardada correctamente');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Error al guardar la configuración');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon size={32} className="text-black" />
        <div>
          <h1 className="text-3xl font-light uppercase tracking-widest text-black">
            Configuración
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Administra los datos de tu tienda
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        {/* Información General */}
        <div className="bg-white border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-light uppercase tracking-widest mb-4 text-black">
            Información General
          </h2>

          <div className="space-y-4">
            {/* Nombre de la tienda */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2">
                Nombre de la Tienda
              </label>
              <input
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 focus:border-black 
                         focus:outline-none text-sm"
                placeholder="SIMEA"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2">
                Número de WhatsApp
              </label>
              <input
                type="text"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 focus:border-black 
                         focus:outline-none text-sm"
                placeholder="5493794000000"
              />
              <p className="text-xs text-gray-500 mt-2">
                Formato: Código de país + código de área + número (sin espacios ni guiones)
              </p>
            </div>
          </div>
        </div>

        {/* Métodos de Pago */}
        <div className="bg-white border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-light uppercase tracking-widest text-black">
              Métodos de Pago
            </h2>
            <button
              type="button"
              onClick={addPaymentMethod}
              className="bg-black text-white px-4 py-2 text-xs uppercase tracking-wider 
                       hover:bg-gray-800 flex items-center gap-2"
            >
              <Plus size={16} />
              Agregar Método
            </button>
          </div>

          <div className="space-y-4">
            {formData.paymentMethods.map((method, index) => (
              <div key={method.id} className="border border-gray-200 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={method.enabled}
                      onChange={() => togglePaymentMethod(index)}
                      className="w-5 h-5 accent-black"
                    />
                    <span className="text-sm font-medium">
                      {method.enabled ? 'Habilitado' : 'Deshabilitado'}
                    </span>
                  </div>
                  {formData.paymentMethods.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePaymentMethod(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={method.name}
                      onChange={(e) => handlePaymentMethodChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 focus:border-black 
                               focus:outline-none text-sm"
                      placeholder="Ej: Mercado Pago"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Descripción / Alias / CBU / CVU
                    </label>
                    <textarea
                      value={method.description}
                      onChange={(e) => handlePaymentMethodChange(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 focus:border-black 
                               focus:outline-none text-sm resize-none"
                      placeholder="Ej: Alias: SIMEA.ROPA.MP o CBU: 0000003100012345678901"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mensaje de estado */}
        {message && (
          <div className={`mb-4 p-4 border ${
            message.includes('✅') 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <p className="text-sm">{message}</p>
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-black text-white px-6 py-3 hover:bg-gray-800 
                     flex items-center justify-center gap-2 text-sm uppercase tracking-wider
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
