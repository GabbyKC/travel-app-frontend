import { combineReducers } from "redux";
import { reducer as citiesReducer, initialState as citiesInitialState } from './cities';
import { reducer as itinerariesReducer, initialState as itinerariesInitialState } from './itineraries';

export const initialState = {
    cities: citiesInitialState,
    itineraries: itinerariesInitialState,
};

export const rootReducer = combineReducers({
    cities: citiesReducer,
    itineraries: itinerariesReducer,
});
