import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { interviewStartPost } from "../redux/interviewReducer/action";
import { Dispatch } from "redux";

export const InterviewRoom = () => {
    const [textAreaData, setTextAreaData] = useState("");
    const { type, success, message, data, newQue, isLoading } = useSelector((store: RootState) => {
        return {
            type: store.interviewReducer.type,
            success: store.interviewReducer.success,
            message: store.interviewReducer.message,
            data: store.interviewReducer.data,
            newQue: store.interviewReducer.newQue,
            isLoading: store.interviewReducer.isLoading,
        }
    });
    const dispatch = useDispatch<Dispatch>()

    const handleSendAnswer = () => {
        const newConversation = {role:"user", content:textAreaData}
    }

    useEffect(() => {
        // dispatch(interviewStartPost());
    }, [])
    console.log(type, success, message, data, newQue)
    return (
        <div className="mt-28 mx-2">
            <div className="flex justify-between items-center">
                <div className="w-[69%]">
                    <div className="mb-4 text-right bg-[#3F3F46] py-4 px-4">{type} Interview</div>
                    <div className="flex w-full justify-between">
                        <div className="relative w-[49%] flex justify-center items-center bg-[#3a3348] h-[300px] rounded-lg shadow-xl shadow-indigo-700/10">
                            <div className="bg-red-900 w-[110px] h-[110px] flex justify-center items-center rounded-full text-4xl border-2">
                                J
                            </div>
                            <span className="absolute left-2 bottom-3 bg-transparent">John</span>
                        </div>
                        <div className="w-[49%] h-[300px] bg-zinc-700 rounded-lg shadow-xl shadow-indigo-700/10">

                        </div>
                    </div>
                    <div className="mt-16 text-center">
                        {success === "Interview Started" ?
                            <button onClick={() => dispatch(interviewStartPost())} className="border px-3 py-1 rounded hover:bg-red-600/30 hover:text-red-100 transition">{isLoading ? "Loading..." : "End Interview"}</button>
                            :
                            <button onClick={() => dispatch(interviewStartPost())} className="border px-3 py-1 rounded hover:bg-indigo-600/35 hover:text-indigo-200 transition">{isLoading ? "Loading..." : "Start Interview"}</button>
                        }
                    </div>
                </div>
                <div className="transcripts w-[29%] bg-indigo-900 h-[600px] rounded-md p-3">
                    <div className="p-2 h-[55%] bg-indigo-950/40 overflow-x-scroll">
                        <div className="p-2 bg-indigo-950 rounded-md">
                            <div className="bg-red-900 w-[30px] h-[30px] flex justify-center items-center rounded-full text-lg border-2">
                                J
                            </div>
                            <p className="mt-3 bg-transparent text-justify">
                                {newQue}
                            </p>
                        </div>
                    </div>
                    <div className="bg-transparent my-4 flex justify-between items-center">
                        <div className="bg-transparent flex gap-2">
                            <button className="border px-4 py-1 rounded hover:bg-teal-600/40">Start</button>
                            <button className="border px-4 py-1 rounded hover:bg-red-600/40">Stop</button>
                        </div>
                        <div className="bg-transparent">
                            <button onClick={handleSendAnswer} className="border px-4 py-1 rounded hover:bg-green-600/40">Send</button>
                        </div>
                    </div>
                    <div className="bg-transparent">
                        <textarea onChange={(e)=>setTextAreaData(e.target.value)} placeholder="" name="answer" cols={42} rows={7} className="rounded font-semibold bg-indigo-950/40"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
