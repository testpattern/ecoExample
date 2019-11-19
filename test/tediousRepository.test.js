var tediousRepository = require('../repositories/tediousRepository');

describe('TediousRepository...', () => {

  describe('executeQuery...', () => {

    test('Returns error when query is null or empty', () => {

      // mock set connected to true
      tediousRepository.__testHelper.setConnected(true);

      tediousRepository.executeQuery(null, { param: '1' })
        .then(r => {
          expect.fail('should not resolve')
        })
        .catch(e => {
          expect(e.statusCode).toBe(400);
        });
    });

    test('Returns error when connected is false is null or empty', () => {

      tediousRepository.__testHelper.setConnected(false);

      tediousRepository.executeQuery(null, null)
        .then(r => {
          expect.fail('should not resolve')
        })
        .catch(e => {
          expect(e.statusCode).toBe(503);
        });
    });

    test('Rejects when database request has error', () => {

      tediousRepository.__testHelper.setConnected(true);
      debugger;
      tediousRepository.executeQuery('query', null)
        .then(r => {
          expect.fail('should not resolve')
        })
        .catch(e => {
          expect(e).not.toBe(null);
        });
    });
  });

  describe('execInsertMeterReading...', () => {


    test('Returns error when query is null or empty', () => {

      tediousRepository.__testHelper.setConnected(true);

      tediousRepository.execInsertMeterReading(null)
        .then(r => {
          expect.fail('should not resolve')
        })
        .catch(e => {
          expect(e.statusCode).toBe(400);
        });
    });

    test('Returns error when connected is false is null or empty', () => {

      tediousRepository.__testHelper.setConnected(false);

      tediousRepository.execInsertMeterReading({ value: 1 })
        .then(r => {
          expect.fail('should not resolve')
        })
        .catch(e => {
          expect(e.statusCode).toBe(503);
        });
    });

    test('Rejects when database request has error', () => {

      tediousRepository.__testHelper.setConnected(true);

      tediousRepository.execInsertMeterReading({ value: 1 })
        .then(r => {
          expect.fail('should not resolve')
        })
        .catch(e => {
          expect(e).not.toBe(null);
        });
    });
  });
});