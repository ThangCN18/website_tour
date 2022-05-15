require('dotenv').config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")

const DB = require("./configs/connectDB")
const routes = require("./routes")

const app = express()

// Connect DB
DB.connect()

// Middleware body-parser and cors
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

// static image_url 
app.use(express.static(path.join(__dirname, "../public")))

// Routes
routes(app)


// Run Server 
const port = process.env.PORT || 8000
app.listen(port, ()=> console.log("Server is running on port: " + port ))

