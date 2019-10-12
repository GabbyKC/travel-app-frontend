import { combineReducers } from "redux";
import { reducer as citiesReducer, initialState as citiesInitialState } from './cities';


export const initialState = {
    cities: citiesInitialState,
};

export const rootReducer = combineReducers({
    cities: citiesReducer,
});
