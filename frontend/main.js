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

function createNodeElement(node) {
    const tree = document.getElementById("tree");
    const parent = tree.children[tree.childElementCount - 1];

    const wrapper = document.createElement("div");
    wrapper.className = "w-fit h-fit z-10 p-8 flex items-center rounded-2xl hover:cursor-grab bg-lightblue shadow-sm shadow-black px-6 py-3";

    const inner = document.createElement("div");
    inner.className = "m-auto text-black text-2xl hover:cursor-pointer";
    inner.textContent = node.title;
    inner.onclick = () => { modal = node; };

    wrapper.appendChild(inner);
    parent.appendChild(wrapper);

    return new Promise(resolve => {
        requestAnimationFrame(() => {
            console.log(wrapper);
            resolve(wrapper);
        });
    });
}

window.tree = new TreeClass("Deutsch–Jozsa Algorithm", "https://en.wikipedia.org/wiki/Deutsch–Jozsa_algorithm");
tree.rootNode.description = "A deterministic quantum algorithm that is one of the first examples of a quantum algorithm that is exponentially faster than any possible deterministic classical algorithm.";

function drawCurve(from, to) {
    const svg = document.getElementById("svg");
    const svgTop = svg.getBoundingClientRect().top;

    const fromBox = from.getBoundingClientRect();
    const toBox = to.getBoundingClientRect();

    const startX = fromBox.left + fromBox.width / 2;
    const startY = fromBox.top + fromBox.height - svgTop;
    const endX = toBox.left + toBox.width / 2;
    const endY = toBox.top - svgTop;

    const controlOffsetX = (endX - startX) / 2;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const d = `M ${startX},${startY} 
               C ${startX},${startY + controlOffsetX} 
                 ${endX},${endY - controlOffsetX} 
                 ${endX},${endY}`;

    path.setAttribute("d", d);
    path.setAttribute("stroke", "gray");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none");

    svg.appendChild(path);
    console.log(from);
    console.log(to);
    console.log(svgTop);
    console.log(fromBox);
    console.log(toBox);
}

let updateTree = async () => {
    // Position all nodes
    document.getElementById("tree").innerHTML = "<svg id=\"svg\" style=\"width: 100vw; height: calc(100vh - 4em - var(--spacing)*8); position: absolute; z-index:-1;\"></svg>";
    let arr = objToArray(tree.rootNode);
    for (let i = 0; i < arr.length; i++) {
        document.getElementById("tree").innerHTML += `
        <div class="h-56 w-full flex flex-no-wrap justify-around align-center gap-16"></div>
        `;

        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j].renderedElement = await createNodeElement(arr[i][j]);
        }
    }
    setTimeout(() => {
        drawCurve(arr[0][0].renderedElement, arr[0][0].children[0].renderedElement);
    }, 100);
    // for (let i = 0; i < arr.length - 1; i++) {
    //     for (let j = 0; j < arr[i].length; j++) {
    //         for (let child of arr[i][j].children) {
    //             drawCurve(arr[i][j].renderedElement.children[0], child.renderedElement.children[0]);
    //         }
    //     }
    // }
};

userid.addEventListener(`focus`, () => userid.select());

(async () => {
    await tree.extendAllChildren();
    setTimeout(updateTree, 500);
})();
window.updateTree = updateTree;
