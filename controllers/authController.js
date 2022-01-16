const router = require("express").Router();
const authService = require('../services/authService.js')

router.get("/login", (req, res) => {
	res.render("auth/login");
});

router.post("/login", (req, res) => {
	console.log(req.body);
	res.redirect("/login");
});

router.get("/register", (req, res) => {
	res.render("auth/register");
});

router.post("/register", async (req, res) => {
	let { username, password, repeatPassword } = req.body;
    if (password !== repeatPassword) {
        throw new Error('Passwords need to match!')
    }
    try {
        await authService.register(username, password);
        res.redirect('/')
    } catch (error) {
        res.send(error.message)
    }
});

module.exports = router;
