const admin = require('firebase-admin')
const serviceAccount = require('./small-party-firebase.json')

// must initialize first
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })

const accountRef = db.collection('account').get()
accountRef
	.then(snapshot => {
		snapshot.forEach(doc => console.log(doc.id, doc.data()))
	})
	.catch(err => console.error('Error getting documents', err))
