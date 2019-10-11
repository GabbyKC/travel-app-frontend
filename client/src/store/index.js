import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { rootReducer, initialState } from "../reducers";

const middlewareEnhancer = applyMiddleware(thunk);
const composedEnhancers = compose(middlewareEnhancer);

const store = createStore(rootReducer, initialState, composedEnhancers);

export default store;