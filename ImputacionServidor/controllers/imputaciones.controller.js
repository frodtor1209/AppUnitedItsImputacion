const pool = require('../config/db');

// ... otros métodos ...

const updateImputacion = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fecha,
      horaInicio,
      horaFin,
      horas,
      proyecto,
      tarea,
      descripcion
    } = req.body;

    console.log('Actualizando imputación:', { id, ...req.body }); // Log para debug

    const [result] = await pool.execute(
      `UPDATE imputaciones 
       SET fecha = ?, 
           hora_inicio = ?, 
           hora_fin = ?, 
           horas = ?, 
           proyecto = ?, 
           tarea = ?, 
           descripcion = ?
       WHERE id = ?`,
      [fecha, horaInicio, horaFin, horas, proyecto, tarea, descripcion, id]
    );

    console.log('Resultado de la actualización:', result); // Log para debug

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Imputación no encontrada'
      });
    }

    res.json({
      status: 'success',
      message: 'Imputación actualizada correctamente'
    });
  } catch (error) {
    console.error('Error al actualizar imputación:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al actualizar la imputación: ' + error.message
    });
  }
};