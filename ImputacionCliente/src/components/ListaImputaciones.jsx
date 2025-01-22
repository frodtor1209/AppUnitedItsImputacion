import { useState, useEffect } from 'react';
import FormularioEdicionImputacion from './FormularioEdicionImputacion';

export default function ListaImputaciones() {
  const [imputaciones, setImputaciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imputacionEnEdicion, setImputacionEnEdicion] = useState(null);

  useEffect(() => {
    cargarImputaciones();
  }, []);

  const cargarImputaciones = async () => {
    try {
      const response = await fetch('http://localhost/ObtenerImputacion.php');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al cargar las imputaciones');
      }

      if (data.status === 'success') {
        setImputaciones(data.data);
      } else {
        throw new Error(data.message || 'Error al obtener las imputaciones');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditar = (imputacion) => {
    setImputacionEnEdicion(imputacion);
  };

  const handleCancelarEdicion = () => {
    setImputacionEnEdicion(null);
  };

  const handleGuardarEdicion = async (imputacionActualizada) => {
    try {
      // Actualizar el estado local
      setImputaciones(prev =>
        prev.map(imp =>
          imp.id === imputacionActualizada.id ? imputacionActualizada : imp
        )
      );
      setImputacionEnEdicion(null);
      await cargarImputaciones(); // Recargar para asegurar datos actualizados
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#38B5AD]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        <p>Error al cargar las imputaciones: {error}</p>
        <button
          onClick={cargarImputaciones}
          className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="flex-grow overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#38B5AD]">Lista de imputaciones</h2>
        <button
          onClick={cargarImputaciones}
          className="px-3 py-1 text-sm bg-[#38B5AD] text-white rounded-md hover:bg-[#38B5AD]/90"
        >
          Actualizar
        </button>
      </div>

      {imputaciones.length === 0 ? (
        <p className="text-gray-500 italic">No hay imputaciones registradas aún.</p>
      ) : (
        <div className="space-y-4">
          {imputaciones.map((imputacion) => (
            <div
              key={imputacion.id}
              className="overflow-hidden border rounded-lg shadow-sm border-[#A0CF9F] bg-white hover:shadow-md transition-shadow"
            >
              {imputacionEnEdicion?.id === imputacion.id ? (
                <div className="p-4">
                  <FormularioEdicionImputacion
                    imputacion={imputacion}
                    onCancel={handleCancelarEdicion}
                    onSave={handleGuardarEdicion}
                  />
                </div>
              ) : (
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#38B5AD]">
                        {new Date(imputacion.fecha).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => handleEditar(imputacion)}
                        className="text-sm text-[#38B5AD] hover:text-[#38B5AD]/80 px-2 py-1 rounded"
                      >
                        Editar
                      </button>
                    </div>
                    <p className="text-right">{imputacion.horas} horas</p>
                    <p>
                      <span className="font-medium">{imputacion.proyecto}</span> - {imputacion.tarea}
                    </p>
                    <p className="text-right text-gray-600">
                      {imputacion.horaInicio} - {imputacion.horaFin}
                    </p>
                    <p className="col-span-2 text-gray-600 mt-2">{imputacion.descripcion}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}