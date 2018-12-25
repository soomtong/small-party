const admin = require('firebase-admin')
const serviceAccount = require('./small-party-firebase.json')

// must initialize first
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

// for updated restriction, warning
db.settings({timestampsInSnapshots: true})

db.collection('test')
	.get()
	.then(snapshot => {
		snapshot.forEach(doc => {
			console.log(doc.id, '=>', doc.data())
		})
	})
	.catch(err => {
		console.log('Error getting documents', err)
	})
