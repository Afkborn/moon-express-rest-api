const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../auth");
var Image = require("../modules/Image");
var fs = require("fs-extra");

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // create a folder called uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

router.post("/", upload.single("image"), auth, (req, res) => {
  console.log("POST /upload");
  const file = req.file;
  try {
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      res.json({ error: error.message });
    }
    var newImg = fs.readFileSync(req.file.path);
    var encImg = newImg.toString("base64");
    var img = Buffer.alloc(encImg.length, encImg, "base64");
    const image = new Image({
      ownerId: req.body.ownerId,
      description: req.body.description,
      imageType: req.body.imageType,
      size: file.size,
      img: {
        data: img,
        contentType: file.mimetype,
      },
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
        ownerId: image.ownerId,
        description: image.description,
        size: image.size,
      });

      //delete the file from the uploads folder
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
