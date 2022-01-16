const cubeController = require("../controllers/cubeController.js");
const homeController = require("../controllers/homeController.js");
const aboutController = require("../controllers/aboutController.js");
const accessoryController = require("../controllers/accessoryController.js");
const authController = require("../controllers/authController.js");

module.exports = (app) => {
	app.use(homeController);

	app.use(aboutController);

	app.use("/cube", cubeController);

	app.use("/accessory", accessoryController);

	app.use(authController); //any routes not handled by the above routes will be handled here so I can access the login page from /login and not for instance from /auth/login

	app.get("*", (req, res) => {
		res.render("404");
	});
};
