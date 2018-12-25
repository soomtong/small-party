const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const { createPost } = require('./firebase')
const app = express()
const port = 3000

app.set('view engine', 'pug')
app.set('views', path.join(__dirname))

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => res.render('index', { title: 'Hello World!' }))
app.get('/post', (req, res) => {
	res.render('post', { title: 'Blog' })
})
app.post('/post', (req, res) => {
	console.log('posting blog')
	let title = req.body['title']
	let content = req.body['content']

	// form check
	if (!title || !content) {
		// flash session
		return res.redirect('back')
	}

	createPost(title, content, (error, postID) => {
		if (error) {
			console.log('Firebase Access Error:', error)
			return res.redirect('back')
		}

		console.log('Saved new post:', postID)

		res.redirect('/')
	})
})

app.listen(port, () => console.log(`Express app listening on port ${port}!`))
