import {
    TURN_OFF_NOTIFY,
    TURN_ON_NOTIFY
} from "../constants/notifyConstant"

const initialState = {
    message: "",
    isNotify: false
}

function notifyReducer(state = initialState, payload) {
    switch (payload.type) {
        case TURN_ON_NOTIFY:
            return {
                message: payload.message,
                isNotify: true
            }
        case TURN_OFF_NOTIFY:
            return {
                message: "",
                isNotify: false
            }
        default:
            return state
    }
}

export default notifyReducer