const express = require('express')
const db = require('../database')
const {getAllUsers ,UpdateUserBalance }= require('../database/index')

const PORT = 3000
const app = express()



//Don't forget to add Middlewares for parsing incoming requests
//with JSON and urlencoded payloads depending on your http client 

app.use(express.static(__dirname + '/../client/dist'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/users', getAllUsers)
app.put('/api/users',UpdateUserBalance)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
