const logger = require("./logger.cjs");
const getResponse = require("./api.cjs");

async function handleClient(client) {
    // Setup

    client.send("Child process running");
    client.on("message", async link => {
        // Get request to generate more nodes
        let response = await getResponse(link);
        response = response.split("\n");
        for (let i = response.length - 1; i >= 0; i--) {
            if (!response[i].includes("://") || !response[i].includes("; ")) {
                response.splice(i, 1);
            } else {
                // Title, Description, Link
                response[i] = response[i].split("; ");
                if (response[i].length != 3) {
                    response.splice(i, 1);
                }
                response[i][1] = response[i][1].trim();
            }
        }
        client.send(JSON.stringify(response));
    });
}

module.exports = handleClient;
