const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  station: String,
  temperature: Number,
  //humidity: Number,
  pressure: Number,
  //averageTemp: Number,
  timestamp: Date
});

sensorSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("SensorData", sensorSchema);