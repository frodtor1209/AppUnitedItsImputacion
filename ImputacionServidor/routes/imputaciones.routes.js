const express = require('express');
const router = express.Router();
const {
  getImputaciones,
  createImputacion,
  updateImputacion,
  deleteImputacion
} = require('../controllers/imputaciones.controller');

router.get('/', getImputaciones);
router.post('/', createImputacion);
router.put('/:id', updateImputacion);
router.delete('/:id', deleteImputacion);

module.exports = router;