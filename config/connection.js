/*
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

*/

// Set up MySQL connection.
var mysql = require('mysql')

var db_config = {
  host: 'us-cdbr-east-03.cleardb.com',
  port: 3306,
  user: 'b7fdb4b718e65f',
  password: '532518ab',
  database: 'heroku_2e1a4b9d7fea309',
  dialect: 'mysql',
}

var connection

function handleDisconnect() {
  connection = mysql.createConnection(db_config) // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err)
      setTimeout(handleDisconnect, 2000) // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }) // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on('error', function (err) {
    console.log('db error', err)
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Connection to the MySQL server is usually
      handleDisconnect() // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err // server variable configures this)
    }
  })
}

handleDisconnect()

// Export connection for our ORM to use.
module.exports = connection
