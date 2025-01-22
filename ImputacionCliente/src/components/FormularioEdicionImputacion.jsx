import { useState } from "react";

export default function FormularioEdicionImputacion({ imputacion, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    fecha: imputacion.fecha,
    horaInicio: imputacion.horaInicio,
    horaFin: imputacion.horaFin,
    proyecto: imputacion.proyecto,
    tarea: imputacion.tarea,
    descripcion: imputacion.descripcion,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const horasCalculadas = calcularHoras(formData.horaInicio, formData.horaFin);
    const datosActualizados = {
      ...formData,
      id: imputacion.id,
      horas: horasCalculadas,
    };

    try {
      const response = await fetch('http://localhost/ActualizarImputacion.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosActualizados)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar la imputación');
      }

      onSave(datosActualizados);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const calcularHoras = (inicio, fin) => {
    const [horaInicio, minInicio] = inicio.split(":").map(Number);
    const [horaFin, minFin] = fin.split(":").map(Number);
    const diferenciaMinutos = horaFin * 60 + minFin - (horaInicio * 60 + minInicio);
    return (diferenciaMinutos / 60).toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">
            Fecha
          </label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#38B5AD] focus:border-[#38B5AD] sm:text-sm"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="proyecto" className="block text-sm font-medium text-gray-700">
            Proyecto
          </label>
          <select
            id="proyecto"
            name="proyecto"
            value={formData.proyecto}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#38B5AD] focus:border-[#38B5AD] sm:text-sm"
            disabled={isLoading}
          >
            <option value="proyecto1">Proyecto 1</option>
            <option value="proyecto2">Proyecto 2</option>
            <option value="proyecto3">Proyecto 3</option>
          </select>
        </div>
        <div>
          <label htmlFor="horaInicio" className="block text-sm font-medium text-gray-700">
            Hora de inicio
          </label>
          <input
            type="time"
            id="horaInicio"
            name="horaInicio"
            value={formData.horaInicio}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#38B5AD] focus:border-[#38B5AD] sm:text-sm"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="horaFin" className="block text-sm font-medium text-gray-700">
            Hora de fin
          </label>
          <input
            type="time"
            id="horaFin"
            name="horaFin"
            value={formData.horaFin}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#38B5AD] focus:border-[#38B5AD] sm:text-sm"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="tarea" className="block text-sm font-medium text-gray-700">
            Tarea
          </label>
          <input
            type="text"
            id="tarea"
            name="tarea"
            value={formData.tarea}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#38B5AD] focus:border-[#38B5AD] sm:text-sm"
            disabled={isLoading}
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#38B5AD] focus:border-[#38B5AD] sm:text-sm"
            disabled={isLoading}
          />
        </div>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38B5AD]"
          disabled={isLoading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#38B5AD] hover:bg-[#38B5AD]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38B5AD]"
          disabled={isLoading}
        >
          {isLoading ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}