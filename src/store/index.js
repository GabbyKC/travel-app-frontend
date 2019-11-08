import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from "redux-thunk";

import { rootReducer, initialState } from "../reducers";

const middlewareEnhancer = applyMiddleware(thunk);
const composedEnhancers = composeWithDevTools(middlewareEnhancer);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;