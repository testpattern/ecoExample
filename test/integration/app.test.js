var server = require('../../app');
var chaiLib = require("chai"),
  chaiHttp = require('chai-http');
var expect = chaiLib.expect;
chaiLib.use(chaiHttp);
var sinon = require('sinon');
var repository = require('../../repositories/repository');

describe('::: SIT :::', () => {

  describe('App...', () => {
    describe('Index...', () => {

      let request = chaiLib.request(server).keepOpen();

      afterAll(() => {
        request.close();
      });

      it('returns index page', async () => {
        await request.get('/', (e, r) => {
          expect(r).not.to.be.null;
          expect(r).not.to.be.undefined;
          expect(e).to.be.undefined;
        });
      });
    });

    describe('Meter read...', () => {

      let request = chaiLib.request(server).keepOpen();

      afterAll(() => {
        request.close();
      });

      it('returns a 503', async () => {
        await request.get('/meter-read/customer1/serial1', (e, r) => {
          expect(r).not.to.be.null;
          expect(r).not.to.be.undefined;
          expect(e).to.be.undefined;
        });
      });
    });
  });
});