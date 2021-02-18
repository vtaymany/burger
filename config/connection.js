// Set up MySQL connection.
var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'us-cdbr-east-03.cleardb.com',
  port: 3306,
  user: 'b7fdb4b718e65f',
  password: '532518ab',
  database: 'heroku_2e1a4b9d7fea309',
  dialect: 'mysql',
})

// Make connection.
connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }
  console.log('connected as id ' + connection.threadId)
})

// Export connection for our ORM to use.
module.exports = connection
