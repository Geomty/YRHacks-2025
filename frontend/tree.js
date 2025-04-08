import { root } from "postcss";

// Handling the tree
export class NodeClass {
    title;
    description;
    link;
    completed;
    known;
    children;

    constructor(title, description, link) {
        this.title = title;
        this.description = description;
        this.link = link;
        this.completed = false;
        this.known = false;
        this.children = [];
    }

    addChild(childArr) {
        this.children.push(new Node(childArr[0], childArr[1], childArr[2]));
    }

    addChildren(children) {
        children.forEach((child) => {
            this.addChild(child);
        });
    }

    async generateChildren() {
        this.addChildren(await getPrerequisites(this.link));
    }
}

export class TreeClass {
    rootNode;
    childNodes;

    constructor(link) {
        this.rootNode = new Node(null, null, link);
        this.childNodes = this.rootNode;
    }

    extendChild(node) {
        if (!(node in this.childNodes)) return;
        node.generateChildren();
        this.childNodes.splice(this.childNodes.indexOf(node), 1);
        this.childNodes = this.childNodes.concat(node.children);
    }

    extendAllChildren() {
        for (let node in this.childNodes) {
            if (!node.known) {
                this.extendChild(node);
            }
        }
    }
}