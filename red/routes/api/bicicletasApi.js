const express = require('express');
const router = express.Router();

const BicicletaController = require('../../controller/api/bicicletaControllerApi')

// Listado de bicicletas
router.get('/', BicicletaController.biciList)
//Crear bicicleta
router.post('/create', BicicletaController.biciCreate)
//ELiminar BIci
router.delete('/delete', BicicletaController.biciDelete)
// Actualizar bici
router.post('/update', BicicletaController.biciUpdate)

module.exports = router;