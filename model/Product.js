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
  description: {
    type: String,
    required: true,
  },
  totalStock: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  gender: {
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
  stockList: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
