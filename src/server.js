const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

const contactRouter = require("../src/routes/contacts/contactRouter.js")
const meetingRouter = require("../src/routes/meetings/meetingRouter.js")

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.use("/contacts", contactRouter)
app.use("/meetings", meetingRouter)

module.exports = app
