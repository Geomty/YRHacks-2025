import {
    NodeClass,
    TreeClass
} from "./tree";

let modal = false;
setInterval(() => {
    if (modal) {
        document.getElementById("modal").innerHTML = `
            <div class="top-0 left-0 z-10 fixed w-full h-full bg-black"></div>
            <div class="z-20 fixed left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit p-8
            flex flex-col gap-8 border-1 items-center text-center bg-lightgray rounded-2xl">
                <div id="title" class="text-2xl text-black font-bold"></div>
                <div id="description" class="text-xl text-black"></div>
                <a id="link" class="text-lg underline"></a>
                <button type="button" className="bg-white rounded-full text-xl text-black px-3 py-1 select-none hover:cursor-pointer">Close</button>
            </div>
        `;
        document.getElementById("title").innerHTML = modal.title;
        document.getElementById("description").innerHTML = modal.description;
        document.getElementById("link").innerHTML = modal.link;
    } else {
        document.getElementById("modal").innerHTML = "";
    }
}, 100);

function objToArray(obj) {
    let arr = [];
    obj.pos = 0;
    let queue = [obj];

    while (queue.length) {
        let curr = queue.shift(0);
        let pos = curr.pos;

        if (pos > arr.length - 1) {
            arr.push([]);
        }

        if (curr.children) {
            for (let child of curr.children) {
                // child = JSON.parse(JSON.stringify(child));
                child.pos = pos + 1;
                child.parent = arr[pos].length;
                queue.push(child);
            }
        }

        // delete curr.children;
        arr[pos].push(curr);
    }

    return arr;
}

window.createNodeElement = node => {
    document.getElementById("tree").children[document.getElementById("tree").childElementCount - 1].innerHTML += `
        <div class="w-fit h-fit z-10 p-8 flex items-center rounded-2xl hover:cursor-grab bg-lightblue shadow-sm shadow-black px-6 py-3">
            <div class="m-auto text-black text-2xl hover:cursor-pointer" onClick="() => modal = node">${node.title}</div>
        </div>
    `;
    let a = document.getElementById("tree").children[document.getElementById("tree").childElementCount - 1];
    return a.children[a.childElementCount - 1];
}

window.tree = new TreeClass("Deutsch–Jozsa Algorithm", "https://en.wikipedia.org/wiki/Deutsch–Jozsa_algorithm");
tree.rootNode.description = "A deterministic quantum algorithm that is one of the first examples of a quantum algorithm that is exponentially faster than any possible deterministic classical algorithm.";

function connectElements(el1, el2) {
    const box1 = el1.getBoundingClientRect();
    const box2 = el2.getBoundingClientRect();

    const x1 = box1.left + box1.width / 2 + window.scrollX;
    const y1 = box1.top + box1.height / 2 + window.scrollY;
    const x2 = box2.left + box2.width / 2 + window.scrollX;
    const y2 = box2.top + box2.height / 2 + window.scrollY;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.left = `${.5*(x1+x2)}px`;
    line.style.top = `${.5*(y1+y2)}px`;
    line.style.width = `${length}px`;
    line.style.height = '2px';
    line.style.backgroundColor = 'black';
    line.style.transform = `rotate(${angle}deg)`;
    line.style.transformOrigin = '0 0';
    line.style.zIndex = '999';

    document.body.appendChild(line);
}

let updateTree = () => {
    // Position all nodes
    document.getElementById("tree").innerHTML = "";
    let arr = objToArray(tree.rootNode);
    for (let i = 0; i < arr.length; i++) {
        document.getElementById("tree").innerHTML += `
        <div class="h-56 w-full flex flex-no-wrap justify-around align-center gap-16"></div>
        `;

        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j].renderedElement = createNodeElement(arr[i][j]);
        }
    }
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            for (let child of arr[i][j].children) {
                // connectElements(arr[i][j].renderedElement, child.renderedElement);
            }
        }
    }
};

userid.addEventListener(`focus`, () => userid.select());

(async () => {
    await tree.extendAllChildren();
    setTimeout(updateTree, 500);
})();
window.updateTree = updateTree;
