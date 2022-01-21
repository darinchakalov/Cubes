const router = require("express").Router();
const authService = require("../services/authService.js");
const { TOKEN_COOKIE_NAME } = require("../constants.js");
const { isGuest } = require("../middlewares/authMiddleware.js");

router.get("/login", isGuest, (req, res) => {
	res.render("auth/login");
});

router.post("/login", async (req, res) => {
	let { username, password } = req.body;
	try {
		let user = await authService.login(username, password);
		let token = await authService.createToken(user);

		res.cookie(TOKEN_COOKIE_NAME, token, {
			httpOnly: true,
		});

		res.redirect("/");
	} catch (error) {
		res.send(error.message);
	}
});

router.get("/register", isGuest, (req, res) => {
	res.render("auth/register");
});

router.post("/register", async (req, res, next) => {
	let { username, password, repeatPassword } = req.body;
	if (password !== repeatPassword) {
		return res.render("auth/register", { error: "Passwords need to match", name: username });
	}
	let userExists = await authService.ifUserExists(username);
	if (userExists) {
		return res.render("auth/register", { error: "User already exists", name: username });
	}
	try {
		await authService.register(username, password);
		res.redirect("/");
	} catch (error) {
		return res.render("auth/register", { error: error.message });
	}
});

router.get("/logout", (req, res) => {
	if (req.user) {
		delete req.user;
		res.clearCookie("app_token");
	}
	res.redirect("/");
});

module.exports = router;
