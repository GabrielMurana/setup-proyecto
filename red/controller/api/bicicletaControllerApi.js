const Bicicleta = require("../../model/bicicleta");

// Crud bicicletas APi

// Listado Bicicletas:

/**
 * @param {*} req 
 * @param {*} res 
 * Responde un json con el array de bicicletas.
 */
exports.biciList = function(req, res){
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    })
}

/**
 * @param {*} req 
 * @param {*} res 
 * Crea una bicicleta desde la api con el metodo post tomando los datos del body
 * retorna el listado de bicicletas
 */
exports.biciCreate = function(req, res){
    const reqBody = req.body
    bici = new Bicicleta(reqBody.id, reqBody.color, reqBody.modelo)
    if(reqBody.lat && reqBody.lng){ 
        bici.ubicacion = [reqBody.lat, reqBody.lng]
    }
    
    Bicicleta.add(bici)
    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    })

}

/**
 * @param {*} req 
 * @param {*} res 
 * Elimina bicicletas desde la api por id no retorna nada
 */
exports.biciDelete = function(req, res){
    const id = req.body.id
    Bicicleta.removeById(id)
    res.status(204).send()

}

/**
 * @param {*} req 
 * @param {*} res 
 * Actualiza bicicleta desde la api por id
 * Retorna todas las bicicletas
 */
exports.biciUpdate = function(req, res){
    const reqBody = req.body
    const id = reqBody.id
    const bici = Bicicleta.find(id)
    bici.color = reqBody.color
    bici.modelo = reqBody.modelo
    bici.ubicacion = [
        reqBody.lat,
        reqBody.lng
    ]

    res.status(200).json({
        bicicletas: Bicicleta.allBicis
    })

}