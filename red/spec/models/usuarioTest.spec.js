const mongoose = require('mongoose')
const Bicicleta = require('../../model/bicicleta')
const Usuarios = require('../../model/usuarios')
const Reserva = require('../../model/reserva')

describe('Testing de usuarios', function () {
  const mongoURI = 'mongodb://localhost:27017/red_bicicletas_test'
  beforeAll((done) => {
    // Este before no solo abre la coneccion, no crea la bdd porque no hay un schema aun
    // Cuando ejecuto algun metodo sobre el modelo(schema) es que se crea la bdd y la coleccion
    // con el nombre del modelo pero en plural
    main()
      .catch(err => {
        console.log('Error de conexion', err)
      })
      .then(() => {
        console.log('Coneccion exitosa')
        done()
      })
    async function main () {
      await mongoose.connect(mongoURI)
    }
  })

  afterAll(function (done) {
    Reserva.deleteMany()
      .then(resEliminada => {
        console.log(`Cantidad de reservas eliminadas: ${resEliminada.deletedCount}`)
        // retorno la promesa para evitar la piramide del infierno
        return Usuarios.deleteMany({})
      })
      .then((usuariosEliminados) => {
        console.log('Cantidad de usuarios eliminados: ', usuariosEliminados.deletedCount)
        return Bicicleta.deleteMany({})
      })
      .then((bicisEliminadas) => {
        console.log('Cantidad de bicis eliminados: ', bicisEliminadas.deletedCount)
        done() // se ejecuta despues de eliminar usuarios y bicis
      })
  })

  /*  Pyramid of doom
    afterAll(function (done) {
    Reserva.deleteMany()
      .then(resEliminada => {
        console.log(`Cantidad de reservas eliminadas: ${resEliminada.deletedCount}`)
        const elminados = Usuarios.deleteMany({})
        elminados
          .then((doc) => {
            console.log('Cantidad de usuarios eliminados: ', doc.deletedCount)
            const bicisEliminadas = Bicicleta.deleteMany({})
            bicisEliminadas
              .then((bicisEliminadas) => {
                console.log('Cantidad de bicis eliminados: ', bicisEliminadas.deletedCount)
                done() // se ejecuta despues de eliminar usuarios y bicis
              })
          })
          .catch(error => {
            console.log('Error: ', error)
            done()
          })
      })
  }) */

  describe('Cuando un usuario reserva un abici', () => {
    it('debe existir la reserva', (done) => {
      const usuario = new Usuarios({ nombre: 'Juan Puta' })
      usuario.save()
        .then((usuario) => {
          const bicicleta = new Bicicleta({
            code: 1,
            color: 'Marrón',
            modelo: 'Montaña',
            ubicacion: [-34.843692, -56.184312]
          })
          bicicleta.save()
            .then((bici) => {
              console.log('Bici en la Bdd:', bici)
              // una vez guardado el usuario y la bici realizo la logica
              const hoy = new Date()
              const manana = new Date()
              manana.setDate(hoy.getDate() + 1)

              const reservaObject = usuario.reservar(bici._id, hoy, manana) // Retorna la promesa del metodo save() la query en realidad
              reservaObject
                .then(reservaBDD => { // La respuesta del metodo save de mogngoose. Es la reserva en bdd
                  console.log('Reserva en Bdd: ', reservaBDD)
                  // Realizo un find a la colecciond de reservas
                  Reserva.find()
                  // Puedo usar o no exec lo bueno es que retoran una promesa
                  // Populate es para que me retorne los las colecciones asociadas, en este caso usuario y bicicleta
                    .populate('usuario')
                    .populate('bicicleta')
                    .exec()
                    .then((reservas) => {
                      console.log('Reserva desde Find', reservas)
                      // Ejecuto los tests, con la reserva de la BDD
                      expect(reservas.length).toBe(1) // debe haber un solo documento
                      expect(reservas[0].diasDeReserva()).toBe(2)
                      expect(reservas[0].usuario.nombre).toBe('Juan Puta')
                      expect(bicicleta.code).toBe(1)
                      done()
                      // Realizo los test
                    })
                })
              // console.log(`Reserva Object ${reservaObject}`)
              // done()
            })
        // done()
        })
    })
  })

  /* Funciona usando asyncawait en el modelo de usuario en la func reservar
  // Es decir defino la funcion asyncrona en el metodo reservar
  // Y defino el await en el metodo save dentro de reservar
  describe('Cuando un usuario reserva un abici', () => {
    it('debe existir la reserva', (done) => {
      const usuario = new Usuarios({ nombre: 'Juan Puta' })
      usuario.save().then((usuario) => {
        const bicicleta = new Bicicleta({
          code: 1,
          color: 'Marrón',
          modelo: 'Montaña',
          ubicacion: [-34.843692, -56.184312]
        })
        bicicleta.save().then(async (bici) => {
          console.log('BICI:', bici)
          // una vez guardado el usuario y la bici realizo la logica
          const hoy = new Date()
          const manana = new Date()
          manana.setDate(hoy.getDate() + 1)

          usuario.reservar(bici._id, hoy, manana).then((r) => {
            console.log('Reservado', r)
            done()
          })
          // done()
        })
      })
    })
  }) */
})
