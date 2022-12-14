const express = require("express");
const router = express.Router();
const Product = require("../model/Product");
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
      description: req.body.description,
      showcaseImageId: req.body.showcaseImageId,
      imageIds: req.body.imageIds,
      inStock: req.body.inStock,
      totalStock: req.body.totalStock,
      color: req.body.color,
      stockList: req.body.stockList,
      gender: req.body.gender
    });

    const savedPost = await product.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//get a product with id
router.get("/:productID", async (req, res) => {
  console.log("GET /products/");

  try {
    const product = await Product.findById(req.params.productID);
    res.json(product);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete a product with id
router.delete("/:productID", auth, async (req, res) => {
  console.log("DELETE /products/");
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
  console.log("PATCH /products/");
  try {
    const updatedProduct = await Product.updateOne(
      { _id: req.params.productID },
      {
        $set: {
          categoryId: req.body.categoryId,
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          showcaseImageId: req.body.showcaseImageId,
          imageIds: req.body.imageIds,
          inStock: req.body.inStock,
          totalStock: req.body.totalStock,
          color: req.body.color,
          stockList: req.body.stockList,
          gender: req.body.gender
        },
      }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
