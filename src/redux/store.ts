import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import homeReducer from "@/redux/reducers/home";

const rootReducer = combineReducers({ homeReducer });

export const store = createStore(rootReducer, applyMiddleware(thunk));
