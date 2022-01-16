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
        return res.send('Passwords need to match')
    }
    let userExists = await authService.ifUserExists(username)
    if (userExists) {
        return res.send('User already exists')
    }
    try {
        await authService.register(username, password);
        res.redirect('/')
    } catch (error) {
        res.send(error.message)
    }
});

module.exports = router;
