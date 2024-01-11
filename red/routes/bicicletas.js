const express = require('express');
const router = express.Router();
const BicicletaController = require('../controller/bicicleta')

// Listado de bicicletas
router.get('/', BicicletaController.bicicletaList)

// Formulario para Agregar Bicicleta
router.get('/create', BicicletaController.bicicletaCreateGet)
// El POst del formulario
router.post('/create', BicicletaController.bicicletaCreatePost)

//Eliminar Bicicleta.
router.post('/:id/delete', BicicletaController.bicicletaDeletePost)

// Editar bicicleta form el id va por parametro
router.get('/:id/update', BicicletaController.bicicletaUpdateGet)
// Editar post
router.post('/:id/update', BicicletaController.bicicletaUpdatePost)


module.exports = router;