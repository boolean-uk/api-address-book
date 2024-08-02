// const httpsServer = require("./https.js");
const app = require("./server.js");

const port = 3030;

// httpsServer(app).listen(3030, () => {
// console.log(`Server is running on https://api.atakan.cloud/`);
// });
//
// app.listen(3031, () => {
// console.log(`Server is running on http://api.atakan.cloud/`);
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
