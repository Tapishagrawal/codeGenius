import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { conversationItem, interviewEndPost, interviewGetData, interviewStartPost, interviewUpdatePatch } from "../redux/interviewReducer/action";
import { Dispatch } from "redux";
import { useNavigate } from "react-router-dom";
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import { FaMicrophone } from "react-icons/fa6";
import { FaMicrophoneSlash } from "react-icons/fa6";
import { SpeechRecognitionResult } from 'react-speech-kit';


export const InterviewRoom = () => {
    const [textAreaData, setTextAreaData] = useState("");
    const { speak, speaking } = useSpeechSynthesis();
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result: SpeechRecognitionResult) => {
            setTextAreaData(textAreaData + " " + result);
        },
    });
    const navigate = useNavigate()
    const { type, data, isLoading, id, message, newQue } = useSelector((store: RootState) => {
        return {
            type: store.interviewReducer.type,
            success: store.interviewReducer.success,
            message: store.interviewReducer.message,
            data: store.interviewReducer.data,
            isLoading: store.interviewReducer.isLoading,
            id: store.interviewReducer.id,
            newQue: store.interviewReducer.newQue,
        }
    });
    const dispatch = useDispatch<Dispatch<any>>();

    const handleSendAnswer = () => {
        const newConversation: conversationItem = { role: "user", content: textAreaData };
        const newdata = [...data.conversation, newConversation];
        dispatch(interviewUpdatePatch(id, newdata));
        setTextAreaData("");
    };
    const handleEndInterview = () => {
        dispatch(interviewEndPost(id, data.conversation));
        navigate("/dashboard");
    };

    useEffect(() => {
        if (id) {
            dispatch(interviewGetData(id))
        }
    }, [id])

    useEffect(() => {
        speak({ text: newQue })
    }, [newQue])

    return (
        <div className="mt-28 mx-2">
            <div className="flex justify-between items-center">
                <div className="w-[69%]">
                    <div className="mb-4 text-right bg-[#3F3F46] py-4 px-4">{type} Interview</div>
                    <div className="flex w-full justify-between">
                        <div className="relative w-[49%] flex justify-center items-center bg-[#3a3348] h-[300px] rounded-lg shadow-xl shadow-indigo-700/10">
                            {speaking &&
                                <span className="absolute flex h-24 w-24">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-40"></span>
                                </span>
                            }
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
                            <button onClick={() => dispatch(interviewStartPost(type))} className="border px-3 py-1 rounded hover:bg-indigo-600/35 hover:text-indigo-200 transition">{isLoading ? "Loading..." : "Start Interview"}</button>
                        }
                    </div>
                </div>
                <div className="transcripts w-[29%] bg-[#333b48f7] h-[600px] rounded-md p-3">
                    <div className="p-2 h-[55%] bg-[#7f7cae78] rounded overflow-x-scroll flex flex-col gap-2">
                        {data.conversation &&
                            data.conversation.slice(1).map((item: conversationItem, i: any) => (
                                item.role === "assistant" ?
                                    <div key={i} className="p-2 bg-[#10091485] rounded-md">
                                        <div className="bg-transparent flex items-center gap-3">
                                            <div className="bg-red-900 w-[30px] h-[30px] font-semibold flex justify-center items-center rounded-full text-lg border-2">
                                                J
                                            </div>
                                            <p className=" bg-transparent">John</p>
                                        </div>
                                        <p className="mt-3 bg-transparent text-justify">
                                            {item.content}
                                        </p>
                                    </div>
                                    :
                                    <div key={i} className="p-2 bg-[#2c1d3678] rounded-md">
                                        <div className="bg-transparent flex justify-end">
                                            <div className="bg-transparent flex items-center gap-3">
                                                <div className="bg-green-700 font-semibold w-[30px] h-[30px] flex justify-center items-center rounded-full text-lg border-2">
                                                    U
                                                </div>
                                                <p className="bg-transparent">User</p>
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
                        <div className="bg-transparent flex gap-2 items-center">
                            {listening ?
                                <div className="relative">
                                    <span className="flex">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-200 opacity-75"></span>
                                    </span>
                                    <span className="micOn bg-transparent text-[1.2rem]"><FaMicrophone /></span>
                                </div>
                                :
                                <span className="micOff bg-transparent text-2xl"><FaMicrophoneSlash /></span>
                            }



                            <button onClick={() => listen()} className="border px-4 py-1 rounded hover:bg-teal-600/40">Start</button>
                            <button onClick={() => stop()} className="border px-4 py-1 rounded hover:bg-red-600/40">Stop</button>
                        </div>
                        <div className="bg-transparent">
                            <button onClick={handleSendAnswer} className="border px-4 py-1 rounded hover:bg-green-600/40">Send</button>
                        </div>
                    </div>
                    <div className="bg-transparent">
                        <textarea onChange={(e) => setTextAreaData(e.target.value)} value={textAreaData} placeholder="Enter your Answer..." name="answer" cols={42} rows={7} className="rounded font-semibold bg-[#39265054]" />
                    </div>
                </div>
            </div>
        </div>
    )
}
