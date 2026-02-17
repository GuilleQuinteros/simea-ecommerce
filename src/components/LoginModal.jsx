import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ onClose }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (login(username, password)) {
      onClose();
    } else {
      setError('Usuario o contraseña incorrectos');
      setPassword('');
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-80 z-50" />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    bg-white border border-gray-300 z-50 w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-black text-white p-4 mb-4">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-light uppercase tracking-widest text-black mb-2">
            Acceso Admin
          </h2>
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Ingresa tus credenciales
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Usuario */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              className="w-full px-4 py-3 border border-gray-300 focus:border-black 
                       focus:outline-none text-sm bg-white"
              placeholder="admin"
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-600 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 focus:border-black 
                         focus:outline-none text-sm bg-white pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                         hover:text-black"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 p-3">
              <p className="text-xs text-red-800 text-center">{error}</p>
            </div>
          )}

          {/* Botones */}
          <div className="flex flex-col gap-3 pt-4">
            <button
              type="submit"
              className="w-full bg-black text-white px-6 py-3 border border-black 
                       hover:bg-gray-800 text-xs uppercase tracking-widest"
            >
              Ingresar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full px-6 py-3 border border-gray-300 hover:border-black 
                       text-xs uppercase tracking-widest"
            >
              Cancelar
            </button>
          </div>
        </form>

        {/* Credenciales de desarrollo
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200">
          <p className="text-[10px] text-gray-600 text-center mb-2 uppercase tracking-wider">
            Credenciales de desarrollo
          </p>
          <p className="text-xs text-center">
            <strong>Email:</strong> admin@simea.com<br />
            <strong>Contraseña:</strong> simea2024
          </p>
          <p className="text-[10px] text-gray-500 text-center mt-2">
            Crea este usuario en Firebase Console
          </p>
        </div> */}
      </div>
    </>
  );
};

export default LoginModal;
