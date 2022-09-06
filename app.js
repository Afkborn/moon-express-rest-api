const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

app.get("/", (req, res) => {
  res.send("Hello World!");
});


mongoose.connect(process.env.DB_CONNECTION,() => {
    console.log("Connected to MongoDB successfully");
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});