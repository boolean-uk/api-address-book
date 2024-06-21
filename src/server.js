const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here

let contacts = [
    {id: 1, firstName: 'Abiodun', lastName: 'Oluwagbemi'}, 
    {id: 2, firstName: 'Nathan', lastName: 'King'},
    {id: 3, firstName: 'Lewis', lastName: 'Capaldi'}
]

app.get('/contacts', (request, respond) => {
    respond.status(200).json({ contacts })
})

app.get('/contacts/:id', (request, respond) => {
    const id = parseInt(request.params.id)
    const contact = contacts.find(c => c.id === id)
    if (contact) {
        respond.status(200).json({ contact })
    } else {
        respond.status(404).send('Contact not found')
    }
}) 


module.exports = app
