const Accessory = require("../models/Accessory.js");
const Cube = require("../models/Cube.js");

const create = function (name, description, imageUrl) {
	return Accessory.create({ name, description, imageUrl });
};

const getAll = function () {
	return Accessory.find({});
};

const getUnattached = function(ids) {
	//this is with mongoDb ->
	// return Accessory.find({_id: {$nin: ids}}).lean()
	//this is with mongoose query -> 
	return Accessory.find().where('_id').nin(ids).lean()
}

const attach = function (cubeId, accessoryId) {
	Cube.findById(cubeId).then((cube) => {
		Accessory.findById(accessoryId).then((accessory) => {
			cube.accessories.push(accessory);
			return cube.save();
		});
	});
};

let accessoryService = {
	create,
	getAll,
	attach,
	getUnattached
};

module.exports = accessoryService;
