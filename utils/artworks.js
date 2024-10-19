// pages/api/artworks.js
const express = require("express");
const artworkController = require("../../controllers/artworkController");

const router = express.Router();

// Define the POST route for searching artworks
router.post("/search", artworkController.handleSearch);

module.exports = router;
