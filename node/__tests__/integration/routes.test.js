const request = require('supertest');
const app = require('../../src/app');

describe('Api Endpoints', () => {
     
  it('should fetch all hosts',async done => {
      const response = await request(app).get('/host')
      expect(response.status).toEqual(200)
      expect(response.body).toHaveProperty('get')
      done()
    });

   
    it('should fetch all monitors', async done => {
        const response = await request(app).get('/monitor')
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('get')

        done()
    });


    it('should post a host',async done => {

      const response = await request(app).post('/host').send({
        name: 'test is cool',
        protocol: 'https://',
        domain: 'www.seventh.com.br',
        path: '/',
      }).set('Accept', 'application/json')
        
      expect('Content-Type', /json/)
      expect(response.body).toHaveProperty('post')
      expect(response.status).toEqual(201)
      done()
    });
   

    it('should fetch all hosts',async done => {
      const response = await request(app).delete('/host/1')
      expect(response.status).toEqual(200)
      expect(response.body).toHaveProperty('delete')
      done()
    });
  });