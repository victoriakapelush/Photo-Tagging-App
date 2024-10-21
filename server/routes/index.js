const express = require("express");
const router = express.Router();
const { getImage } = require("../controllers/indexController");

/* GET home page. */
router.get("/", getImage);

module.exports = router;
