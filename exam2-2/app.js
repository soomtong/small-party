const express = require('express')
const app = express()

app.get('/', (req, res) => {
	res.send('hello world')
})

app.get('/hello', (req, res) => {
	const name = req.query['name'] ? req.query['name'] : 'world'
	res.send('hello ' + name)
})

module.exports = app
