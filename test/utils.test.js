var mapper = require('../utils/mapper');
var isNullOrEmpty = require('../utils/validator');

var validDbJson1 = {
  CustomerId: "customerId2",
  SerialNumber: "4726372548",
  Type: "mpxn",
  MeterPointId: "14582750",
  RegisterId: "387374",
  ReadingDate: "2017-11-20T16:14:33.000Z",
  Timing: "NIGHT",
  Value: "2299",
};

var validDbJson2 = {
  CustomerId: "customerId2",
  SerialNumber: "4726372548",
  Type: "mpxn",
  MeterPointId: "14582750",
  RegisterId: "387374",
  ReadingDate: "2017-11-20T16:14:33.000Z",
  Timing: "ANYTIME",
  Value: "2009"
};

var jsonToDbResult = {
  CustomerId: "customerId2",
  SerialNumber: "4726372548",
  Type: "MPXN",
  MeterPointId: "14582750",
  RegisterId: "387374",
  Timing1: "NIGHT",
  Value1: "2299",
  Timing2: "ANYTIME",
  Value2: "2009",
  ReadingDate: new Date("2017-11-20T16:14:33.000Z")
}

var validJson = {
  "customerId": "customerId2",
  "serialNumber": "4726372548",
  "mpxn": "14582750",
  "read": [
    { "type": "NIGHT", "registerId": "387374", "value": "2299" },
    { "type": "ANYTIME", "registerId": "387374", "value": "2009" }
  ],
  "readDate": "2017-11-20T16:14:33.000Z"
};

describe('Utils...', () => {
  describe('Mapper...', () => {

    describe('dbToJson...', () => {
      test('dbToJson returns arg when arg is null', () => {
        let result = mapper.dbToJson(null);
        expect(result).toBe(null);
      });

      test('dbToJson returns arg when arg is empty', () => {
        let result = mapper.dbToJson([]);
        expect(result).toStrictEqual([]);
      });

      test('dbToJson maps result when arg can be formatted', () => {
        let result = mapper.dbToJson([validDbJson1, validDbJson2]);
        expect(result).toStrictEqual(validJson);
      });
    });

    describe('jsonToDb...', () => {
      test('jsonToDb returns arg when arg is null', () => {
        let result = mapper.jsonToDb(null);
        expect(result).toBe(null);
      });

      test('jsonToDb returns arg when arg is empty', () => {
        let result = mapper.jsonToDb({});
        expect(result).toStrictEqual({});
      });

      test('jsonToDb maps result when arg can be formatted', () => {
        let result = mapper.jsonToDb(validJson);
        expect(result).toStrictEqual(jsonToDbResult);
      });
    })
  });

  describe('Validator...', () => {

    test('isNullOrEmpty returns true when arg is null', () => {
      let result = isNullOrEmpty(null);
      expect(result).toBe(true);
    });

    test('isNullOrEmpty returns true when arg is empty string', () => {
      let result = isNullOrEmpty('');
      expect(result).toBe(true);
    });

    test('isNullOrEmpty returns true when arg is empty array', () => {
      let result = isNullOrEmpty([]);
      expect(result).toBe(true);
    });

    test('isNullOrEmpty returns false when arg is non-empty string', () => {
      let result = isNullOrEmpty('string');
      expect(result).toBe(false);
    });

    test('isNullOrEmpty returns false when arg is non-empty array', () => {
      let result = isNullOrEmpty(['string']);
      expect(result).toBe(false);
    });
  });
});
