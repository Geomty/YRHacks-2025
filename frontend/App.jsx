import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Node from "./node.jsx";
import { NodeClass, TreeClass } from "./tree.js";

export default function App() {
    const [modal, setModal] = useState({});
    const ref = useRef(null);
    const sample = useRef({"title":"Node 1","children":[{"title":"This is a test"},{"title":"A","children":[{"title":"Another node"},{"title":"This is a veeeeeeeery long title","children":[{"title":"Last node","children":[{"title":"What"},{"title":"What"},{"title":"What"},{"title":"What"},{"title":"What"},{"title":"What"},{"title":"What"},{"title":"What"},{"title":"What"},{"title":"What"},{"title":"What"},{"title":"What"},{"title":"What"},{"title":"What"},{"title":"What"},{"title":"What"},{"title":"What"}]}]},{"title":"Hello world"}]}]});
    //const sample = useRef({"title":"Node 1","children":[{"title":"This is a test"},{"title":"A","children":[{"title":"Another node"},{"title":"This is a veeeeeeeery long title","children":[{"title":"Last node"}]},{"title":"Hello world"}]}]});
    const array = useRef(objToArray(sample.current));
    
  //form.addEventListener(focus, () => form.select());
    return (
      <div className="bg-white p-4" ref={ref}>
        <div> 
            <h1 className="text-orange">Need To Node</h1>
            /*tree goes here

        </div>

        {array.current.map((row, i) => {
            return (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: "tween", ease: "easeInOut", duration: 0.5, delay: i*0.1 }} className="h-56 w-full flex flex-wrap justify-around align-center gap-16">
                    {row.map((node, j) => {
                        return <motion.div drag dragConstraints={ref} dragElastic={false} dragMomentum={false} key={j} className="w-fit h-fit p-8"><Node setModal={setModal} info={node} backgroundColor="#00c5ff" /></motion.div>;
                    })}
                </motion.div>
            )
        })}
        <AnimatePresence>
            {Object.keys(modal).length && (
                <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                    className={`top-0 left-0 z-10 fixed w-full h-full bg-black`}></motion.div>

                    <motion.div initial={{ opacity: 0, top: "48%" }} animate={{ opacity: 1, top: "50%" }} exit={{ opacity: 0, top: "48%" }} transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                    className={`z-20 fixed left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-fit p-8
                    flex flex-col gap-8 items-center bg-slate-500 rounded-4xl`}>
                        <div className="text-2xl text-black">{modal.title}</div>
                        <button type="button" className="bg-white rounded-full text-xl text-black px-3 py-1 hover:cursor-pointer" onClick={() => setModal({})}>Close</button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>

        {/* <div class="border-b-4 border-black-500 top-0 h-18 w-10 mt-8 p-8">
          <form backgroundColor="#FFFFFF" fontSize="1rem" class="w-full object-top text-center text-grey text-grey shadow-sm" 
          id="browseFor" placeholder = "Search for a topic..." htmlFor={searchInputID}>
                search bar
          </form>
        </div>*/}
      </div>
    )
}

function objToArray(obj) {
    let arr = [];
    let queue = [{...obj, pos: 0}];

    while (queue.length) {
        let curr = queue.shift(0);
        let pos = curr.pos;

        if (pos > arr.length - 1) {
            arr.push([]);
        }

        if (curr.children) {
            for (let child of curr.children) {
                queue.push({...child, pos: pos + 1});
            }
        }

        delete curr.pos;
        delete curr.children;
        arr[pos].push(curr);
    }

    return arr;
}
