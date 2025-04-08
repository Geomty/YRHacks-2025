export default function Node({ setModal, info, backgroundColor, fontSize }) {
    return (
        <div style={{backgroundColor}} className="w-fit h-fit z-10 p-8 flex items-center rounded-2xl hover:cursor-grab shadow-sm shadow-black px-6 py-3">
            <div style={{fontSize}} className="m-auto text-black text-2xl hover:cursor-pointer" onClick={() => setModal(info)}>{info.title}</div>
        </div>
    )
}