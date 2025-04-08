import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Node from "./node.jsx";
import { NodeClass, TreeClass } from "./tree.js";

export default function App() {
    const [modal, setModal] = useState({});
    
  //form.addEventListener(focus, () => form.select());
    return (
      <div class="bg-white dark:bg-black">

        <div> 
            <h class="text-orange">Need To Node</h>
            /*tree goes here

        </div>


        <Node setModal={setModal} title="Testing" width="13rem" height="7rem" backgroundColor="#00c5ff" fontSize="2rem" />

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
        </div>
 */}
      </div>
    )
}

