const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	username: {
		unique: true,
		validate: [/^[a-zA-Z0-9]+$/i, "Username should consist of only numbers or English letters"],
		type: String,
		required: true,
		minlength: [5, "Username has to be at least 5 characters"],
	},
	password: {
		type: String,
		required: true,
		validate: [/^[a-zA-Z0-9]+$/i, "Password should consist of only numbers or English letters"],
		minlength: [8, "Password has to be at least 8 characters"],
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

userSchema.method("validatePassword", function (password) {
	return bcrypt.compare(password, this.password);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
