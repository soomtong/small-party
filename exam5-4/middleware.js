function authorizedOnly(req, res, next) {
	if (req.session.user && req.session.user && req.session.user.isLogin) {
		return next()
	}

	let flash = {
		id: 'auth',
		msg: 'Need Auth: you accessed restricted page'
	}
	req.session.flash = flash

	return res.redirect('/')
}

function needAuth(req, res, next) {
	if (req.session.user && req.session.user && req.session.user.isLogin) {
		return next()
	}

	return res.redirect('/login')
}

module.exports = {
	authorizedOnly,
	needAuth
}
