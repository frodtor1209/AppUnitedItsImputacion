import React, { useState } from 'react';

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [isUserValid, setIsUserValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const validateUser = (user) => {
    return user.length > 2;
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleUserChange = (e) => {
    setUser(e.target.value);
    setIsUserValid(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsPasswordValid(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!validateUser(user)) {
      setIsUserValid(false);
      valid = false;
    }

    if (!validatePassword(password)) {
      setIsPasswordValid(false);
      valid = false;
    }

    if (valid) {
      console.log('Inicio de sesión exitoso');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#38B5AD] via-[#5CC1CE] to-[#A0CF9F] flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="../../public/logoUnited.png"
            alt="Logo de la empresa"
            className="h-16"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Iniciar Sesión
        </h2>

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
              onChange={handleUserChange}
              placeholder="Ingresa tu usuario"
              className={`mt-1 block w-full px-4 py-2 border ${isUserValid ? 'border-gray-300' : 'border-red-600'} rounded-md shadow-sm focus:ring-[#38B5AD] focus:border-[#38B5AD] sm:text-sm`}
            />
            {!isUserValid && (
              <p className="mt-1 text-sm text-red-600">El usuario debe tener al menos 3 caracteres.</p>
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
              onChange={handlePasswordChange}
              placeholder="Ingresa tu contraseña"
              className={`mt-1 block w-full px-4 py-2 border ${isPasswordValid ? 'border-gray-300' : 'border-red-600'} rounded-md shadow-sm focus:ring-[#38B5AD] focus:border-[#38B5AD] sm:text-sm`}
            />
            {!isPasswordValid && (
              <p className="mt-1 text-sm text-red-600">La contraseña debe tener al menos 6 caracteres.</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#38B5AD] text-white font-semibold rounded-md shadow hover:bg-[#5CC1CE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38B5AD]"
            >
              Iniciar Sesión
            </button>
          </div>
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
