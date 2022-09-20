const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../auth");
const imageAction = require("../actions/ImageAction");
var Image = require("../model/Image");
var fs = require("fs-extra");


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // create a folder called uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });


router.post("/", upload.single("image"), auth, (req, res) => {
  console.log("POST /upload");
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    res.status(400).json({ error: error.message });
  }
  const ownerId = req.user.userId;
  const extension = file.originalname.split(".").pop();

  const image = new Image({
    ownerId: ownerId,
    imageType: file.mimetype,
    extension: extension,
    size: file.size,
  });
  image.save((err, image) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Image could not be saved",
      });
    }
    res.json({
      message: "Image saved successfully",
      _id: image._id,
    });

    // move uploads to media/images folder
    const newFileName = image._id + "." + image.extension;
    fs.rename(req.file.path, "media/images/" + newFileName, (err) => {
      if (err) {
        console.log(err);
      } else {
        imageAction.createThumbnail(newFileName);
        imageAction.create800w(newFileName);
        imageAction.create1200w(newFileName);
      }
    });
  });
});
module.exports = router;
