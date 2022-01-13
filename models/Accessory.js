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
	// cubes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cube" }],
});

const Accessory = mongoose.model("Accessory", accessorySchema);

module.exports = Accessory;
