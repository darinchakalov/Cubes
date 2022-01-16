const User = require("../models/User.js");

function register(username, password) {
	return User.create({ username, password });
}

function ifUserExists(username) {
	return User.exists({ username: username });
}

async function login(username, password) {
	let user = await User.findOne({ username: username });
	let isValid = await user.validatePassword(password);

	if (isValid && user) {
		return user;
	} else {
		throw { message: "Username or password are invalid" };
	}
}

const authService = {
	register,
	ifUserExists,
	login,
};

module.exports = authService;
