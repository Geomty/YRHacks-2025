export default function Node({ setModal, info, backgroundColor, fontSize }) {
    return (
        <div style={{backgroundColor}} className="w-fit h-fit p-8 flex items-center rounded-full hover:cursor-pointer">
            <div style={{fontSize}} className="m-auto text-black text-2xl" onClick={() => setModal(info)}>{info.title}</div>
        </div>
    )
}