var Repository = require('../repositories/repository').Repository;
var mockTediousRepository = require('./mocks/mockTediousRepository');
var sinon = require('sinon');

describe('Repository...', () => {


  describe('executeQuery...', () => {

    afterEach(() => {
      // not every test needs this, so try-catch for convenience
      try {
        mockTediousRepository.executeQuery.restore();
      }
      catch { }
    });

    test('Returns error when customerId is null or empty', () => {

      sinon.stub(mockTediousRepository, 'executeQuery')
        .returns(Promise.reject({ error: 'Error' }));

      var repository = new Repository(mockTediousRepository);

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
      sinon.stub(mockTediousRepository, 'executeQuery')
        .returns(Promise.reject({ error: 'Error' }));

      var repository = new Repository(mockTediousRepository);
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
      sinon.stub(mockTediousRepository, 'executeQuery')
        .returns(Promise.reject({ error: 'Error' }));

      var repository = new Repository(mockTediousRepository);
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
      sinon.stub(mockTediousRepository, 'executeQuery')
        .returns(Promise.reject({ error: 'Error' }));

      var repository = new Repository(mockTediousRepository);
      repository.getMeterReadings('c', 's')
        .then(r => {
          expect.fail;
        }).catch(e => {
          expect(e).not.toBe(null);
          expect(e.error).toBe('Error');
        })
    });

    test('Resolves when underlying repository resolves', () => {

      sinon.stub(mockTediousRepository, 'executeQuery')
        .returns(Promise.resolve({ results: [{ item: 'Item' }] }));

      var repository = new Repository(mockTediousRepository);

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
        mockTediousRepository.execInsertMeterReading.restore();
      }
      catch { }
    });

    test('Returns error when item is null', () => {

      sinon.stub(mockTediousRepository, 'execInsertMeterReading')
        .returns(Promise.reject({ error: 'Error' }));

      var repository = new Repository(mockTediousRepository);

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

      sinon.stub(mockTediousRepository, 'execInsertMeterReading')
        .returns(Promise.reject({ error: 'Error' }));

      var repository = new Repository(mockTediousRepository);

      repository.insertMeterReading({ 'name': 'value' })
        .then(r => {
          expect.fail;
        }).catch(e => {
          expect(e).not.toBe(null);
          expect(e.error).toBe('Error');
        });
    });

    test('Resolves when underlying repository resolves', () => {

      sinon.stub(mockTediousRepository, 'execInsertMeterReading')
        .returns(Promise.resolve({ results: [{ item: 'Item' }] }));

      var repository = new Repository(mockTediousRepository);

      repository.insertMeterReading({ 'name': 'value' })
        .then(r => {
          expect(r).not.toBe(null);
          expect(r.results.length).toBe(1);
        }).catch(e => {
          expect.fail;
        });
    });
  });
});