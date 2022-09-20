const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dbConnect = require("./db/dbConnect");


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

app.use(bodyParser.json()); // parse application/json


 
// Import Routes
const categoriesRoutes = require("./routes/categories");
app.use("/categories", categoriesRoutes);

const productsRoutes = require("./routes/products");
app.use("/products", productsRoutes);

const usersRoutes = require("./routes/users");
app.use("/users", usersRoutes);

const uploadRoutes = require("./routes/upload");
app.use("/upload", uploadRoutes)

const mediaRoutes = require("./routes/media");
app.use("/media", mediaRoutes);




dbConnect();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});