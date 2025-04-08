const logger = require("./logger.cjs");
const Conversation = require("./api.cjs");

async function handleClient(client) {
    // Setup
    const getResponse = new Conversation().getResponse;

    client.send("Child process running");
    client.on("message", async link => {
        // Get request to generate more nodes
        let response = await getResponse(link);
        response = response.split("LINKS:");
        response = response[response.length - 1];
        response = response.split("\n");
        for (let i = response.length - 1; i >= 0; i--) {
            if (!response[i].includes("://") || !response[i].includes(", ")) {
                response.splice(i, 1);
            } else {
                // Title, Description, Link
                response[i] = response[i].split(", ");
                if (response[i].length != 3) {
                    response.splice(i, 1);
                }
            }
        }
        client.send(response);
    });
}

module.exports = handleClient;
