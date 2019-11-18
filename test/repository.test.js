var repository = require('../repositories/repository');
var tediousRepository = require('../repositories/tediousRepository');
var sinon = require('sinon');

describe('Repository...', () => {

  describe('executeQuery...', () => {

    afterEach(() => {
      // not every test needs this, so try-catch for convenience
      try {
        tediousRepository.executeQuery.restore();
      }
      catch { }
    });

    test('Returns error when customerId is null or empty', () => {

      repository.getMeterReadings(null, 'serial')
        .then(r => {
          expect.fail;
        }).catch(e => {
          expect(e).not.toBe(null);
          expect(e.statusCode).toBe(400);
          expect(e.errorMessage).not.toBe(null);
        })
    });

    test('Returns error when serialNumber is null or empty', () => {

      repository.getMeterReadings('customerId')
        .then(r => {
          expect.fail;
        }).catch(e => {
          expect(e).not.toBe(null);
          expect(e.statusCode).toBe(400);
          expect(e.errorMessage).not.toBe(null);
        })
    });

    test('Returns error when customerId and serialNumber null or empty', () => {
      repository.getMeterReadings(null, null)
        .then(r => {
          expect.fail;
        }).catch(e => {
          expect(e).not.toBe(null);
          expect(e.statusCode).toBe(400);
          expect(e.errorMessage).not.toBe(null);
        })
    });

    test('Rejects when underlying repository rejects', () => {

      sinon.stub(tediousRepository, 'executeQuery')
        .returns(Promise.reject({ error: 'Error' }));

      repository.getMeterReadings('c', 's')
        .then(r => {
          expect.fail;
        }).catch(e => {
          expect(e).not.toBe(null);
          expect(e.error).toBe('Error');
        })
    });

    test('Resolves when underlying repository resolves', () => {
      sinon.stub(tediousRepository, 'executeQuery')
        .returns(Promise.resolve({ results: [{ item: 'Item' }] }));

      repository.getMeterReadings('c', 's')
        .then(r => {
          expect(r).not.toBe(null);
          expect(r.results).not.toBe(null);
        }).catch(e => {
          expect.fail;
        });
    });
  });

  describe('insertMeterReading...', () => {

    afterEach(() => {
      // not every test needs this, so try-catch for convenience
      try {
        tediousRepository.execInsertMeterReading.restore();
      }
      catch { }
    });

    test('Returns error when item is null', () => {

      repository.insertMeterReading(null)
        .then(r => {
          expect.fail;
        }).catch(e => {
          expect(e).not.toBe(null);
          expect(e.statusCode).toBe(400);
          expect(e.errorMessage).not.toBe(null);
        })
    });

    test('Rejects when underlying repository rejects', () => {

      sinon.stub(tediousRepository, 'execInsertMeterReading')
        .returns(Promise.reject({ error: 'Error' }));

      repository.insertMeterReading({ 'name': 'value' })
        .then(r => {
          expect.fail;
        }).catch(e => {
          expect(e).not.toBe(null);
          expect(e.error).toBe('Error');
        })
    });

    test('Resolves when underlying repository resolves', () => {
      sinon.stub(tediousRepository, 'execInsertMeterReading')
        .returns(Promise.resolve({ results: [{ item: 'Item' }] }));

      repository.insertMeterReading({ 'name': 'value' })
        .then(r => {
          expect(r).not.toBe(null);
          expect(r.results).not.toBe(null);
        }).catch(e => {
          expect.fail;
        });
    });
  });
});