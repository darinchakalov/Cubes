module.exports = {
	development: {
		port: process.env.PORT || 3000,
		DB_CONNECTION_STRING: "mongodb://localhost:27017/cubesDB",
	},
	production: {
		port: 80,
        DB_CONNECTION_STRING: "",
	},
};
