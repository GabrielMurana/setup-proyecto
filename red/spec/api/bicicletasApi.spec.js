const server = require('../../bin/www') // lo mimporto para que se ejecute. El server
const Bicicleta = require('../../model/bicicleta')
const request = require('request')

describe('Bicicleta API', () => {
  describe('GET BICICLETAS /', () => {
    it('status 200', (done) => {
      expect(Bicicleta.allBicis.length).toBe(0)

      const bici = new Bicicleta(1, 'Roja', 'montaña', [33, 334])
      Bicicleta.add(bici)
      // console.log(Bicicleta.allBicis)
      request.get('http://127.0.0.1:3000/api/bicicletas', function (_err, response, body) {
        // console.log(response)
        expect(response.statusCode).toBe(200)
        done()
      })
    })
  })

  describe('POST BICICLETAS /create', () => {
    it('status 200', (done) => {
      expect(Bicicleta.allBicis.length).toBe(0)
      const headers = { 'content-type': 'application/json' }
      const bdy = {
        id: 10,
        color: 'griii',
        modelo: 'calle',
        lat: 33,
        lng: 55
      }
      const bdyJSONString = JSON.stringify(bdy)
      const body = '{"id":10, "color":"griii", "modelo": "poronga", "lat":22, "lng": 44}' // obj string
      request.post(
        {
          headers,
          url: 'http://127.0.0.1:3000/api/bicicletas/create',
          body: bdyJSONString
        }, function (_err, response, body) {
          expect(response.statusCode).toBe(200)
          expect(Bicicleta.find(10).color).toBe('griii')
          done()
        }
      )
    })
  })

  describe('POST BICICLETAS /update', () => {
    it('status 200', (done) => {
      expect(Bicicleta.allBicis.length).toBe(0)

      const bici = new Bicicleta(1, 'Roja', 'montaña', [33, 334])
      Bicicleta.add(bici)

      const headers = { 'content-type': 'application/json' }
      const bdy = {
        id: 1,
        color: 'verde',
        modelo: 'calle',
        lat: 33,
        lng: 55
      }
      const bdyJSONString = JSON.stringify(bdy)
      request.post(
        {
          headers,
          url: 'http://127.0.0.1:3000/api/bicicletas/update',
          body: bdyJSONString
        }, function (_err, response, body) {
          expect(response.statusCode).toBe(200)
          expect(Bicicleta.allBicis.length).toBe(1)
          expect(Bicicleta.find(1).color).toBe('verde')
          done()
        }
      )
    })
  })


  describe('DELETE BICICLETAS /delete', () => {
    it('status 204', (done) => {
      expect(Bicicleta.allBicis.length).toBe(0)
      const bici = new Bicicleta(10, 'Roja', 'montaña', [33, 334])
      Bicicleta.add(bici)
      // console.log(Bicicleta.allBicis)
      const headers = { 'content-type': 'application/json' }
      const bdy = {
        id: 10
      }
      const bdyJSONString = JSON.stringify(bdy)
      request.delete(
        {
          headers,
          url: 'http://127.0.0.1:3000/api/bicicletas/delete',
          body:bdyJSONString
        }, function (_err, response, body) {
          expect(response.statusCode).toBe(204)
          expect(Bicicleta.allBicis.length).toBe(0)
          done()
      })
    })
  })
})
