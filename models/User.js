const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: [3, "Username has to be at least 3 characters"],
	},
	password: {
		type: String,
		required: true,
		minlength: [3, "Password has to be at least 3 characters"],
	},
});

userSchema.pre("save", async function (next) {
	try {
		this.password = await bcrypt.hash(this.password, 9);
		next();
	} catch (error) {
		next(error);
	}
});

const User = mongoose.model("User", userSchema);

module.exports = User;