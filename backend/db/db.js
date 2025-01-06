const mongoose = require('mongoose');

function connectToDB() {
  // Ensure process.env.DB_CONNECT is defined in your environment variables
  mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.error("DB Connection Error:", err);
    });
}

module.exports = connectToDB;
