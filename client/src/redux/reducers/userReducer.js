import {
    FETCH_LOGIN_ERROR,
    FETCH_LOGIN_REQUEST,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGOUT,
   
} from "../constants/userConstant"

const initialState = {
    requesting: false,
    success: false,
    message: '',
    data: {}
}

function userReducer(state = initialState, payload){
    switch (payload.type) {
        case FETCH_LOGIN_REQUEST:
            return{
                ...state,
                requesting: true,
            }
        case FETCH_LOGIN_SUCCESS:
            return{
                ...state,
                requesting: false,
                success: true,
                message: "",
                data: payload.data
            } 
        case FETCH_LOGIN_ERROR:
            return{
                ...state,
                requesting: false,
                success: false,
                message: payload.data
            }
        case FETCH_LOGOUT:
            return{
                ...state,
                requesting: false,
                success: false,
                message: "",
                data: {}
            
            }    
        default:
            return state
    }
}

export default userReducer