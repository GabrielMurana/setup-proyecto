const Bicicleta = function(id, color, modelo, ubicacion){
    this.id = id
    this.color = color
    this.modelo = modelo
    this.ubicacion = ubicacion
}

Bicicleta.colors = [
    {
        id: 1,
        nombre: 'Rojo',
        nombreProp: 'red'
    },
    {
        id: 2,
        nombre: 'Verde',
        nombreProp: 'green'
    },
    {
        id: 3,
        nombre: 'Marron',
        nombreProp: 'brown'
    },
    {
        id: 4,
        nombre: 'Violeta',
        nombreProp: 'violet'
    },
]
Bicicleta.allBicis = []

// Metodos
// Agregar Bicicleta
Bicicleta.add = function(bici){
    Bicicleta.allBicis.push(bici)
}
// Buscar Bicicleta por id
Bicicleta.find = function(id){
    const bici = Bicicleta.allBicis.find(bici => bici.id == id)
    if (bici) return bici
    // Si no la encuentra lanza una excepcion
    throw new Error (`No existe la bici con el id ${id}`)

}

Bicicleta.removeById = function(id) {
    // Filter retorna un array con los elementos que cumplan la condicion
    // Como no modifica el array original modifoco el original con el nuevo array
    Bicicleta.allBicis = Bicicleta.allBicis.filter(bici => bici.id != id)
}



const biciA = new Bicicleta(1, 'Rojo', 'Ciudad', [-34.8386011, -56.1320522])
const biciB = new Bicicleta(2, 'Verde', 'Ciudad', [-34.8505188,-56.1338887])

Bicicleta.add(biciA)
Bicicleta.add(biciB)

// Exporto el modulo
module.exports = Bicicleta
