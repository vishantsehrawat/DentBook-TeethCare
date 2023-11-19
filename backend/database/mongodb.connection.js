const mongoose = require("mongoose");
require("dotenv").config();

let mongoConnection;

try {
  mongoConnection = mongoose.connect(process.env.MONGOURL);
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

module.exports = { mongoConnection };
