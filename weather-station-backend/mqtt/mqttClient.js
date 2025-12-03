const mqtt = require("mqtt");
const config = require("../utils/config");
const SensorData = require("../models/sensorData");

// Replace with your HiveMQ Cloud cluster info
const host = "4396ee049715479fb5188a6b40ccc129.s1.eu.hivemq.cloud"; //"YOUR-CLUSTER-URL.hivemq.cloud"
const port = 8883;
const username = config.HIVE_USERNAME;
const password = config.HIVE_PWD;

// Connection options
const options = {
  host,
  port,
  protocol: "mqtts", // important: HiveMQ Cloud requires SSL
  username,
  password,
  rejectUnauthorized: false, // avoid certificate issues
};

// Create MQTT client
const client = mqtt.connect(options);

// Connection events
client.on("connect", () => {
  console.log("Connected to HiveMQ Cloud!");

  // Subscribe to your topic(s)
  client.subscribe("weatherstation/#", (err) => {
    if (!err) {
      console.log("Subscribed to weather topics");
    } else {
      console.error("Subscribe error:", err);
    }
  });
});

// Handle incoming MQTT messages
client.on("message", async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    console.log("Received JSON:", data);

    await SensorData.create({
      station: data.station,
      temperature: data.temperature,
      pressure: data.pressure,
      timestamp: new Date(),
    });
  } catch (err) {
    console.error("Not JSON or parse error:", message.toString());
  }
});

// Error handler
client.on("error", (error) => {
  console.error("MQTT Error:", error);
});

module.exports = client;
