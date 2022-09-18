const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../auth");
var Image = require("../modules/Image");
var fs = require("fs-extra");

