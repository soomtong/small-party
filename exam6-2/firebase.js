const admin = require('firebase-admin')
const serviceAccount = require('./small-party-firebase.json')

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })

function readPosts(callback) {
	let posts = []
	db.collection('post')
		.get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				console.log(doc.id, doc.data())
				posts.push(doc.data())
			})

			console.log('total count:', snapshot.size)

			callback(null, posts)
		})
		.catch(err => {
			console.error('Error getting documents', err)
			callback(err)
		})
}

module.exports = {
	readPosts
}
