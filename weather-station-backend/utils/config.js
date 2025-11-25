require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const HIVE_USERNAME = process.env.HIVE_USERNAME;
const HIVE_PWD = process.env.HIVE_PWD;

module.exports = {
  MONGODB_URI,
  PORT,
  HIVE_USERNAME,
  HIVE_PWD,
};
