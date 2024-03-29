// Importo el modelo
const Bicicleta = require('../model/bicicleta')

// Renderizo la vista pasando el array de objetos por param
// Uso async await para esperar el retorno de la bdd
exports.bicicletaList = async function(req, res){
    const bicis = await Bicicleta.allBicis()
    console.log(bicis)    
    res.render('bicicletas/index', {bicis})
}
// Fomrmulario para crear biciletas
exports.bicicletaCreateGet = function(req, res){
    const colors = [
        {
        nombre: 'rojo',
        nombreProp: 'red'
        },
        {
            nombre: 'verde',
            nombreProp: 'green'
        }
    ]
        
    
    res.render('bicicletas/create', {colors})
}
// crear biciletas POST
exports.bicicletaCreatePost = function(req, res){
    //Creo el objeto con los datos del body y lo agrego al array de bicis
    console.log(req.body)

    const reqBody = req.body
    const id = parseInt(reqBody.id)
    const bici = new Bicicleta(id, reqBody.color, reqBody.modelo)
    bici.ubicacion = [reqBody.lat, reqBody.lng]

    Bicicleta.add(bici)
    res.redirect('/bicicletas')
}

// Eliminar Bicicleta
exports.bicicletaDeletePost = function(req, res){
    const id = req.body.id
    Bicicleta.removeById(id)
    res.redirect('/bicicletas')
}

exports.bicicletaUpdateGet = function(req, res){
    const id = req.params.id
    bici = Bicicleta.find(id)
    res.render('bicicletas/update', {bici: bici, colors: Bicicleta.colors})
}
exports.bicicletaUpdatePost = function(req, res){
    const reqBody = req.body
    const id = reqBody.id 
    const bici = Bicicleta.find(id)
    bici.id = id
    bici.color = reqBody.color
  bici.modelo = reqBody.modelo
  bici.ubicacion = [
    reqBody.lat,
    reqBody.lng
  ]

  res.redirect('/bicicletas')

}