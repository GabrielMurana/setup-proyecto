const Bicicleta = require('../../model/bicicleta')
const mongoose = require('mongoose')
// Me conecto a la BDD de test.
const bddString = 'mongodb://localhost:27017/red_bicicletas_test' // string de conexion

beforeAll((done) =>  {
  mongoose.connect(bddString, {
    // Modifico el timeout de conexion a la bdd por defecto son 30s
    // Y el timeout de jasmine es de 10, por tanto me daria el error de timeout
    // de jasmine antes de obtener la respuesta de la bdd (sobre todo en casos de error)
    serverSelectionTimeoutMS: 1000
  })
  .then(
    ()=> {
      console.log('Conexion exitosa')
      done()
    })
  .catch(err => {
    console.log('Error de conexion::', err)
    done()
  })  
})

afterAll(function (done) {
  console.log('AFTER..... Elimino los documentos')
  const elminados = Bicicleta.deleteMany({}) // retorna una query el cual tiene el metodo then como si fuera una promesa
  elminados
    .then((doc) => { // el method then ejecuta el query.
      console.log('Cantidad eliminados: ', doc.deletedCount)
      done()
    })
    .catch(error => { // Tambien es un metodo de query similar a las promesas
      console.log('Error: ', error)
      done()
    })
})

// Describe es un grupo de tests. En este caso la lista de bicis
describe('Bicicileta.allBicis ', () => {
  it('La lista debe estar vacia', (done) => {
    Bicicleta.allBicis()
      .then(bici => {
        console.log('Bicis: ', bici)
        expect(bici.length).toBe(0)
        done()
      })
  })
})

describe('Bicicleta.add', () => {
  it('agregamos una bici', (done) => {
    Bicicleta.allBicis()
      .then(bicis => {
        expect(bicis.length).toBe(0)
        const bicicletas = [
          Bicicleta.createInstance(12, 'Negra', 'Modelo de prueba', [2,3]),
          Bicicleta.createInstance(13, 'Marrón', 'Modelo de prueba nro 2', [12,11])
        ]
        return Bicicleta.add(bicicletas)
      })
      .then(res => {
        // Res es el objeto que se agrego
        console.log('bdd res: ', res)
        console.log('Color', res[0].color)
        expect(res[0].color).toBe('Negra')
        // Busco nuevamente las bicis en la bdd y retorno la promesa
        return Bicicleta.allBicis()
        done()
      })
      .then(bicisEnBDD => {
        expect(bicisEnBDD.length).toBe()
        done()
      })
      .catch(err => {
        console.log('Error ', err)
        done()
      })
      //done()
      

  })
})

/* describe('Bicicleta.find', () => {
  it('devuelve la bici con el id 1', () => {
    expect(Bicicleta.allBicis.length).toBe(0)
    const bici = new Bicicleta(1, 'Roja', 'montaña')
    const bici2 = new Bicicleta(3, 'Verde', 'montaña')
    Bicicleta.add(bici)
    Bicicleta.add(bici2)
    const biciTarget = Bicicleta.find(1)
    expect(biciTarget.id).toBe(1)
    expect(biciTarget.color).toBe('Roja')
    expect(biciTarget.modelo).toBe('montaña')
  })
})

describe('Bicicleta.removeById', () => { 
  it('Elimina la bicileta con el id 1', () => {
    expect(Bicicleta.allBicis.length).toBe(0)
    // Agrego dos bicicletas
    const bici = new Bicicleta(1, 'Roja', 'montaña')
    const bici2 = new Bicicleta(3, 'Verde', 'montaña')
    Bicicleta.add(bici)
    Bicicleta.add(bici2)

    Bicicleta.removeById(1)

    // Verifico que el listado tenga un solo elemento:
    expect(Bicicleta.allBicis.length).toBe(1)
    // Verifico que se el id 1 ya no se encuentra en el listado.
    // El metodo find debe lanzar una Error
    // Ver que en el expect el llamado al metodo va dentro de la arrow function
    expect(()=> Bicicleta.find(1)).toThrowError('No existe la bici con el id 1')


  })
})*/
