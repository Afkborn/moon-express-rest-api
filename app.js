const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const dbConnect = require("./db/dbConnect");

app.use(bodyParser.json());

// Import Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const testRoutes = require("./routes/test");

app.use("/categories", categoriesRoutes);

app.use("/products", productsRoutes);

app.use("/users", usersRoutes);

app.use("/test", testRoutes);

dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});