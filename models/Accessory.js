const mongoose = require("mongoose");

const accessorySchema = new mongoose.Schema({
	id: mongoose.ObjectId,
	name: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
		validate: [/^https?/, "Invalid image Url"],
	},
	description: {
		type: String,
		required: true,
		maxlength: 100,
	},
});

const Accessory = mongoose.model("Accessory", accessorySchema);

module.exports = Accessory;
