import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { interviewStartPost } from "../redux/interviewReducer/action";
import { Dispatch } from "redux";

export const InterviewRoom = () => {
    const { type, success, message, data, newQue } = useSelector((store: RootState) => {
        return {
            type: store.interviewReducer.type,
            success: store.interviewReducer.success,
            message: store.interviewReducer.message,
            data: store.interviewReducer.data,
            newQue: store.interviewReducer.newQue,
        }
    });
    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {
        // dispatch(interviewStartPost());
    }, [])
    console.log(type, success, message, data, newQue)
    return (
        <div className="mt-28">
            
        </div>
    )
}
