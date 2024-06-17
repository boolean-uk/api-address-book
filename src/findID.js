const contacts = require('../data/contacts.js')

function findID(data, id) {
    const found = data.find((c) => c.id === id)
    return found
}

module.exports = findID