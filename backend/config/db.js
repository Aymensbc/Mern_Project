const mongoose = require("mongoose");

//all mongoose methods are asynchronous. They return a promise thus we use async
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(conn.connection.host);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
