const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { query } = require('express')
const app = express()
const contactRouter = require('./routers/contacts')
const meetingRouter = require('./routers/meetings')

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// write your app code here

app.use('/contacts', contactRouter)

app.use('/meetings', meetingRouter)

module.exports = app
