const request = require('supertest');
const app = require('../../src/app');
const http = require('http');



describe('Api Endpoints', () => {
    it('should fetch a single post', async ()=> {
        
      http.post('/host')
        .send({
          userId: 1,
          name: 'test is cool',
          protocol: 'https://',
          domain: 'www.seventh.com.br',
          path: '/',
        });
        console.log(res.statusCode)
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('post');
    })
})