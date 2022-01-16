const User = require("../models/User.js");

function register(username, password) {
	return User.create({ username, password });
}

function ifUserExists(username) {
	return User.exists({ username: username });
}

const authService = {
	register,
	ifUserExists,
};

module.exports = authService;
