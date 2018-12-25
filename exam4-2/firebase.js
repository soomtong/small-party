const admin = require('firebase-admin')
const serviceAccount = require('./small-party-firebase.json')

// must initialize first
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })

function getAdminAccount(callback) {
	const adminRef = db.collection('account').doc('admin')
	adminRef
		.get()
		.then(doc => {
			if (!doc.exists) {
				console.log('No such document')
				callback(null, {})
			} else {
				console.log('Document data:', doc.data())
				callback(null, doc.data())
			}
		})
		.catch(err => {
			console.error('Error getting document', err)
			callback(err, {})
		})
}

module.exports = {
	getAdminAccount
}
