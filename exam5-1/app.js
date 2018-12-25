const path = require('path')
const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'pug')
app.set('views', path.join(__dirname))

app.get('/', (req, res) => res.render('index', { title: 'Hello World!' }))
app.get('/login', (req, res) => {
	res.render('login', { title: 'Login' })
})
app.post('/login', (req, res) => {
	console.log('process auth')
	res.redirect('/')
})
app.get('/logout', (req, res) => {
	console.log('logout process')
	res.redirect('/login')
})

app.listen(port, () => console.log(`Express app listening on port ${port}!`))
