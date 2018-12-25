const path = require('path')
const { getAdminAccount } = require('./firebase')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.set('view engine', 'pug')
app.set('views', path.join(__dirname))

// parse application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({
	extended: false
})

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/account', (req, res) => {
	getAdminAccount(function(error, adminData) {
		if (error) {
			console.error('Error getting document', err)
			return res.send({ title: 'Error getting document', msg: err })
		}

		res.render('account', {
			title: 'Hey',
			message: 'Hello manager!',
			adminAccount: adminData
		})
	})
})
app.get('/account/form', (req, res) => {
	res.render('account-form')
})
app.post('/account/form', urlencodedParser, (req, res) => {
	const accountData = {
		id: req.body['account_id'],
		pw: req.body['account_pw']
	}

	console.log(accountData)

	res.redirect('/account')
})

app.listen(port, () => console.log(`Express app listening on port ${port}!`))
