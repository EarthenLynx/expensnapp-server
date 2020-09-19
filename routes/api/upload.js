// Import needed modules
const express = require("express");
const uploadFile = require("../../controller/uploadFile")

// Setup the router
var router = express.Router();

// Post a new recipe when receiving a post - request
router.post("/", (req, res, next) => {
  uploadFile(req, res).then(text => res.status(200).send({msg: "Success", value: text}));
});

module.exports = router;
