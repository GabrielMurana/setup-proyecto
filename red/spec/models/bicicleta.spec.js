const Bicicleta = require('../../model/bicicleta')

// Uso esta funcion para resetear el listado de bicicletas antes de cada test.
beforeEach(() => {
  Bicicleta.allBicis = []
})

// Describe es un grupo de tests. En este caso la lista de bicis
describe('Bicicileta.allBicis ', () => {
  it('La lista debe estar vacia', () => {
    expect(Bicicleta.allBicis.length).toBe(0)
  })
})

describe('Bicicleta.add', () => {
  it('agregamos una bici', () => {
    expect(Bicicleta.allBicis.length).toBe(0)
    const biciA = new Bicicleta(1, 'Rojo', 'Ciudad', [-34.839169, -56.129232])
    Bicicleta.add(biciA)
    expect(Bicicleta.allBicis.length).toBe(1)
    expect(Bicicleta.allBicis[0]).toBe(biciA)
  })
})

describe('Bicicleta.find', () => {
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
})
