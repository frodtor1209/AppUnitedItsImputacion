const pool = require('../config/db');

const getImputaciones = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM imputaciones ORDER BY fecha DESC, hora_inicio DESC'
    );

    res.json({
      status: 'success',
      data: rows
    });
  } catch (error) {
    console.error('Error al obtener imputaciones:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener las imputaciones'
    });
  }
};

const createImputacion = async (req, res) => {
  try {
    const {
      fecha,
      horaInicio,
      horaFin,
      horas,
      proyecto,
      tarea,
      descripcion,
      userId,
      userName
    } = req.body;

    const [result] = await pool.execute(
      `INSERT INTO imputaciones 
       (fecha, hora_inicio, hora_fin, horas, proyecto, tarea, descripcion, user_id, user_name) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [fecha, horaInicio, horaFin, horas, proyecto, tarea, descripcion, userId, userName]
    );

    res.status(201).json({
      status: 'success',
      message: 'Imputación guardada correctamente',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error al crear imputación:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al guardar la imputación'
    });
  }
};

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

    const [result] = await pool.execute(
      `UPDATE imputaciones 
       SET fecha = ?, hora_inicio = ?, hora_fin = ?, horas = ?, 
           proyecto = ?, tarea = ?, descripcion = ?
       WHERE id = ?`,
      [fecha, horaInicio, horaFin, horas, proyecto, tarea, descripcion, id]
    );

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
      message: 'Error al actualizar la imputación'
    });
  }
};

const deleteImputacion = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'DELETE FROM imputaciones WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Imputación no encontrada'
      });
    }

    res.json({
      status: 'success',
      message: 'Imputación eliminada correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar imputación:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al eliminar la imputación'
    });
  }
};

module.exports = {
  getImputaciones,
  createImputacion,
  updateImputacion,
  deleteImputacion
};