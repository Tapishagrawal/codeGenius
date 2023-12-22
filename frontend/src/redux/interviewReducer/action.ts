import axios from "axios";
import { INTERVIEW_FAILIURE, INTERVIEW_REQUEST, INTERVIEW_START_POST_REQUEST } from "../actionType";

const URL = "http://localhost:4500";

export const interviewStartPost = () => async (dispatch: any) => {
    try {
        dispatch({ type: INTERVIEW_REQUEST });
        let res = await axios.post(`${URL}/interview/start`);
        dispatch({
            type: INTERVIEW_START_POST_REQUEST,
            payload: { success: res.data.success, message: res.data.message, data: res.data.data, newQue: res.data.newQue }
        });
    } catch (error) {
        dispatch({ type: INTERVIEW_FAILIURE });
        console.log(error);
    }
};
