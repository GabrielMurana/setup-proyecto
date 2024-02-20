const mongoose = require('mongoose')
const Reserva = require('./reserva')
const Schema = mongoose.Schema

// Defino el esquema el cual es validado por mongoose
const usuarioSchema = new Schema({
  nombre: String
})

// agrego metodos de instancia
usuarioSchema.methods.reservar = async function (biciId, desde, hasta) {
  const reserva = new Reserva({
    usuario: this._id,
    bicicleta: biciId,
    desde,
    hasta
  })

  // console.log('Es instancia de Model: ', reserva instanceof mongoose.Model) // true
  console.log('reserva', reserva) // logueo el documento

  return reserva.save()

  /* await reserva.save()
    .then(resGuardada => {
      console.log('Se guarda la reserva', resGuardada)
    }) */
}
// El nombre del modelo debe ser capitalizado y singular.
// al crearse la coleccion en mongo quedaria usuarios minus y plural
module.exports = mongoose.model('Usuario', usuarioSchema)
