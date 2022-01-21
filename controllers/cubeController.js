const express = require("express");
const router = express.Router();
const cubeService = require("../services/cubeService.js");
const { isAuthenticated } = require("../middlewares/authMiddleware.js");
const { isCubeOwner } = require("../middlewares/cubeAuthMiddleware.js");

const renderCreatePage = (req, res) => {
	res.render("cube/create");
};

const createCube = (req, res) => {
	let { name, description, imageUrl, difficulty } = req.body;
	cubeService
		.create(name, description, imageUrl, difficulty, req.user.id)
		.then(() => {
			res.redirect("/");
		})
		.catch((err) => {
			return res.status(400).render("cube/create", { error: err.message });
			// console.log("Well this happened: ", err);
		});
};

const renderDetailsPage = (req, res) => {
	let id = req.params.id;
	cubeService
		.getSingle(id)
		.then((cube) => {
			let isOwner = false;
			if (req.user) {
				isOwner = cube.creator == req.user.id;
			}
			res.render("cube/details", { ...cube, isOwner });
		})
		.catch((err) => {
			res.status(400).render("cube/details", { error: err });
			// res.status(400);
			// console.log(`Well this went wrong: `, err);
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
			res.status(400).render("cube/edit", { error: err });
		});
};

const editingCube = async (req, res) => {
	let { name, description, imageUrl, difficulty } = req.body;

	try {
		await cubeService.editOne(req.params.id, { name, description, imageUrl, difficulty });
		res.redirect(`/cube/details/${req.params.id}`);
	} catch (error) {
		res.status(400).render(`/cube/edit`, { error: error.message });
	}
};

const renderDeletePage = (req, res) => {
	//As I have attached the cube in the isCubeOwner middleware I can use it directly.
	try {
		res.render("cube/delete", req.cube);
	} catch (error) {
		res.status(400).render(`/cube/delete`, { error: error.message });
	}
};

const deletingCube = async (req, res) => {
	try {
		await cubeService.deleteOne(req.params.id);
		res.redirect("/");
	} catch (error) {
		res.status(400).render(`/cube/delete`, { error: error.message });
	}
};

router.get("/create", isAuthenticated, renderCreatePage);
router.post("/create", isAuthenticated, createCube);
router.get("/details/:id", renderDetailsPage);
router.get("/edit/:id", isCubeOwner, isAuthenticated, renderEditPage);
router.post("/edit/:id", isCubeOwner, editingCube);
router.get("/delete/:id", isCubeOwner, isAuthenticated, renderDeletePage);
router.post("/delete/:id", isCubeOwner, deletingCube);

module.exports = router;
