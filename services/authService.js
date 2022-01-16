const User = require("../models/User.js");

function register(username, password) {
	return User.create({ username, password });
}

const authService = {
	register,
};

module.exports = authService;
