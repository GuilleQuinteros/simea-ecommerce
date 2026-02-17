import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const ImageUploader = ({ currentImage, onImageChange }) => {
  const [preview, setPreview] = useState(currentImage || '');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Convertir archivo a base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Manejar selección de archivo
  const handleFileSelect = async (file) => {
    if (!file) return;

    // Validar que sea una imagen
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido');
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen debe pesar menos de 5MB');
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      setPreview(base64);
      onImageChange(base64);
    } catch (error) {
      console.error('Error al procesar la imagen:', error);
      alert('Error al procesar la imagen');
    }
  };

  // Manejar cambio de input
  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  // Manejar drag & drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  // Limpiar imagen
  const handleClear = () => {
    setPreview('');
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      {/* Input file compartido */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      {!preview ? (
        /* Área de upload cuando NO hay imagen */
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed p-8 cursor-pointer transition-all
            ${dragActive 
              ? 'border-black bg-gray-100' 
              : 'border-gray-300 hover:border-gray-400'
            }`}
        >
          <div className="flex flex-col items-center text-center">
            <Upload size={32} className="text-gray-400 mb-3" />
            <p className="text-xs uppercase tracking-wider text-gray-600 mb-2">
              Arrastra una imagen o haz clic para seleccionar
            </p>
            <p className="text-[10px] text-gray-500">
              PNG, JPG, WEBP • Máximo 5MB
            </p>
          </div>
        </div>
      ) : (
        /* Vista previa cuando SÍ hay imagen */
        <div className="relative border border-gray-200 p-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
            type="button"
            className="absolute top-2 right-2 bg-black text-white p-2 hover:bg-gray-800 z-10"
          >
            <X size={16} />
          </button>
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-64 object-cover bg-gray-50"
          />
          <div className="mt-3 flex items-center justify-center gap-2">
            <ImageIcon size={14} className="text-gray-400" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="text-xs uppercase tracking-wider text-gray-600 hover:text-black"
            >
              Cambiar imagen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
