const http = require('http')
const { saveAccessLog } = require('./access-log')

const port = 3000
const msg = 'hello world'
const server = http.createServer(function(req, res) {
	const data = {
		method: req.method,
		host: req.headers['host'],
		url: req.url
	}

	saveAccessLog(data)

	res.writeHead(200, { 'Content-Type': 'text/html' })
	res.write(`<p>${msg}</p>`)
	res.write(`<p>you accessed ${data.url} from ${data.host}</p>`)
	res.end()
})

server.listen(port)
