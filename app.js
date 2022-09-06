const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// Import DB_CONNECTION from .env
require("dotenv/config");

app.use(bodyParser.json());

// Import Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");


app.use("/categories", categoriesRoutes);

app.use("/products", productsRoutes);


mongoose.connect(process.env.DB_CONNECTION,() => {
    console.log("Connected to MongoDB successfully");
})

const port = process.env.PORT || 3131;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});