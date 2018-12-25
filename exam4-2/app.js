const path = require('path')
const { getAdminAccount } = require('./firebase')
const express = require('express')
const app = express()
const port = 3000

// set template engine
// app.engine('html', require('pug').__express);
app.set('view engine', 'pug')
app.set('views', path.join(__dirname))

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

app.listen(port, () => console.log(`Express app listening on port ${port}!`))
