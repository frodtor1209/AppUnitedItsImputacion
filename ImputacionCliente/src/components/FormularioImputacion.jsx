import { useState } from "react";

export default function FormularioImputacion({ userId, userName }) {
  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [proyecto, setProyecto] = useState("");
  const [tarea, setTarea] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fecha && horaInicio && horaFin && proyecto && tarea && descripcion) {
      setIsLoading(true);
      setError("");
      
      const horas = calcularHoras(horaInicio, horaFin);
      const nuevaImputacion = { 
        fecha, 
        horaInicio, 
        horaFin, 
        horas, 
        proyecto, 
        tarea, 
        descripcion,
        userId,
        userName 
      };

      try {
        const response = await fetch('http://localhost:3000/imputaciones', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevaImputacion)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Error al guardar la imputación');
        }

        // Limpiamos el formulario
        setFecha("");
        setHoraInicio("");
        setHoraFin("");
        setProyecto("");
        setTarea("");
        setDescripcion("");

        // Recargamos la lista de imputaciones si es necesario
        if (typeof onSuccess === 'function') {
          onSuccess();
        }

      } catch (error) {
        setError(error.message);
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const calcularHoras = (inicio, fin) => {
    const [horaInicio, minInicio] = inicio.split(":").map(Number);
    const [horaFin, minFin] = fin.split(":").map(Number);
    const diferenciaMinutos = horaFin * 60 + minFin - (horaInicio * 60 + minInicio);
    return (diferenciaMinutos / 60).toFixed(2);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-[#38B5AD]">Registrar Imputación</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">
            Fecha
          </label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
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
            value={proyecto}
            onChange={(e) => setProyecto(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#38B5AD] focus:border-[#38B5AD] sm:text-sm"
            disabled={isLoading}
          >
            <option value="" disabled>
              Selecciona un proyecto
            </option>
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
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
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
            value={horaFin}
            onChange={(e) => setHoraFin(e.target.value)}
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
            value={tarea}
            onChange={(e) => setTarea(e.target.value)}
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
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#38B5AD] focus:border-[#38B5AD] sm:text-sm"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="col-span-2 py-2 px-4 bg-[#38B5AD] text-white font-medium rounded-md shadow-sm hover:bg-[#38B5AD]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#38B5AD] disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Guardando..." : "Agregar Imputación"}
        </button>
      </form>
    </div>
  );
}