const contacts = require("../data/contacts");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const findContactById = (id) => {
  const result = contacts.find((contact) => {
    return contact.id === Number(id);
  });
  return result;
};

// 1. Retrieve a list of contacts
app.get("/contacts", (req, res) => {
  return res.send({ contacts });
});

// 2. Create a new contact
app.post("/contacts", (req, res) => {
  const contact = req.body;
  const id = contacts.push(contact);
  contact.id = id;
  return res.status(201).send({ contact });
});

// 3. Get a single contact by ID
app.get("/contacts/:id", (req, res) => {
  const { id } = req.params;
  const contact = findContactById(Number(id));

  if (contact) {
    return res.send({ contact });
  } else {
    return res.send("Contact does not exist");
  }
});

// 4. Delete a single contact by ID
app.delete("/contacts/:id", (req, res) => {
  const { id } = req.params;
  const contact = findContactById(Number(id));

  const conIndex = contacts.findIndex((item) => {
    return item === contact;
  });

  if (contact) {
    const contact = contacts.splice(conIndex, 1)[0];
    console.log(contact);
    return res.send({ contact });
  } else {
    return res.send("Contact does not exist");
  }
});

// Update a contact by ID
app.put("/contacts/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const contact = findContactById(Number(id));

  const updatedContact = { ...body, id: Number(id) };
  console.log(updatedContact);

  const conIndex = contacts.findIndex((item) => {
    return item === contact;
  });

  if (contact) {
    contacts.splice(conIndex, 1, updatedContact);
    return res.send({ contact: contacts[conIndex] });
  } else {
    return res.send("Contact does not exist");
  }
});

module.exports = app;
