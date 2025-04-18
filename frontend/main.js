import {
    TreeClass
} from "./tree";

function clearModal() {
    document.getElementById("modal").innerHTML = "";
}
window.clearModal = clearModal;
function updateModal() {
    const modal = document.getElementById("modal");
    if (modal.innerHTML == "") return;
    clearModal();
    setModal(modal.modal);
}
window.updateModal = updateModal;

function setModal(modal) {
    document.getElementById("modal").innerHTML = `
            <div id="darkbackground" class="top-0 left-0 z-10 fixed w-full h-full bg-black" style="opacity: 50%;"></div>
            <div class="z-20 fixed left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit p-8
            flex flex-col gap-6 items-center text-center bg-lightgray rounded-2xl"
            style="position: absolute; top: 50%; max-width: 70vh;">
                <div id="title" class="text-2xl text-black font-bold"></div>
                <div id="description" class="text-xl text-black"></div>
                <a id="link" href="${modal.link}" target="blank" class="text-lg underline">${modal.link}</a>
                <button id="toggleKnown" type="button" className="bg-white rounded-full text-xl text-black px-3 py-1 select-none" style="font-size: x-large;">Toggle Known</button>
                <button id="closeModal" type="button" className="bg-white rounded-full text-xl text-black px-3 py-1 select-none" style="font-size: x-large;">Close</button>
            </div>
        `;
    if (window.innerHeight / window.innerWidth < .65) {
        document.getElementById("modal").innerHTML += `
            <div class="z-20 w-fit h-fit p-8 flex flex-col gap-6 items-center text-center bg-lightgray rounded-2xl"
            style="position: absolute; top:50%; right: 15%; transform: translate(50%, -50%); max-width: 50vh;">
                <div id="parent-indicator" class="text-2xl text-black font-bold">Parent: ${modal.parent.title}</div>
                <div id="children-indicator" class="text-xl text-black">
                    Children:<br>${modal.children.map(child => child.title).join("<br>")}
                </div>
            </div>`
    }
    document.getElementById("title").innerHTML = modal.title;
    document.getElementById("description").innerHTML = modal.description;
    document.getElementById("link").innerHTML = modal.link;
    document.getElementById("toggleKnown").onclick = () => {
        modal.known = !modal.known;
        updateTree();
    };
    document.getElementById("darkbackground").onclick = clearModal;
    document.getElementById("closeModal").onclick = clearModal;
    document.getElementById("modal").modal = modal;
}

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
                // child.parent = arr[pos].length;
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
    wrapper.className = "w-fit h-fit z-10 p-2 flex items-center shadow-sm shadow-black px-2 py-1";
    if (node.known) {
        wrapper.className += " bg-paleorange";
    } else {
        wrapper.style.backgroundColor = "var(--colour)";
    }
    wrapper.style.borderRadius = ".5em";

    const inner = document.createElement("div");
    inner.className = "m-auto text-black text-1xl hover:cursor-pointer";
    inner.textContent = node.title;
    inner.onclick = () => { setModal(node); };

    const inner2 = document.createElement("button");
    // inner2.innerText = "Toggle";
    inner2.onclick = () => {
        node.known = !node.known;
        updateTree();
    };
    inner2.style.fontSize = "xx-small";
    inner2.style.backgroundColor = "#fffa";
    inner2.style.borderRadius = "100%";
    inner2.style.marginLeft = ".5em";
    inner2.style.marginRight = "-.5em";
    // inner2.style.marginTop = "1em";
    inner2.style.width = "2em";
    inner2.style.height = "2em";
    // inner2.style.borderColor = "gray";
    // inner2.style.borderWidth = "1px";
    // inner2.style.borderStyle = "solid";

    wrapper.appendChild(inner);
    wrapper.appendChild(inner2);
    parent.appendChild(wrapper);

    // return new Promise(resolve => {
    //     requestAnimationFrame(() => {
    //         console.log(wrapper);
    //         resolve(wrapper);
    //     });
    // });
    return wrapper;
}

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
    const controlOffsetY = (endY - startY);

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const d = `M ${startX},${startY} 
               C ${startX},${startY + controlOffsetY} 
                 ${endX},${endY - controlOffsetY} 
                 ${endX},${endY}`;

    path.setAttribute("d", d);
    path.setAttribute("stroke", "gray");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none");

    svg.appendChild(path);
}

let updateTree = async () => {
    // Position all nodes
    let treeElement = document.getElementById("tree");
    treeElement.innerHTML = "";
    treeElement.innerHTML = "<div style=\"width: 100%; max-height: 0; overflow: visible;\"><svg id=\"svg\" style=\"width: 100vw; min-height: 100000vh; top: 4em;\"></svg></div>";
    let arr = objToArray(tree.rootNode);
    for (let i = 0; i < arr.length; i++) {
        const child = document.createElement("div");
        child.className = "h-30 w-full flex justify-around align-center gap-8";
        child.style.maxWidth = "100vw";
        child.style.flexWrap = "wrap";
        child.style.height = "fit-content";
        child.style.marginBottom = "calc(var(--spacing) * 4)";
        child.style.setProperty("--colour", `var(--color-${i % 8})`);
        treeElement.appendChild(child);

        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j].renderedElement = await createNodeElement(arr[i][j]);
            // if (i < arr.length - 1) {
            //     arr[i][j].renderedElement = treeElement.children[i+1].children[j].children[0];
            // }
        }
    }
    // arr[0][0].renderedElement = treeElement.children[1].children[0].children[0];

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            for (let child of arr[i][j].children) {
                drawCurve(arr[i][j].renderedElement, child.renderedElement);
            }
        }
    }
};

userid.addEventListener(`focus`, () => userid.select());

const rootNodeLink = await new Promise(resolve => {
    const btn = document.getElementById("generate");
    const f = function (e) {
        e.preventDefault();
        document.getElementById("linkForm").removeEventListener("submit", f);
        btn.innerText = "Generate";
        resolve(document.getElementById("userid").value);
        document.getElementById("userid").value = "";
    }
    document.getElementById("linkForm").addEventListener("submit", f);
    // btn.onclick = () => {
    //     delete btn.onclick;
    //     document.getElementById("linkForm").removeEventListener(f);
    //     btn.innerText = "Generate";
    //     resolve(document.getElementById("userid").value);
    //     document.getElementById("userid").value = "";
    // };
    // const f = function (e) {
    //     e.preventDefault();
    //     delete btn.onclick;
    //     document.getElementById("linkForm").removeEventListener(f);
    //     btn.innerText = "Generate";
    //     resolve(document.getElementById("userid").value);
    //     document.getElementById("userid").value = "";
    // };
    // document.getElementById("linkForm").addEventListener("submit", f);
});
window.tree = new TreeClass("Learning Resource", rootNodeLink);
tree.rootNode.description = "A learning resource you would like to be able to learn from.";
updateTree();

// (async () => {
//     await tree.extendAllChildren();
//     updateTree();
// })();
window.updateTree = updateTree;
window.addEventListener("resize", () => {
    updateTree();
    updateModal();
});
document.getElementById("generate").onclick = async () => {
    await tree.extendAllChildren();
    updateTree();
};
