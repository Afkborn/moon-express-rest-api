const express = require("express");
const router = express.Router();
const multer = require("multer");

var Image = require("../model/Image");

router.get("/:_id", async (req, res) => {
  console.log("GET /media");
  try {
    const image = await Image.findById(req.params._id);

    if (!image) {
      return res.status(404).json({
        error: "Image not found",
      });
    }

    const fileName = image._id + "." + image.extension;
    const type = req.query.type;
    let root = null;
    if (type === "thumbnail") {
      root = { root: "media/thumbnail" };
    } else if (type === "800w") {
      root = { root: "media/800w" };
    } else if (type === "1200w") {
      root = { root: "media/1200w" };
    } else {
      root = { root: "media/images" };
    }
    res.sendFile(fileName, root, (err) => {
      if (err) {
        console.log(err);
        res.status(404).json({
          error: "Image not found",
        });
      }
    });

    if (!image.inUse) {
      image.inUse = true;
      image.save();
    }
  } catch (err) {
    res.json({ message: "Bad Request" });
  }
});

module.exports = router;
