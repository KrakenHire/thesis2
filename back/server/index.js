const express = require('express')
const cors = require ('cors')
const {}=require ('../database/index')
const providerRoutes = require("./routes/provider")
const userRoutes=require('./routes/user')
const bookingRoutes=require('./routes/booking')
// var models = require('../database/models');
const PORT = 3000
const app = express()



//Don't forget to add Middlewares for parsing incoming requests
//with JSON and urlencoded payloads depending on your http client 

// app.use(express.static(__dirname + '/../client/dist'))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use("/provider",providerRoutes )
app.use("/user",userRoutes )
app.use("/booking",bookingRoutes )

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
