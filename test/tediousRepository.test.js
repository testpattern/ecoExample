var repository = require('../repositories/repository');
var tediousRepository = require('../repositories/tediousRepository');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var sinon = require('sinon');
var EventEmitter = require('events').EventEmitter;

describe.only('TediousRepository...', () => {

  test.only('Attempt', () => {
    var conn = sinon.createStubInstance(Connection);
    conn.on.withArgs('connect').yields();

    var req = sinon.createStubInstance(Request);
    req.on.withArgs('row').yields(null);

    // var emitter = new EventEmitter;
    // emitter.emit('connect');
    // emitter.emit('row');

    setTimeout(() => {
      tediousRepository.executeQuery('query', {})
        .then(i => {
          expect.fail;
        }).catch(i => {
          expect(i.statusCode).toBe(503);
        })
    }, 2000);

  });
});


/*describe('EventEmitter', function () {
  describe('#emit()', function () {
    it('should invoke the callback', function () {
      var spy = sinon.spy();
      var emitter = new EventEmitter;

      emitter.on('foo', spy);
      emitter.emit('foo');
      spy.called.should.equal.true;
    })

    it('should pass arguments to the callbacks', function () {
      var spy = sinon.spy();
      var emitter = new EventEmitter;

      emitter.on('foo', spy);
      emitter.emit('foo', 'bar', 'baz');
      sinon.assert.calledOnce(spy);
      sinon.assert.calledWith(spy, 'bar', 'baz');
    })
  })
})*/