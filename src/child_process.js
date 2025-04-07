const logger = require("./logger");
const Conversation = require("./api.js");

async function handleClient(client) {
    // Setup
    const getResponse = new Conversation().getResponse;

    client.send("Child process running");
    client.on("message", async message => {
        // Get request to generate more nodes
    })
}

module.exports = handleClient;
