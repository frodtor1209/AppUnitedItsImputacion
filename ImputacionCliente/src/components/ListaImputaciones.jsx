export default function ListaImputaciones({ imputaciones }) {
    return (
      <div className="flex-grow overflow-auto">
        <h2 className="text-xl font-semibold mb-4 text-[#38B5AD]">Lista de imputaciones</h2>
        {imputaciones.length === 0 ? (
          <p className="text-gray-500 italic">No hay imputaciones registradas aún.</p>
        ) : (
          <div className="space-y-4">
            {imputaciones.map((imputacion, index) => (
              <div
                key={index}
                className="overflow-hidden border rounded-lg shadow-sm border-[#A0CF9F] bg-white"
              >
                <div className="p-4 grid grid-cols-2 gap-2">
                  <p className="font-semibold text-[#38B5AD]">{imputacion.fecha}</p>
                  <p className="text-right">{imputacion.horas} horas</p>
                  <p>
                    {imputacion.proyecto} - {imputacion.tarea}
                  </p>
                  <p className="text-right">
                    {imputacion.horaInicio} - {imputacion.horaFin}
                  </p>
                  <p className="col-span-2 text-gray-600">{imputacion.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  