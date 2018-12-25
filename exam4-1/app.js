const path = require('path')
const express = require('express')
const app = express()
const port = 3000

// set template engine
// app.engine('html', require('pug').__express);
app.set('view engine', 'pug')
app.set('views', path.join(__dirname))

const admin = require('firebase-admin')
const serviceAccount = require('./small-party-firebase.json')

// must initialize first
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/account', (req, res) => {
	const adminRef = db.collection('account').doc('admin')
	adminRef
		.get()
		.then(doc => {
			if (!doc.exists) {
				console.log('No such document')
				res.render('account', {
					title: 'Hey',
					message: 'Hello there!',
					adminAccount: {}
				})
			} else {
				console.log('Document data:', doc.data())
				res.render('account', {
					title: 'Hey',
					message: 'Hello there!',
					adminAccount: doc.data()
				})
			}
		})
		.catch(err => {
			console.error('Error getting document', err)
			res.send({ title: 'Error getting document', msg: err })
		})
})

app.listen(port, () => console.log(`Express app listening on port ${port}!`))
