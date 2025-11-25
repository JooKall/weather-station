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
    return res
      .status(404)
      .json({ pressure: 0, station: "", temperature: 0 });
  }
  res.json(latestData);
});

module.exports = sensorsRouter;
