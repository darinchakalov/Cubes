const { TOKEN_COOKIE_NAME, SECRET } = require('../constants.js')
const jwt = require('jsonwebtoken');

exports.auth = function(req, res, next) {
    let token = req.cookies[TOKEN_COOKIE_NAME]
	
    if (!token) {
        return next();
    }
    //TODO: extract the jwt.verify to jwt utils and make it a promise function
    jwt.verify(token, SECRET, function(err, decodedToken) {
		if (err) {
			return res.redirect('/login')
		}
        req.user = decodedToken;
        next()
	})

}