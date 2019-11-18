function dbToJson(dbItems) {
  if (dbItems == null
    || dbItems.length <= 0)
    return dbItems;

  var result = { read: [] };

  dbItems.forEach(item => {
    result.customerId = item.CustomerId;
    result.serialNumber = item.SerialNumber;
    result.readDate = new Date(item.ReadingDate).toISOString();
    result[item.Type.toLowerCase()] = item.MeterPointId.toString();
    result.read.push({
      type: item.Timing,
      registerId: item.RegisterId,
      value: item.Value
    });
  });

  return result;
}

function jsonToDb(json) {
  if (json == null || json.length <= 0)
    return json;

  // todo, is it worth checking each? just use typescript..?
  if (Object.keys(json).find((i) => i === 'customerId') == null) {
    return json;
  }
  if (Object.keys(json).find(i => i === 'read') == null) {
    return json;
  }

  var result = {
    CustomerId: json.customerId,
    SerialNumber: json.serialNumber,
    MeterPointId: json.mpxn,
    Type: Object.keys(json).find(i => i === 'mpxn').toUpperCase(),
    ReadingDate: json.readDate.indexOf('+') > 0 ?
      new Date(json.readDate.split('+')[0]) :
      new Date(json.readDate),
    RegisterId: json.read[0].registerId,
    Timing1: json.read[0].type,
    Value1: json.read[0].value,
    Timing2: json.read[1].type,
    Value2: json.read[1].value
  }

  return result;
}

/*
{
    "customerId": "identifier123",
    "serialNumber": "27263927192",
    "mpxn": "14582749",
    "read": [
        {"type": "ANYTIME", "registerId": "387373", "value": "2729"},
        {"type": "NIGHT", "registerId": "387373", "value": "2892"}
    ],
    "readDate": "2017-11-20T16:19:48+00:00Z"
}
*/

module.exports = { dbToJson, jsonToDb };