var server = require('../../app');
var chaiLib = require("chai"),
  chaiHttp = require('chai-http');
var expect = chaiLib.expect;
chaiLib.use(chaiHttp);

describe('::: Integration Tests :::', () => {

  // returning a 503 (it takes half a second for the db to connect...)
  describe('App...', () => {

    it('Meter read get endpoint', async () => {
      
      // pre-emptive request
      chaiLib.request(server).get('/');
      let request = chaiLib.request(server).keepOpen();

      await request.get('/meter-read/customerId3/3726372549', (e, r) => {
        expect(r).not.to.be.null;
        expect(r).not.to.be.undefined;
        expect(e).to.be.undefined;
      });

      request.close();
    });

    it('Meter read get endpoint should return empty when no customer found', async () => {
      // pre-emptive request
      chaiLib.request(server).get('/');
      let request = chaiLib.request(server).keepOpen();

      await request.get('/meter-read/customerId4/3726372550', (e, r) => {
        expect(r).not.to.be.null;
        expect(r).not.to.be.undefined;
        expect(e).to.be.undefined;
      });

      request.close();
    });
  });

  describe('Index...', () => {

    let request = chaiLib.request(server).keepOpen();

    afterAll(() => {
      request.close();
    });

    it('returns index page html', async () => {
      await request.get('/', (e, r) => {
        expect(r).not.to.be.null;
        expect(r).not.to.be.undefined;
        expect(e).to.be.undefined;
      });
    });
  });
});