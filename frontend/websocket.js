// Frontend code
const ws = new WebSocket(`ws://${window.location.hostname}:443/`);
ws.addEventListener("open", async () => {
    console.log("Websocket connected");
});

var messageFromServer = null;
ws.onmessage = event => {
    const message = event.data;
    messageFromServer = message; 
};

async function getPrerequisites(link) {
    ws.send(link);
    return await new Promise((resolve, reject) => {
        let interval;
        interval = () => {
            if (messageFromServer != null) {
                resolve(messageFromServer);
                messageFromServer = null;
            } else {
                setTimeout(interval, 0);
            }
        }
        interval();
    });
}
