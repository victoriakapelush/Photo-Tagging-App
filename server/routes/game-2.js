const express = require("express");
const router = express.Router();
const { getGameData } = require("../controllers/gameData-2");

router.get("/", getGameData);

module.exports = router;
