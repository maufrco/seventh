const request = require('supertest');
const app = require('../../src/app');

describe('Api Endpoints', () => {
     

    it('should post a host',async done => {

      const response = await request(app).post('/host').send({
        name: 'test is cool',
        protocol: 'https://',
        domain: 'www.seventh.com.br',
        path: '/',
      })
      expect(response.status).toEqual(201)
      done()
    });

    it('should post a monitor',async done => {

      const response = await request(app).post('/monitor').send({
        "hostId": 1,
        "url": "https://www.seventh.com.br",
        "status": "200 Ok",
        "statusCod": 200,
        "timeResponse": 345640146,
        "monitorDate": "2020-03-24 12:47:32"
      })
      expect(response.status).toEqual(201)
      done()
    });
   
    it('should fetch an monitors', async done => {
      const response = await request(app).get('/monitor/1')
      expect(response.status).toEqual(200)
      done()
  });

    it('should fetch all hosts',async done => {
      const response = await request(app).get('/host')
      expect(response.status).toEqual(200)
      done()
    });

    it('should delete an hosts',async done => {
      const response = await request(app).delete('/host/1')
      expect(response.status).toEqual(200)
      done()
    });
  });