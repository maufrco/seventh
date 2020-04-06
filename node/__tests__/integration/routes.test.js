const request = require('supertest');
const app = require('../../src/app');

describe('Api Endpoints', () => {
     
  it('should fetch all hosts',async done => {
      const response = await request(app).get('/host')
      expect(response.status).toBe(200)
      done()
    });

   
    it('should fetch all monitors', async done => {
        const response = await request(app).get('/monitor')
        expect(response.status).toBe(200)
        done()
    });


    it('should post a host',async done => {

      request(app).post('/host').send({
        name: 'test is cool',
        protocol: 'https://',
        domain: 'www.seventh.com.br',
        path: '/',
      }).set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        done()
    });
   

    it('should fetch all hosts',async done => {
      const response = await request(app).delete('/host/2')
      expect(response.status).toBe(200)
      done()
    });
  });