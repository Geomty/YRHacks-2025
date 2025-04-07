// Set up logger
const logger = require("./logger");
logger("Started!");

// Print IP address
const os = require("os");
const networkInterfaces = os.networkInterfaces();
let ipAddress = "";
for (let interface in networkInterfaces) {
    for (let address of networkInterfaces[interface]) {
        if (address.family === "IPv4" && !address.internal) {
            ipAddress = address.address;
            break;
        }
    }
}
logger(`IP address of server: ${ipAddress}`);

// Web socket
const { WebSocketServer } = require("ws");
const sockserver = new WebSocketServer({ port: 443 });
const spawnChildProcess = require("./child_process");

sockserver.on("connection", async ws => {
	console.log("New client connected!");
	ws.send("Connection established!");
	ws.on("close", () => console.log("Client has disconnected!"));
	// This is confusing to read - it is two words "on error"
	ws.onerror = () => {
		console.log("websocket error");
	}
    spawnChildProcess(ws);
});
