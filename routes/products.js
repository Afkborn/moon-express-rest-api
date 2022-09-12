const express = require("express");
const router = express.Router();
const Product = require("../modules/Product");
const auth = require("../auth");

router.get("/", async (req, res) => {
  console.log("GET /products");
  let categoryId = req.query.categoryId;
  if (categoryId) {
    try {
      const products = await Product.find({ categoryId: categoryId });
      res.json(products);
    } catch (err) {
      res.json({ message: err });
    }
  } else {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.json({ message: err });
    }
  }
});

//post a product
router.post("/", auth, async (req, res) => {
  console.log("POST /products");
  const product = new Product({
    categoryId: req.body.categoryId,
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    description: req.body.description,
    img: req.body.img,
  });

  try {
    const savedPost = await product.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//get a product with id
router.get("/:productID", async (req, res) => {
  console.log("GET /products/" + req.params.productID);
  try {
    const product = await Product.findById(req.params.productID);
    res.json(product);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete a product with id
router.delete("/:productID", auth, async (req, res) => {
  console.log("DELETE /products/" + req.params.productID);
  try {
    const removedProduct = await Product.remove({ _id: req.params.productID });
    res.json(removedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

//update a product with id
router.patch("/:productID", auth, async (req, res) => {
  console.log("PATCH /products/" + req.params.productID);
  try {
    const updatedProduct = await Product.updateOne(
      { _id: req.params.productID },
      {
        $set: {
          categoryId: req.body.categoryId,
          name: req.body.name,
          price: req.body.price,
          stock: req.body.stock,
          description: req.body.description,
          img: req.body.img,
        },
      }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
