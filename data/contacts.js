const contacts = [
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Carmack",
    "street": "10 Keen Street",
    "city": "London",
    "type": "work",
    "email": "test@test.com",
    "linkedin": "https://www.linkedin.com/school/boolean-uk/",
    "twitter": "https://twitter.com/booleanuk"
  },
  {
    "id": 2,
    "firstName": "Grace",
    "lastName": "Hopper",
    "street": "32 Deebug Road",
    "city": "London",
    "type": "personal",
    "email": "test@test.com",
    "linkedin": "https://www.linkedin.com/school/boolean-uk/",
    "twitter": "https://twitter.com/booleanuk"
  }
]

const fieldArr = [ "firstName", "lastName", "street", "city", "type", "email", "linkedin", "twitter" ]
const validField = (fieldName) => fieldArr.includes(fieldName)

let contactId = 0

const initContactId = () => {
  contacts.forEach((contact) => {
    if (contact.id > contactId) {
      contactId = contact.id
    }
  })
}

initContactId()

const getNewContactId = () => ++contactId
const getContactById = (id) => contacts.find((contact) => contact.id === id)
const deleteContactById = (id) => {
  const index = contacts.findIndex((contact) => contact.id === id)
  const deletedContact = contacts[index]
  contacts.splice(index, 1)
  return deletedContact
}

const addContact = (body) => {
  const {
    firstName,
    lastName,
    street,
    city,
    type,
    email,
    linkedin,
    twitter
  } = body

  const newContact = new Contact(
    firstName,
    lastName,
    street,
    city,
    type,
    email,
    linkedin,
    twitter
  )

  contacts.push(newContact)
  return newContact
}

const updateContact = (id, newBody) => {
  const contact = getContactById(id)
  const fields = Object.keys(newBody)

  for (let i = 0; i < fields.length; i++) {
    const currentKey = fields[i]
    if (validField(currentKey)) {
      contact[currentKey] = newBody[currentKey]
    }
  }

  return contact
}

class Contact {
  constructor(
    firstName,
    lastName,
    street,
    city,
    type,
    email,
    linkedinURL,
    twitterHandle
  ) {
    this.id = getNewContactId()
    this.firstName = firstName 
    this.lastName = lastName 
    this.street = street 
    this.city = city 
    this.type = type 
    this.email = email 
    this.linkedinURL = linkedinURL
    this.twitterHandle = twitterHandle
  }
}

module.exports = { 
  contacts,
  addContact,
  getContactById,
  updateContact,
  deleteContactById
}
