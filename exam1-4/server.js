const fs = require('fs')
const http = require('http')
const path = require('path')
const url = require('url')

const port = 3000

const server = http.createServer(function(req, res) {
	const query = url.parse(req.url)
	const pathName = (!query.pathname || query.pathname == '/') ? '/index' : query.pathname
	const fileName = path.join(__dirname, 'public', pathName)
	const filePath = path.extname(fileName) ? fileName : fileName + '.html'

	fs.readFile(path.normalize(filePath), function(err, file) {
		if (err) {
			res.writeHead(404, { 'Content-Type': 'text/html' })
			return res.end(`Requested File Not Found`)
		}

		res.writeHead(200)
		res.write(file)
		res.end()
	})
})

server.listen(port)
