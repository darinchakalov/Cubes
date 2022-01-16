const router = require("express").Router();
const authService = require("../services/authService.js");
const jwt = require("jsonwebtoken");

router.get("/login", (req, res) => {
	res.render("auth/login");
});

router.post("/login", async (req, res) => {
	let { username, password } = req.body;
	try {
		await authService.login(username, password);
	} catch (error) {
		res.send(error.message);
	}
});

router.get("/register", (req, res) => {
	res.render("auth/register");
});

router.post("/register", async (req, res) => {
	let { username, password, repeatPassword } = req.body;
	if (password !== repeatPassword) {
		return res.send("Passwords need to match");
	}
	let userExists = await authService.ifUserExists(username);
	if (userExists) {
		return res.send("User already exists");
	}
	try {
		let user = await authService.register(username, password);
        
		res.redirect("/");
	} catch (error) {
		res.send(error.message);
	}
});

module.exports = router;
