const Usuario = require('../../model/usuarios')

// LISTA
exports.usuarioList = function (req, res) {
  // Busco los usuarios en la bdd
  // {nombre: nombre usuario}
  Usuario.find()
    .then(usuarios => {
      res.status(200).json({
        usuarios
      })
    })
}

// CREAR
exports.usuarioCreate = function (req, res) {
  const reqBody = req.body
  const nombre = reqBody.nombre
  const usuario = new Usuario({ nombre })
  usuario.save()
    .then(usuarioGuardado => {
      res.status(200).json({ usuario: usuarioGuardado })
    })
}

exports.usuarioReservar = function (req, res) {
  const reqBody = req.body
  Usuario.findById(reqBody.id)
    .then(usuario => {
      console.log('Usuario', usuario)
      return usuario.reservar(reqBody.biciId, reqBody.desde, reqBody.hasta)
    })
    .then(reserva => {
      console.log('Reserva ', reserva)
      res.status(200).json({ reservita: reserva })
    })
}

// RESERVAR
