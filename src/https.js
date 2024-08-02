function httpsServer(app) {
  const https = require("https");
  const fs = require("fs");

  const SSLcert = {
    key: fs.readFileSync("/etc/letsencrypt/live/atakan.cloud/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/atakan.cloud/fullchain.pem"),
  };

  const httpsServer = https.createServer(SSLcert, app);
  return httpsServer;
}

module.exports = httpsServer;
