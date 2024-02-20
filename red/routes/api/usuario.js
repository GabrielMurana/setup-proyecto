const express = require('express')
const router = express.Router()
const usuarioController = require('../../controller/api/usuarioControllerAPI')

router.get('/', usuarioController.usuarioList)
router.post('/create', usuarioController.usuarioCreate)
router.post('/reservar', usuarioController.usuarioReservar)
/*
router.delete('/delete', usuarioController.usuariotaDelete)
router.post('/update', usuarioController.usuarioUpdate)
*/
module.exports = router
