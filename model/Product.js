const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  categoryId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  showcaseImageId: {
    type: String,
    required: true,
  },
  imageIds: {
    type: Array,
    required: true,
  },
  
});

module.exports = mongoose.model("Product", ProductSchema);
