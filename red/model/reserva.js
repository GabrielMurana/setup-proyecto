const mongoose = require('mongoose')
const moment = require('moment') // agrego la libreria npm install moment
const Schema = mongoose.Schema

const reservaSchema = new Schema({
  desde: Date,
  hasta: Date,
  bicicleta: {
    // referencia al modelo Bicicleta usando el _id
    // a la hoara de realizar un aconsulta a la bdd si usamos populate() sustituye los objIds por los documentos.
    // es como una especie de join. De esta forma accedo a los datos de la bicicleta, asociados a la reserva
    // esto se ve en el mo
    type: mongoose.Schema.Types.ObjectId, ref: 'Bicicleta'
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' // referencia al modelo Bicicleta usando el _id
  }
})

reservaSchema.methods.diasDeReserva = function () {
  return moment(this.hasta).diff(moment(this.desde), 'days') + 1
}

module.exports = mongoose.model('Reserva', reservaSchema)
