import axios from "axios";
import { INTERVIEW_FAILIURE, INTERVIEW_REQUEST, INTERVIEW_START_POST_REQUEST, INTERVIEW_UPDATE_PATCH_REQUEST } from "../actionType";

const URL = "http://localhost:4500";

export const interviewStartPost = () => async (dispatch: any) => {
    try {
        dispatch({ type: INTERVIEW_REQUEST });
        let res = await axios.post(`${URL}/interview/start`);
        dispatch({
            type: INTERVIEW_START_POST_REQUEST,
            payload: { success: res.data.success }
        });
    } catch (error) {
        dispatch({ type: INTERVIEW_FAILIURE });
        console.log(error);
    }
};

export const interviewUpdatePatch = (id: String, data: Object) => async (dispatch: any) => {
    try {
        dispatch({ type: INTERVIEW_REQUEST });
        let res = await axios.patch(`${URL}/interview/update/${id}`, data);
        dispatch({
            type: INTERVIEW_UPDATE_PATCH_REQUEST,
            payload: { success: res.data.success }
        });
    } catch (error) {
        dispatch({ type: INTERVIEW_FAILIURE });
        console.log(error);
    }
};
