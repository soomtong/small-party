const fs = require('fs')
const path = require('path')

function saveAccessLog() {
	const fileName = 'access.log'
	const filePath = path.join(__dirname, fileName)
	const msg = 'hello world'
	fs.appendFile(filePath, msg, function (err) {
		if (err) throw err
	})
}

saveAccessLog()