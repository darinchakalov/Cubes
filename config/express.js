const express = require("express");
const handlebars = require("express-handlebars");

module.exports = (app) => {
	//TODO: Setup the view engine
	app.engine(
		"hbs",
		handlebars({
			extname: "hbs",
		})
	);
	app.set("view engine", "hbs");
	//TODO: Setup the body parser
	app.use(express.urlencoded({extended: true}));
	// app.use(bodyParser.json());
	//outdated version below
	// app.use(bodyParser.urlencoded({ extended: false }));
	// app.use(bodyParser.json());
	//TODO: Setup the static files
	app.use(express.static("static"));
};
