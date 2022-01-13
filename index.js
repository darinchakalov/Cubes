const env = process.env.NODE_ENV || "development";

const config = require("./config/config")[env];
const initDB = require("./config/db-config.js");
const app = require("express")();

require("./config/express")(app);
require("./config/routes")(app);

initDB(config.DB_CONNECTION_STRING)
	.then(() => {
		app.listen(config.port, console.log(`App running at http://localhost:${config.port}...`));
	})
	.catch((err) => {
		console.log("Application init failed: ", err);
	});
