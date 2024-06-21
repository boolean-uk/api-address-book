const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

// write your app code here

let contacts = require("../data/contacts.js")
let contact_id_key = contacts.length + 1

app.get("/contacts", (req, res)=>{
    res.json({
        contacts
    })
})

app.post("/contacts", (req, res)=>{
    const newContact = req.body
    newContact.id = contact_id_key
    contacts.push(newContact)

    contact_id_key++

    res.status(201).json({contact})
})

app.get("/contacts/:id", (req, res)=>{})

app.put("/contacts", (req, res)=>{})

app.delete("/contacts", (req, res)=>{})

module.exports = app
