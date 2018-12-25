const path = require('path')
const express = require('express')
const { readPosts } = require('./firebase')
const app = express()
const port = 3000

app.set('view engine', 'pug')
app.set('views', path.join(__dirname))

app.get('/', (req, res) => {
	readPosts((error, posts) => {
		if (error) {
			console.log('Firebase Access Error:', error)
		}
		res.render('index', { title: 'Hello World!', posts })
	})
})

app.listen(port, () => console.log(`Express app listening on port ${port}!`))
