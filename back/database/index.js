const mysql = require('mysql2')
const mysqlConfig = require('./config.js')

//IMPORTANT!!!
//Created a connection that is using promise
const connection = mysql.createConnection(mysqlConfig).promise()

connection
  .connect()
  .then(() => {
    console.log('Connected to MySQL!')
  })
  .catch((err) => {
    console.log(err)
  })

// Your Database Queries Here!!


  


// Don't forget to export your functions!
module.exports
