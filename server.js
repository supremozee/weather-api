const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// Global Use
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Welcome Route
app.get("/", (req, res) => {
  res.send("Welcome to the weather API!");
});

// Routes
const form = require("./routes/form");
app.use("/weather/api/v1", form);

// Middlewares
const notFoundMiddleware = require("./middlewares/notFound");
const mongoose = require("mongoose");
app.use(notFoundMiddleware);

const start = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://azizariyibi:Olabisi14@generalcluster.rvxsveo.mongodb.net"
    );
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (err) {
    console.log("DB connection error", err);
  }
};

start();

module.exports = {
  app,
};
