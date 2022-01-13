const cubeController = require("../controllers/cubeController.js");
const homeController = require("../controllers/homeController.js");
const aboutController = require("../controllers/aboutController.js");
const accessoryController = require('../controllers/accessoryController.js')

module.exports = (app) => {
	app.use(homeController);

	app.use(aboutController);

	app.use('/cube', cubeController);

	app.use('/accessory', accessoryController)

	app.get("*", (req, res) => {
		res.render("404");
	});
};
