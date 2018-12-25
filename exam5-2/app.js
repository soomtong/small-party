const path = require('path')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
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
	res.render('index', { title: 'Hello World!', user: req.session.user })
})

app.get('/login', (req, res) => {
	res.render('login', { title: 'Login' })
})
app.post('/login', (req, res) => {
	const userSession = {
		isLogin: true,
		accountID: req.body['account_id']
	}
	console.log('auth:', userSession)
	req.session.user = userSession
	res.redirect('/')
})

app.get('/logout', (req, res) => {
	console.log('logout process')
	req.session.destroy()
	res.redirect('/login')
})

app.listen(port, () => console.log(`Express app listening on port ${port}!`))
