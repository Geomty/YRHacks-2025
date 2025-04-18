// Handling the tree
export class NodeClass {
    title;
    description;
    link;
    completed;
    known;
    children;
    parent;
    renderedElement;

    constructor(title, description, link) {
        this.title = title;
        this.description = description;
        this.link = link;
        this.completed = false;
        this.known = false;
        this.children = [];
        this.parent = { title: "" };
    }

    async addChild(childArr) {
        const child = new NodeClass(childArr[0], childArr[1], childArr[2]);
        child.parent = this;
        console.log(this);
        await this.children.push(child);
    }

    async addChildren(children) {
        await children.forEach(async (child) => {
            await this.addChild(child);
        });
    }

    async generateChildren() {
        // await new Promise((resolve, reject) => {
        //     let interval;
        //     interval = () => {
        //         if (window.getPrerequisites != undefined) {
        //             resolve();
        //         } else {
        //             setTimeout(interval, 0);
        //         }
        //     }
        //     interval();
        // });
        let pre = await getPrerequisites(this.link);
        await this.addChildren(pre);
    }
}

export class TreeClass {
    rootNode;
    childNodes;

    constructor(title, link) {
        this.rootNode = new NodeClass(title, null, link);
        this.childNodes = [this.rootNode];
        document.getElementById("download-button").onclick = this.export;
    }

    async extendChild(node) {
        // if (!(node in this.childNodes)) return;
        await node.generateChildren();
        this.childNodes.splice(this.childNodes.indexOf(node), 1);

        // Remove duplicates
        let links = node.children.map(child => child.link);
        this.traverseAllNodes(graphNode => {
            if (graphNode.link in links) {
                for (let child of node) {
                    if (graphNode.link == child.link) {
                        node.children = node.children.splice(node.children.indexOf(child), 1);
                        break;
                    }
                }
            }
        });

        this.childNodes = this.childNodes.concat(node.children);
    }

    async extendAllChildren() {
        for (let node of [...this.childNodes]) {
            if (!node.known) {
                await this.extendChild(node);
            }
        }
    }

    traverseAllNodes(f, node = this.rootNode) {
        f(node);
        node.children.forEach(child => {
            this.traverseAllNodes(f, child);
        });
    }

    export() {
        let file = new File([JSON.stringify(this)], "tree.json");
        let objectURL = URL.createObjectURL(file);
        let linkElement = document.getElementById("download-link");
        linkElement.href = objectURL;
        linkElement.click();
        URL.revokeObjectURL(objectURL);
    }
}

function convertToNode(json) {
    let node = new NodeClass(json.title, json.description, json.link);
    node.completed = json.completed;
    node.known = json.known;
    for (let child of json.children) {
        node.children.push(convertToNode(child));
    }
    return node;
}

async function importTree() {
    await new Promise((resolve, reject) => {
        let interval;
        interval = () => {
            if (document.getElementById("upload-input").files.length > 0) {
                if (document.getElementById("upload-input").files[0] != null) {
                    resolve();
                } else {
                    setTimeout(interval, 0);
                }
            } else {
                setTimeout(interval, 0);
            }
        }
        interval();
    });
    let file = document.getElementById("upload-input").files[0];
    document.getElementById("upload-input").files[0] = null;
    let json = JSON.parse(await file.text());
    let tree = new TreeClass(json.rootNode.title, json.rootNode.link);
    tree.rootNode = convertToNode(json.rootNode);
    let links = json.childNodes.map(child => child.link);
    tree.childNodes = [];
    tree.traverseAllNodes(node => {
        if (node.link in links) {
            tree.childNodes.push(node);
        }
    });
}

document.getElementById("upload-input").onclick = importTree;