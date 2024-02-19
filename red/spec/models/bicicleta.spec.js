const Bicicleta = require('../../model/bicicleta')
const mongoose = require('mongoose')
// Me conecto a la BDD de test.
const bddString = 'mongodb://localhoster:27017/red_bicicletas_test' // string de conexion
//mongoose.set('bufferCommands', false);
beforeAll((done) =>  {
  mongoose.connect('mongodb://127.0.0.1:27017/test', {
    serverSelectionTimeoutMS: 1000
  })
  .catch(err => {
    console.log('Error de conexion::', err)
    done()
  })

  const Cat = mongoose.model('Cat', { name: String });
  

  const kitty = new Cat({ name: 'Zildjian' });
  console.log(kitty)
  kitty.save()
  .then(() => {
    console.log('meow')
    done()
  })
  
  
// Fin conexion mongo})
})
// Describe es un grupo de tests. En este caso la lista de bicis
describe('Bicicileta.allBicis ', () => {
  it('La lista debe estar vacia', () => {
    const bicis = Bicicleta.allBicis()
      .then(bici => {
        console.log('Bicis: ', bici)
        expect(bici.length).toBe(0)
      })
    
  })
})

describe('Bicicleta.add', () => {
  it('agregamos una bici', (done) => {
    Bicicleta.allBicis()
      .then(bicis =>{
        expect(bicis.length).toBe(0)
        done()
      })
      .catch(err => {
        console.log('Error ', err)
        done()
      })
      done()
      

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
