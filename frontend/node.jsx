export default function Node({ setModal, title, width, height, backgroundColor, fontSize }) {
    return (
        <button type="button" style={{width, height, backgroundColor}} className="rounded-full flex hover:cursor-pointer" onClick={() => {
            setModal({ title })
        }}>
            <div style={{fontSize}} className="m-auto text-black">{title}</div>
        </button>
    )
}