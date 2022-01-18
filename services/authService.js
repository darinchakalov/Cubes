const User = require("../models/User.js");
const { SECRET } = require("../constants.js");
const { jwtSign } = require('../utils/authUtils.js')

function register(username, password) {
	return User.create({ username, password });
}

function ifUserExists(username) {
	return User.exists({ username: username });
}

function login(username, password) {
	return User.findOne({ username: username }).then((user) => {
		return Promise.all([user.validatePassword(password), user]).then(([isValid, user]) => {
			if (isValid) {
				return user;
			} else {
				throw { message: "Username or password are invalid" };
			}
		});
	});
}

function createToken (user) {
	let payload = {
		username: user.username,
		id: user._id,
	};
	return jwtSign(payload, SECRET);
};

const authService = {
	register,
	ifUserExists,
	login,
    createToken
};

module.exports = authService;
