const express = require("express");
const router = express.Router();

const renderAbout = (req, res) => {
	res.render("about");
};

router.get('/about', renderAbout);

module.exports = router;