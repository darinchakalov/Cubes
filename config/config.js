module.exports = {
	development: {
		port: process.env.PORT || 3000,
		// DB_CONNECTION_STRING: "mongodb://localhost:27017/cubesDB",
		DB_CONNECTION_STRING: "mongodb+srv://cubesuser:cubespass@cluster0.42ovl.mongodb.net/cubes?retryWrites=true&w=majority",
	},
	production: {
		port: 80,
        DB_CONNECTION_STRING: "",
	},
};
