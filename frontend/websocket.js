// Frontend code
const ws = new WebSocket(`ws://${window.location.hostname}:443/`);
let resolve2;
let wsOpen = new Promise((resolve, reject) => {
    resolve2 = resolve;
});
ws.addEventListener("open", async () => {
    console.log("Websocket connected");
    resolve2();
});
window.ws = ws;

var messageFromServer = null;
ws.onmessage = event => {
    const message = event.data;
    if (!message.includes("[[")) return;
    messageFromServer = message;
};

async function getPrerequisites(link) {
    await wsOpen;
    ws.send(link);
    return new Promise((resolve, reject) => {
        let interval;
        interval = () => {
            if (messageFromServer != null) {
                resolve(JSON.parse(String(messageFromServer)));
                messageFromServer = null;
            } else {
                setTimeout(interval, 0);
            }
        }
        interval();
    });
}

window.getPrerequisites = getPrerequisites;
