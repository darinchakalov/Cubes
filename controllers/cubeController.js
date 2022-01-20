const express = require("express");
const router = express.Router();
const cubeService = require("../services/cubeService.js");
const { isAuthenticated } = require('../middlewares/authMiddleware.js')
 
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

const editingCube = async (req, res) => {
	let { name, description, imageUrl, difficulty } = req.body;

	try {
		await cubeService.editOne(req.params.id, {name, description, imageUrl, difficulty})
		res.redirect(`/cube/details/${req.params.id}`)
	} catch (error) {
		res.send(error)
	}
}

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

const deletingCube = async (req, res) => {
	try {
		await cubeService.deleteOne(req.params.id);
		res.redirect('/')
	} catch (error) {
		res.send(error)
	}

}

router.get("/create", isAuthenticated, renderPage);
router.post("/create", isAuthenticated, createCube);
router.get("/details/:id", renderDetailsPage);
router.get("/edit/:id", isAuthenticated, renderEditPage);
router.post('/edit/:id', editingCube)
router.get("/delete/:id", isAuthenticated, renderDeletePage);
router.post('/delete/:id', deletingCube)

module.exports = router;
