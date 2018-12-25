const http = require('http')

const port = 3000
const msg = 'hello world'
const server = http.createServer(function(req, res) {
	res.writeHead(200, { 'Content-Type': 'text/html' })
	res.write(msg)
	res.end()
})

server.listen(port)
