const sensorsRouter = require("express").Router();
const SensorData = require("../models/sensorData");

sensorsRouter.get("/", async (req, res) => {
  const data = await SensorData.find({}).sort({ timestamp: -1 }).limit(10);
  res.json(data);
});

sensorsRouter.get("/latest", async (req, res) => {
  const latestData = await SensorData.findOne({}).sort({ timestamp: -1 });
  if (!latestData) {
    // return dummy JSON instead of plain 404
    return res.status(404)
  }
  res.json(latestData);
});

sensorsRouter.get("/average/:count", async (req, res) => {
  const count = Number(req.params.count) || 10;

  const records = await SensorData.find({})
    .sort({ timestamp: -1 })
    .limit(count);

  if (records.length === 0) {
    return res.status(404);
  }

  const temperatureAvg =
    records.reduce((sum, record) => sum + record.temperature, 0) /
    records.length;

  const pressureAvg =
    records.reduce((sum, record) => sum + record.pressure, 0) / records.length;

  res.json({
    count: records.length,
    temperatureAvg,
    pressureAvg,
  });
});

module.exports = sensorsRouter;
