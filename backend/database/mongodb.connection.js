const mongoose = require("mongoose");
require("dotenv").config();

let connection;

try {
  connection = mongoose.connect(process.env.MONGOURL);
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

module.exports = { connection };
