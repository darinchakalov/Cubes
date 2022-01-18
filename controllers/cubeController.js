const express = require("express");
const router = express.Router();
const cubeService = require("../services/cubeService.js");

const renderPage = (req, res) => {
	res.render("cube/create");
};

const createCube = (req, res) => {
	let { name, description, imageUrl, difficulty } = req.body;
	cubeService
		.create(name, description, imageUrl, difficulty)
		.then(res.redirect("/"))
		.catch((err) => {
			res.status(400);
			console.log("Well this happened: ", err);
		});
};

const renderDetailsPage = (req, res) => {
	let id = req.params.id;
	cubeService
		.getSingle(id)
		.then((cube) => {
			res.render("cube/details", cube);
		})
		.catch((err) => {
			res.status(400);
			console.log(`Well this went wrong: `, err);
		});
};

const renderEditPage = (req, res) => {
	let id = req.params.id;
	cubeService
		.getSingle(id)
		.then((cube) => {
			res.render("cube/edit", cube);
		})
		.catch((err) => {
			res.status(400).send(err);
		});
};

const renderDeletePage = (req, res) => {
	let id = req.params.id;
	cubeService
		.getSingle(id)
		.then((cube) => {
			res.render("cube/delete", cube);
		})
		.catch((err) => {
			res.status(400).send(err);
		});
};

router.get("/create", renderPage);
router.post("/create", createCube);
router.get("/details/:id", renderDetailsPage);
router.get("/edit/:id", renderEditPage);
router.get("/delete/:id", renderDeletePage);

module.exports = router;
