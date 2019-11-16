function flattenDbResult(dbItems) {
  if (dbItems == null
    || dbItems.length <= 0)
    return dbItems;

  var result = { read: [] };

  dbItems.forEach(item => {
    result.customerId = item.CustomerId;
    result.serialNumber = item.SerialNumber;
    result.readDate = new Date(item.ReadingDate).toISOString();
    result[item.Type.toLowerCase()] = item.MeterPointId;
    result.read.push({
      type: item.Timing,
      registerId: item.RegisterId,
      value: item.Value
    });
  });

  return result;
}

// function mapJsonToDbItem(json) {
//   // todo
// }

module.exports = { flattenDbResult };