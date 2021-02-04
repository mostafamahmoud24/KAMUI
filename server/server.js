const http = require("http");
const app = require("./app");
const colors = require("colors");

//changed to port 5000 to be able to use the OAuth strategy credentials (permission was given on port 5000)
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`app now listening for requests on port ${PORT}`.magenta);
});

module.exports = server;
