const express = require("express");
const router = express.Router();
const Category = require("../modules/Category");
const auth = require("../auth");
// Get all categories
router.get("/", async (req, res) => {
  console.log("GET /categories");
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.json({ message: err });
  }
});

//Post a category
router.post("/", auth, async (req, res) => {
  console.log("POST /categories");
  const category = new Category({
    name: req.body.name,
    seoUrl: req.body.seoUrl,
    img: req.body.img,
  });

  try {
    const savedPost = await category.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//get a specific category
router.get("/:categoryID", async (req, res) => {
  console.log("GET /categories/" + req.params.categoryID);
  try {
    const category = await Category.findById(req.params.categoryID);
    res.json(category);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
