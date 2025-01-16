import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#38B5AD] via-[#5CC1CE] to-[#A0CF9F] flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="../../public/logoUnited.png" // Reemplaza con la ruta de tu logo
            alt="Logo de la empresa"
            className="h-16"
          />
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Iniciar Sesión
        </h2>

        {/* Formulario */}
        <form className="space-y-4">
          {/* Campo de Email */}
          <div>
            <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu usuario"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#38B5AD] focus:border-[#38B5AD] sm:text-sm"
              required
            />
          </div>

          {/* Campo de Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Ingresa tu contraseña"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#38B5AD] focus:border-[#38B5AD] sm:text-sm"
              required
            />
          </div>

          {/* Botón de Inicio de Sesión */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#38B5AD] text-white font-semibold rounded-md shadow hover:bg-[#5CC1CE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38B5AD]"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        {/* Enlace de Registro */}
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
