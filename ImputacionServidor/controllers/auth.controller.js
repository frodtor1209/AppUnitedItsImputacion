const pool = require('../config/db');

const login = async (req, res) => {
  try {
    const { user, password } = req.body;

    if (!user || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Usuario y contraseña son requeridos'
      });
    }

    const [rows] = await pool.execute(
      'SELECT id, name, username FROM users WHERE username = ? AND password = ?',
      [user, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        status: 'error',
        message: 'Credenciales incorrectas'
      });
    }

    const userData = rows[0];

    res.json({
      status: 'success',
      message: 'Bienvenido!',
      userId: userData.id,
      userName: userData.name,
      username: userData.username
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error en el servidor'
    });
  }
};

module.exports = {
  login
};