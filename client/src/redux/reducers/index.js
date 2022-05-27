import {combineReducers} from "redux"

import userReducer from "./userReducer"
import notifyReducer from "./notifyReducer"

const rootReducer = combineReducers({
    user: userReducer,
    notify: notifyReducer
})
const reducers = (state, action) => rootReducer(state, action)

export default reducers