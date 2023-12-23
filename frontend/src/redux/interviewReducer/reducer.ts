import { CHANGE_INTTERVIEW_TYPE, INTERVIEW_END_POST_REQUEST, INTERVIEW_FAILIURE, INTERVIEW_GET_DATA_REQUEST, INTERVIEW_REQUEST, INTERVIEW_START_POST_REQUEST, INTERVIEW_UPDATE_PATCH_REQUEST } from "../actionType"

interface InterviewState {
    isLoading: boolean;
    isError: boolean;
    message: any;
    id: any;
    newQue: any;
    data?: [] | undefined;
    success?: boolean | undefined;
    type: string;
  }
const initialState: InterviewState = {
    id:"",
    isLoading: false,
    isError: false,
    data: [],
    newQue: "",
    success: false,
    type: "",
    message: ""
}

export const reducer = (state = initialState, action: { type: string; payload: any }) => {
    const { type, payload } = action;
    switch (type) {
        case INTERVIEW_REQUEST: {
            return { ...state, isLoading: true }
        }
        case INTERVIEW_FAILIURE: {
            return { ...state, isLoading: false, isError: true }
        }
        case INTERVIEW_START_POST_REQUEST: {
            return {
                ...state, isLoading: false, isError: false,
                message:payload.message,
                id:payload.data._id,
                newQue:payload.newQue
            }
        }
        case INTERVIEW_UPDATE_PATCH_REQUEST: {
            return {
                ...state, isLoading: false, isError: false,
                success:payload.success,
                data:payload.data,
                id:payload.data._id,
                newQue:payload.newQue
            }
        }
        case INTERVIEW_GET_DATA_REQUEST: {
            return {
                ...state, isLoading: false, isError: false,
                success:payload.success,
                message:payload.message,
                data:payload.data,
                id:payload.data._id
            }
        }
        case INTERVIEW_END_POST_REQUEST: {
            return {
                ...state, isLoading: false, isError: false,
                success:payload.success,
                data:payload.data,
            }
        }
        case CHANGE_INTTERVIEW_TYPE: {
            return { ...state, type: payload }
        }
        default:
            return state
    }
}