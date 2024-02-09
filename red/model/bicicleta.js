const mongose = require('mongoose')
const Schema = mongose.Schema

// Defino el esquema, sera el formato de la coleccion

const bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number], index: {type: '2dsphare', sparce: true} // Array de numeros ademas es index.
    }
})

// creo los metodos.
bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion){
    console.log( `Code: ${code} | Color: ${color} | Modelo: ${modelo} | Ubicacion:  ${ubicacion}`)

    return new this({
        code,
        color,
        modelo,
        ubicacion
    })
}

bicicletaSchema.methods.toString = function(){
    return `Code: ${code} | Color: ${color} | Modelo: ${modelo} | Ubicacion:  ${ubicacion}`
}

bicicletaSchema.statics.allBicis = function(){
    return this.find() // retorna un query que se maneja como una promesa metodo then.
}

bicicletaSchema.methods.add = function(bici){
    return this.create(bici)
}

bicicletaSchema.methods.findByCode = function (code){
    return this.findOne({code})
}

bicicletaSchema.methods.removeByCode = function (code){
    return this.deleteOne({code})
}

module.exports = mongose.model('Bicicleta', bicicletaSchema) // El nombre del modelo es el que se crea como colleccion en munus y plural
