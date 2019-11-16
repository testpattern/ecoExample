var mapper = require('../utils/mapper');
var isNullOrEmpty = require('../utils/validator');

var validDbJson1 = {
  CustomerId: "customerId2",
  SerialNumber: "4726372548",
  Type: "MPAN",
  MeterPointId: "14582750",
  Timing: "NIGHT",
  RegisterId: "387374",
  Value: "2299",
  ReadingDate: "2017-11-20 16:14:33.000"
};

var validDbJson2 = {
  CustomerId: "customerId2",
  SerialNumber: "4726372548",
  Type: "MPAN",
  MeterPointId: "14582750",
  Timing: "ANYTIME",
  RegisterId: "387374",
  Value: "2009",
  ReadingDate: "2017-11-20 16:14:33.000"
};

var validJson = {
  "customerId": "customerId2",
  "serialNumber": "4726372548",
  "mpan": "14582750",
  "read": [
    { "type": "NIGHT", "registerId": "387374", "value": "2299" },
    { "type": "ANYTIME", "registerId": "387374", "value": "2009" }
  ],
  "readDate": "2017-11-20T16:14:33.000Z"
};

describe('Utils...', () => {
  describe('Mapper...', () => {

    test('flattenDbResult returns arg when arg is null', () => {
      let result = mapper.flattenDbResult(null);
      expect(result).toBe(null);
    });

    test('flattenDbResult returns arg when arg is empty', () => {
      let result = mapper.flattenDbResult([]);
      expect(result).toStrictEqual([]);
    });

    test('flattenDbResult maps result when arg can be formatted', () => {
      let result = mapper.flattenDbResult([validDbJson1, validDbJson2]);
      expect(result).toStrictEqual(validJson);
    });
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
