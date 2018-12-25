const admin = require('firebase-admin')
const serviceAccount = require('./small-party-firebase.json')

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })

function authAdminAccount(id, pw, callback) {
	const adminRef = db.collection('account').doc('admin')
	adminRef
		.get()
		.then(doc => {
			if (!doc.exists) {
				console.log('No such document')
				callback(null, false)
			} else {
				let admin = doc.data()
				console.log('Document data:', admin)
				console.log('Form data:', id, pw)

				// in real world, password is not simple text. thus, need more process for password comparison
				if (id === admin.id) {
					if (pw === admin.pw) {
						// save log for auth success event
						callback(null, true)
					} else {
						// save log for auth fail reason
						callback(null, false)
					}
				} else {
					// save log for auth fail reason
					callback(null, false)
				}
			}
		})
		.catch(err => {
			console.error('Error getting documents', err)
			callback(err, false)
		})
}

module.exports = {
	authAdminAccount
}
