const jwt = require("jsonwebtoken");

//how to create a promise for functions that only accept callbacks and don't have promises
exports.jwtSign = function (payload, secret) {
	let promise = new Promise((resolve, reject) => {
		jwt.sign(payload, secret, function (err, token) {
			if (err) {
				reject(err);
			} else {
				resolve(token);
			}
		});
	});
	return promise;
};

//the above can be done with node buildin library
// const util = require("util");
// exports.jwtSign2 = util.promisify(jwt.sign);
