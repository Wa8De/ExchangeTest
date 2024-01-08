const mongoose = require("mongoose");

const ConnectDB = async (DB_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: 'MoneyTransfer',
    };
    await mongoose.connect(DB_URL,DB_OPTIONS);
    console.log("Connected to db Successfully..");
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
};
module.exports = ConnectDB;
