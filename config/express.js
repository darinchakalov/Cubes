const express = require("express");
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const { auth } = require("../middlewares/authMiddleware.js");
const errorHandler = require("../middlewares/errorHandlerMIddleware.js");

module.exports = (app) => {
	//Setup the view engine
	app.engine(
		"hbs",
		handlebars({
			extname: "hbs",
		})
	);
	app.set("view engine", "hbs");

	// Setup the body parser
	app.use(express.urlencoded({ extended: true }));

	// Setup the static files
	app.use(express.static("static"));

	// Setup Cookie-Parser
	app.use(cookieParser());

	//Setup auth middleware
	app.use(auth);

	//Set global error handler
	app.use(errorHandler);
};
