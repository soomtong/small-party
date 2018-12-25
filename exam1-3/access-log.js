const fs = require('fs')
const path = require('path')

function now() {
	const now = new Date()
	const [date, time] = now.toISOString().split('T')

	return { date, time: time.substr(0, 8) }
}

function saveAccessLog(data) {
	const fileName = 'access.log'
	const filePath = path.join(__dirname, fileName)

	data.now = now()

	const msg = JSON.stringify(data, null, 4) + '\n'

	fs.appendFile(filePath, msg, function(err) {
		if (err) throw err
	})
}

module.exports = {
	saveAccessLog
}
