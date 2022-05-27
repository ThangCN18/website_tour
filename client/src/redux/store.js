import {createStore} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducers from "./reducers"
 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, reducers)

const composedEnhancers  = composeWithDevTools()

export const store = createStore(persistedReducer, composedEnhancers)

export const  persistor = persistStore(store)
