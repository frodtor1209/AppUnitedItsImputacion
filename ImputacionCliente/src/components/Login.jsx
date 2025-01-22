import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [isUserValid, setIsUserValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateUser = (user) => user.length > 2;
  const validatePassword = (password) => password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    const isUserValidated = validateUser(user);
    const isPasswordValidated = validatePassword(password);
    
    setIsUserValid(isUserValidated);
    setIsPasswordValid(isPasswordValidated);

    if (!isUserValidated || !isPasswordValidated) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el inicio de sesión');
      }

      if (data.status === 'success') {
        onLogin({
          userId: data.userId,
          userName: data.userName
        });
        navigate('/inicio');
      } else {
        setErrorMessage(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Error de conexión');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#38B5AD] via-[#5CC1CE] to-[#A0CF9F] flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Iniciar Sesión
        </h2>

        {errorMessage && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-center">
            {errorMessage}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="user"
              className={`block text-sm font-medium ${isUserValid ? 'text-gray-700' : 'text-red-600'}`}
            >
              Usuario
            </label>
            <input
              type="text"
              id="user"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
                setIsUserValid(true);
              }}
              placeholder="Ingresa tu usuario"
              className={`mt-1 block w-full px-4 py-2 border ${
                isUserValid ? 'border-gray-300' : 'border-red-600'
              } rounded-md shadow-sm focus:ring-[#38B5AD] focus:border-[#38B5AD] sm:text-sm`}
              disabled={isLoading}
            />
            {!isUserValid && (
              <p className="mt-1 text-sm text-red-600">
                El usuario debe tener al menos 3 caracteres.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className={`block text-sm font-medium ${isPasswordValid ? 'text-gray-700' : 'text-red-600'}`}
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsPasswordValid(true);
              }}
              placeholder="Ingresa tu contraseña"
              className={`mt-1 block w-full px-4 py-2 border ${
                isPasswordValid ? 'border-gray-300' : 'border-red-600'
              } rounded-md shadow-sm focus:ring-[#38B5AD] focus:border-[#38B5AD] sm:text-sm`}
              disabled={isLoading}
            />
            {!isPasswordValid && (
              <p className="mt-1 text-sm text-red-600">
                La contraseña debe tener al menos 6 caracteres.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#38B5AD] text-white font-semibold rounded-md shadow hover:bg-[#5CC1CE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38B5AD] disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <a href="#" className="text-[#38B5AD] font-medium hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;