import { CHANGE_INTTERVIEW_TYPE, INTERVIEW_FAILIURE, INTERVIEW_REQUEST, INTERVIEW_START_POST_REQUEST } from "../actionType"

interface state {
    isLoading?: boolean,
    isError?: boolean,
    data?: [],
    newQue?: String,
    success?: boolean,
    type: String,
    message?: String
}
const initialState: state = {
    isLoading: false,
    isError: false,
    data: [],
    newQue: "",
    success: false,
    type: "",
    message: ""
}

export const reducer = (state: state = initialState, action: { type: string; payload: any }) => {
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
                success:payload.success,
                message:payload.message,
                data:payload.data,
                newQue:payload.newQue
            }
        }
        case CHANGE_INTTERVIEW_TYPE: {
            return { ...state, type: payload }
        }
        default:
            return state
    }
}