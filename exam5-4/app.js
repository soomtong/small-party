const path = require('path')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const { authAdminAccount } = require('./firebase')
const { authorizedOnly, needAuth } = require('./middleware')
const app = express()
const port = 3000

app.set('view engine', 'pug')
app.set('views', path.join(__dirname))

app.use(
	session({
		secret: 'small-party-secret-cat',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: 'auto' }
	})
)
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	let flash = req.session.flash

	req.session.flash = null

	res.render('index', {
		title: 'Hello World!',
		user: req.session.user,
		flash
	})
})
app.get('/restricted', authorizedOnly, (req, res) => {
	res.render('secret', { title: 'Secret Page', user: req.session.user })
})
app.get('/secret', needAuth, (req, res) => {
	res.render('secret', { title: 'Secret Page', user: req.session.user })
})

app.get('/login', (req, res) => {
	let flash = req.session.flash
	req.session.flash = null

	res.render('login', { title: 'Login', flash })
})
app.post('/login', (req, res) => {
	const userSession = {
		isLogin: true,
		accountID: req.body['account_id']
	}

	authAdminAccount(
		userSession.accountID,
		req.body['account_pw'],
		(error, result) => {
			if (error) {
				console.log('Firebase Auth Error:', error)
				return res.redirect('/')
			}

			if (result) {
				req.session.user = userSession
				console.log('Auth success: go home')

				res.redirect('/')
			} else {
				let flash = {
					id: 'auth',
					msg: 'Auth failed: id or password is not matched'
				}
				req.session.flash = flash
				console.log('Auth failed: id or password is not matched')
				res.redirect('back')
			}
		}
	)
})

app.get('/logout', (req, res) => {
	console.log('logout process')
	req.session.destroy()
	res.redirect('/')
})

app.listen(port, () => console.log(`Express app listening on port ${port}!`))
