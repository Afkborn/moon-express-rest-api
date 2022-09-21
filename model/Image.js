const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  ownerId: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  inUse: {
    type: Boolean,
    default: false,
  },
  imageType: {
    type: String,
    required: true,
  },
  extension: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Image", ImageSchema);
