const Cube = require("../models/Cube.js");

const create = (name, description, imageUrl, difficulty) => {
	let cube = new Cube({ name, description, imageUrl, difficulty });
	return cube.save();
};

const getAll = () => {
	return Cube.find({});
};

const getSingle = (id) => {
	return Cube.findById(id).populate('accessories').lean();
};

const search = async (text, from, to) => {
	let result = await Cube.find({});
	if (text) {
		result = result.filter((c) => c.name.toLowerCase().includes(text.toLowerCase()));
		console.log(result);
	}

	if (from) {
		result = result.filter((c) => c.difficulty >= from);
	}

	if (to) {
		result = result.filter((c) => c.difficulty <= to);
	}
	return result;
};

let cubeService = {
	create,
	getAll,
	search,
	getSingle,
};

module.exports = cubeService;
