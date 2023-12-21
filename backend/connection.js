const mongoose = require("mongoose");
require('dotenv').config();
// mongoURL comes from the env file and that file will be made by your own.
const connection = mongoose.connect(process.env.mongoURL);

module.exports = connection;