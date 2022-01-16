const User = require("../models/User.js");
const bcrypt = require("bcrypt");

function register(username, password) {
	return User.create({ username, password });
}

function ifUserExists(username) {
	return User.exists({ username: username });
}

function login(username, password) {
	return User.findOne({ username }).then((user) => {
		return Promise.all([bcrypt.compare(password, user.password)], user).then(([isValid, user]) => {
			if (isValid) {
				return user;
			} else {
				throw { message: "Username or password are invalid" };
			}
		});
	});
}

const authService = {
	register,
	ifUserExists,
	login,
};

module.exports = authService;
