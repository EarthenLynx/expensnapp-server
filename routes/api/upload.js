// Import needed modules
const express = require("express");
const uploadFile = require("../../controller/uploadFile")

// Setup the router
var router = express.Router();

// Post a new recipe when receiving a post - request
router.post("/", function (req, res, next) {
  uploadFile(req, res).then(imgPath => res.send({msg: `Image uploaded to ${imgPath}`}));
});

module.exports = router;
