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

        document.getElementById("download-button").onclick = () => this.export();
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

    // Strip cyclic and DOM properties
    toJSONSafe() {
        const stripNode = (node) => {
            return {
                title: node.title,
                description: node.description,
                link: node.link,
                completed: node.completed,
                known: node.known,
                children: node.children.map(stripNode)
            };
        };
        return {
            rootNode: stripNode(this.rootNode),
            childNodes: this.childNodes.map(n => ({
                link: n.link
            }))
        };
    }

    export() {
        const stripped = this.toJSONSafe();
        const file = new File([JSON.stringify(stripped, null, 2)], "tree.json");
        const objectURL = URL.createObjectURL(file);
        const linkElement = document.getElementById("download-link");
        linkElement.href = objectURL;
        linkElement.click();
        URL.revokeObjectURL(objectURL);
    }
}

function convertToNode(json, parent = null) {
    let node = new NodeClass(json.title, json.description, json.link);
    node.completed = json.completed;
    node.known = json.known;
    node.parent = parent;
    for (let childJson of json.children || []) {
        let childNode = convertToNode(childJson, node);
        node.children.push(childNode);
    }
    return node;
}

async function importTree() {
    document.getElementById("generate").click();

    const inputElement = document.getElementById("upload-input");
    inputElement.click();
    inputElement.value = null;

    const file = await new Promise((resolve) => {
        const check = () => {
            if (inputElement.files) {
                const file = inputElement.files[0];
                if (file) resolve(file);
                else setTimeout(check, 0);
            }
            else setTimeout(check, 0);
        };
        check();
    });

    inputElement.value = null;
    const json = JSON.parse(await file.text());

    const tree = new TreeClass(json.rootNode.title, json.rootNode.link);
    tree.rootNode = convertToNode(json.rootNode);

    const linkSet = new Set(json.childNodes.map(child => child.link));
    tree.childNodes = [];
    tree.traverseAllNodes(node => {
        if (linkSet.has(node.link)) {
            tree.childNodes.push(node);
        }
    });

    window.tree = tree;
    updateTree();

    return tree;
}

document.getElementById("upload-button").onclick = importTree;
