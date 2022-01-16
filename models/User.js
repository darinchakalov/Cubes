const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: [3, "User has to be more than 3 characters"],
	},
	password: {
		type: String,
		required: true,
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
