function newID(data) {
    const newID = data.reverse().find((d) => d.id)
    return newID.id +1
}

module.exports = newID