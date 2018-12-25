const admin = require('firebase-admin')
const serviceAccount = require('./small-party-firebase.json')

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })

function createPost(title, content, callback) {
	let created_at = new Date()

	db.collection('post')
		.add({
			title,
			content,
			created_at
		})
		.then(ref => {
			if (!ref.id) {
				console.log('No such document')
				callback(null)
			} else {
				console.log('Document saved:', ref.id)

				callback(null, ref.id)
			}
		})
		.catch(err => {
			console.error('Error saving documents', err)
			callback(err)
		})
}

module.exports = {
	createPost
}
