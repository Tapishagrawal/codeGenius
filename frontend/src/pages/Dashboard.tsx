import { useEffect, useState } from "react"
import { TabControler } from "../components/TabControler"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CHANGE_INTTERVIEW_TYPE } from "../redux/actionType";

export const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState("MERN");
    const dispatch = useDispatch()

    const handleClickleOpenModel = () => {
        setIsOpen(prev => !prev)
    }
    useEffect(() => {
        if (type) {
          dispatch({ type: CHANGE_INTTERVIEW_TYPE, payload: type });
        }
      }, [type]);
    return (
        <div className="mt-28 mx-20">
            <h1 className="text-2xl font-bold">My Interviews</h1>
            <div className="mt-6">
                <TabControler handleClickleOpenModel={handleClickleOpenModel} />
            </div>
            {
                isOpen &&
                <div>
                    <div onClick={handleClickleOpenModel} className="fixed top-0 left-0 bg-black/40 backdrop-blur-[0.08rem] w-full h-full z-10"></div>
                    <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-20 rounded-md shadow-lg shadow-indigo-500/10">
                        <div className="relative flex flex-col justify-center items-center w-[300px] h-[200px] rounded-md">
                            <span onClick={handleClickleOpenModel} className="absolute top-2 right-3 bg-indigo-700/30 hover:bg-indigo-700/40 text-xs font-semibold px-3 py-1 rounded-md text-indigo-200 cursor-pointer">ESC</span>
                            <div className="flex gap-4 bg-transparent">
                                <button onClick={()=>setType("MERN")} className={`${type==="MERN" ? "bg-indigo-500/50" : ""} bg-transparent hover:bg-indigo-500/50 text-indigo-200 px-2 py-1 rounded-md`}>MERN</button>
                                <button onClick={()=>setType("Java")} className={` ${type==="Java" ? "bg-indigo-500/50" : ""} bg-transparent hover:bg-indigo-500/50 text-indigo-200 px-2 py-1 rounded-md`}>Java</button>
                                <button onClick={()=>setType("DSA")} className={` ${type==="DSA" ? "bg-indigo-500/50" : ""} bg-transparent hover:bg-indigo-500/50 text-indigo-200 px-2 py-1 rounded-md`}>DSA</button>
                            </div>
                            <Link to={"/assessment-interview"} className="mt-4 text-xl bg-indigo-500/40 hover:bg-indigo-500/50 text-indigo-200 px-2 py-2 rounded-md">Start the Interview</Link>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
