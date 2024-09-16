const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const contacts = require("../data/contacts");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Get contacts
app.get("/contacts", (req, res) => {
  console.log(contacts);
  return res.send({ contacts });
});

// Create a new contact
app.post("/contacts", (req, res) => {
  const newId = Math.max(...contacts.map(contact => contact.id)) + 1

  const newContact = { id: newId, ...req.body };
  // The following comment shows a breakdown of the line above
  // const newContact = req.body
  // newContact.id = newId

  contacts.push(newContact);
  console.log(newContact)
  return res.status(201).send({ contact: newContact });
});

// Find contact by id
app.get("/contacts/:id", (req, res) => {
  const id = req.params.id;
  const contact = contacts.find((contact) => contact.id === Number(id));

  return res.send( {contact} );
});

// Delete a single contact by id
app.delete("/contacts/:id", (req, res) => {
  const id = req.params.id;
  const deletedContact =  contacts.find((contact) => contact.id === Number(id))
  const contactIndex = contacts.indexOf(deletedContact);
  contacts.splice(contactIndex, 1);
//   return res.send({ contacts: contactIndex });
  return res.status(200).send( {contact: deletedContact} );
});

// Update contact by id
app.put("/contacts/:id", (req, res) => {
  const id = req.params.id;
  let updatedContact =  contacts.find((contact) => contact.id === Number(id))
  Object.assign(updatedContact, req.body)

  return res.status(200).send({contact: updatedContact})
})

module.exports = app;
