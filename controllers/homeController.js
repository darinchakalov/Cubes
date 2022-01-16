const express = require("express");
const router = express.Router();
const cubeService = require("../services/cubeService.js");

const renderHome = (req, res) => {
	cubeService.getAll()
		.then(cubes => {
			res.render("index", { cubes });
		}) 
		.catch(err => {
			console.log('This went wrong: ', err);
		})
};

const search = async (req, res) => {
	let { search, from, to } = req.query;

	let cubes = await cubeService.search(search, from, to);
	console.log(cubes);
	res.render("index", { title: "SEARCH", search, from, to, cubes });
};

router.get("/", renderHome);
router.get("/search", search);

module.exports = router;
