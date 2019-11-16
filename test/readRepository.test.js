var readRepository = require('../repositories/readRepository');
var repository = require('../repositories/repository');
var sinon = require('sinon');

describe('Read Repository...', () => {
  
  afterEach(() => {
    repository.executeQuery.restore();
  });

  test('Rejects when underlying repository rejects', () => {
    sinon.stub(repository, 'executeQuery')
      .returns(Promise.reject({ error: 'Error' }));

    readRepository.executeStatement()
      .then(r => {
        expect.fail;
      }).catch(e => {
        expect(e).not.toBe(null);
        expect(e.error).toBe('Error');
      })
  });

  test('Resolves when underlying repository resolves', () => {
    sinon.stub(repository, 'executeQuery')
      .returns(Promise.resolve({ results: [{ item: 'Item' }] }));

    readRepository.executeStatement()
      .then(r => {
        expect(r).not.toBe(null);
        expect(r.results).not.toBe(null);
      }).catch(e => {
        expect.fail;
      });
  });
});