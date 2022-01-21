function errorHandler(errorMessage, req, res, next) {
	if (errorMessage) {
		console.log("tuk");
	} else {
		console.log("ne tuk");
	}
}

module.exports = errorHandler;
