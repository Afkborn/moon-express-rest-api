const express = require("express");
const router = express.Router();
const Product = require("../model/Product");
const Image = require("../model/Image");
const auth = require("../auth");

router.get("/", async (req, res) => {
  console.log("GET /products");
  if (req.query.categoryId) {
    const products = await Product.find({ categoryId: req.query.categoryId });
    res.json(products);
  } else {
    const products = await Product.find();
    res.json(products);
  }
});

//post a product
router.post("/", auth, async (req, res) => {
  console.log("POST /products");
  try {
    const product = new Product({
      categoryId: req.body.categoryId,
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      imageId: req.body.imageId,
    });
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
    const removedProduct = await Product.deleteOne({
      _id: req.params.productID,
    });
    res.json(removedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

//update a product with id
router.patch("/:productID", auth, async (req, res) => {
  console.log("PATCH /products/" + req.params.productID);
  try {
    const oldProduct = await Product.findById(req.params.productID);

    const updatedProduct = await Product.updateOne(
      { _id: req.params.productID },
      {
        $set: {
          categoryId: req.body.categoryId,
          name: req.body.name,
          price: req.body.price,
          stock: req.body.stock,
          description: req.body.description,
          imageId: req.body.imageId,
        },
      }
    );
    res.json(updatedProduct);
    try {
      if (oldProduct.imageId != updatedProduct.imageId) {
        console.log("delete old image " + oldProduct.imageId);
        await Image.deleteOne({ _id: oldProduct.imageId });
      }
    } catch (err) {
      console.log(err);
      console.log("No image to delete");
    }
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
