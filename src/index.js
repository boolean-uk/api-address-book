const app = require('./server.js')
const port = 3030

app.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}/`)
})

module.exports = {app}