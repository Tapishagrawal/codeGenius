import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { conversationItem, interviewEndPost, interviewGetData, interviewStartPost, interviewUpdatePatch } from "../redux/interviewReducer/action";
import { Dispatch } from "redux";
import { useNavigate } from "react-router-dom";


export const InterviewRoom = () => {
    const [textAreaData, setTextAreaData] = useState("");
    const navigate = useNavigate()
    const { type, success, data, isLoading, id, message } = useSelector((store: RootState) => {
        return {
            type: store.interviewReducer.type,
            success: store.interviewReducer.success,
            message: store.interviewReducer.message,
            data: store.interviewReducer.data,
            isLoading: store.interviewReducer.isLoading,
            id: store.interviewReducer.id,
        }
    });
    const dispatch = useDispatch<Dispatch>()

    const handleSendAnswer = () => {
        const newConversation = { role: "user", content: textAreaData };
        const newdata = [...data.conversation, newConversation]
        dispatch(interviewUpdatePatch(id, {conversation: newdata}));
        setTextAreaData("")
    }
    const handleEndInterview = () => {
        dispatch(interviewEndPost(id, {conversation:data.conversation}))
        navigate("/dashboard")
    }

    useEffect(() => {
        if (id) {
            dispatch(interviewGetData(id))
        }
    }, [id])
    console.log(data.feedback)
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
                        {message === "Interview data fetched successfully" ?
                            <button onClick={handleEndInterview} className="border px-3 py-1 rounded hover:bg-red-600/30 hover:text-red-100 transition">{isLoading ? "Loading..." : "End Interview"}</button>
                            :
                            <button onClick={() => dispatch(interviewStartPost())} className="border px-3 py-1 rounded hover:bg-indigo-600/35 hover:text-indigo-200 transition">{isLoading ? "Loading..." : "Start Interview"}</button>
                        }
                    </div>
                </div>
                <div className="transcripts w-[29%] bg-indigo-900 h-[600px] rounded-md p-3">
                    <div className="p-2 h-[55%] bg-indigo-950/40 overflow-x-scroll flex flex-col gap-2">
                        {data.conversation &&
                            data.conversation.slice(1).map((item: conversationItem, i:any) => (
                                item.role === "assistant" ?
                                    <div key={i} className="p-2 bg-indigo-950 rounded-md">
                                        <div className="bg-red-900 w-[30px] h-[30px] font-semibold flex justify-center items-center rounded-full text-lg border-2">
                                            J
                                        </div>
                                        <p className="mt-3 bg-transparent text-justify">
                                            {item.content}
                                        </p>
                                    </div>
                                    :
                                    <div key={i} className="p-2 bg-indigo-950 rounded-md">
                                        <div className="bg-transparent flex justify-end">
                                            <div className="bg-green-700 font-semibold w-[30px] h-[30px] flex justify-center items-center rounded-full text-lg border-2">
                                                U
                                            </div>
                                        </div>
                                        <p className="mt-3 bg-transparent text-justify">
                                            {item.content}
                                        </p>
                                    </div>
                            ))

                        }
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
                        <textarea onChange={(e) => setTextAreaData(e.target.value)} value={textAreaData} placeholder="" name="answer" cols={42} rows={7} className="rounded font-semibold bg-indigo-950/40" />
                    </div>
                </div>
            </div>
        </div>
    )
}
