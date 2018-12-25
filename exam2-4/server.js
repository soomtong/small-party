const path = require('path')
const express = require('express')
// const pug = require('pug')	// 생략 가능
const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'template'))

app.get('/', (req, res) => {
	res.render('home', { title: 'hello world' })
})

app.listen(3000, () => {
	console.log('App listening on port 3000!')
})
