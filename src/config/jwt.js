// const expressJwt = require('express-jwt');
const { expressjwt: expressJwt } = require('express-jwt');
const config = require('./config.js');

async function isRevoked(_req, _payload, done) {
	// done();
}

function jwt() {
	const { secret } = config.jwt;
	return expressJwt({
		secret,
		getToken: function fromHeaderOrQuerystring(req) {
			const header = req.headers.authorization;
			// if (header && header.split(' ')[0] === 'Bearer') {
			// 	return header.split(' ')[1];
			if (header) {
				return header;
			} else if (req.query.token) {
				return req.query.token;
			}
			return null;
		},
		algorithms: ['HS256'],
		isRevoked,
	}).unless({
		path: [
			// public routes that don't require authentication
			/\/v[1-9](\d)*\/(auth|appauth|docs)(\/).*/, //uncomment this
			// /\/v[1-9](\d)*\/(auth\/|docs\/|roles)(?!\/).*/, //comment this
		],
	});
}

module.exports = jwt;
