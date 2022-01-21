exports.errorHandler = function (errorMessage, req, res, next) {
	if (errorMessage) {
		res.locals.err = errorMessage;
		res.status(404).render("403");
	}
};
