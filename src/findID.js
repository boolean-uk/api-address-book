function findID(data, id) {
    const found = data.find((d) => d.id === id)
    return found
}

module.exports = findID