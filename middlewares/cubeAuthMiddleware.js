const cubeService = require("../services/cubeService.js");

exports.isCubeOwner = async function (req, res, next) {
	let cube = await cubeService.getSingle(req.params.id);
	if (cube.creator == req.user.id) {
		req.cube = cube;
		console.log("here");
		next();
	} else {
		next("You are not allowed to edit/delete this cube");
	}
};
