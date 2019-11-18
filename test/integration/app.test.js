var app = require('../../app');
var chaiLib = require("chai"),
  chaiHttp = require('chai-http');
var expect = chaiLib.expect;
chaiLib.use(chaiHttp);
var sinon = require('sinon');
var repository = require('../../repositories/repository');

describe.only('getMeterReadings endpoint...', () => {

  // let request = chaiLib.request(app).keepOpen();
  // afterAll(() => {
  //   request.close();
  //   try {
  //     repository.getMeterReadings.restore();
  //   }
  //   catch { }
  // });

  it('getMeterReadings returns error when repository rejects', (done) => {

    sinon.stub(repository, 'getMeterReadings')
      .returns(Promise.reject({ errorMessage: 'Error' }));

    return chaiLib.request(app)
      .get("/meter-read/customer1/serial1")
      // .get('/customerId/serialNumber')
      .then(res => {
        console.log(res);
        res.should.have.status(200);
      })
      .catch(err => {
        console.error(err);
        throw err; // Re-throw the error if the test should fail when an error happens
      });

    // chaiLib.request(app)
    //   .get("/meter-read/customer1/serial1")
    //   .end((err, res) => {
    //     if (err) return done(err);
    //     console.log(res);
    //     res.should.have.status(200);
    //     done();
    //   });

    // await chaiLib.request(app)
    //   .get('/meter-read/customerId1/14558855112')
    //   .then(r => {
    //     console.log(r);
    //   })
    //   .catch(e => {
    //     // throw e;
    //     // console.error(e);
    //     expect(e).not.to.be.null;
    //   });

  });

});
/*
describe.skip('Index...', () => {

  let request = chaiLib.request(app).keepOpen();

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


// returning a 503 (it takes half a second for the db to connect...)
describe('App...', () => {

  // describe.skip('getMeterReading endpoint...', () => {
  //   afterEach(() => {
  //     // not every test needs this, so try-catch for convenience
  //     try {
  //       repository.getMeterReadings.restore();
  //     }
  //     catch { }
  //   });


  //   it('Returns error when repository rejects', () => {

  //     sinon.stub(repository, 'getMeterReadings')
  //       .returns(Promise.reject({ statusCode: 500, error: 'Error' }));

  //     chaiLib.request(app)
  //       .get('/meter-read/customerId3/3726372549')
  //       .then(r => {
  //         expect.fail('Should not resolve');
  //       }).catch(e => {
  //         expect(err.error).toBe('Error');
  //         expect(res).statusCode.toBe(500);
  //       });
  //   });

  //   it('Returns empty array when repository resolves with empty result', () => {

  //     sinon.stub(repository, 'getMeterReadings')
  //       .returns(Promise.resolve([]));

  //     chaiLib.request(app)
  //       .get('/meter-read/customerId3/3726372549')
  //       .then(r => {
  //         expect(r).statusCode.toBe(200);
  //       })
  //       .catch(() => {
  //         expect.fail('Should not throw');
  //       });
  //   });

  //   it('Returns item when repository resolves', () => {

  //     sinon.stub(repository, 'getMeterReadings')
  //       .returns(Promise.reject({ error: 'Error' }));

  //     chaiLib.request(app)
  //       .get('/meter-read/customerId3/3726372549')
  //       .end((err, res) => {
  //         expect(err.error).toBe('Error');
  //         expect(res).statusCode.toBe(500);
  //       });
  //   });
  // });
});

// describe('Index...', () => {
//   it('returns index page html', async () => {
//     await request.get('/', (e, r) => {
//       expect(r).not.to.be.null;
//       expect(r).not.to.be.undefined;
//       expect(e).to.be.undefined;
//     });
//   });
// });
*/