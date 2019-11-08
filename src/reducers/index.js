import { combineReducers } from "redux";
import { reducer as citiesReducer, initialState as citiesInitialState } from './cities';
import { reducer as itinerariesReducer, initialState as itinerariesInitialState } from './itineraries';
import { reducer as usersReducer, initialState as usersInitialState } from './users';

export const initialState = {
    cities: citiesInitialState,
    itineraries: itinerariesInitialState,
    users: usersInitialState,
};

export const rootReducer = combineReducers({
    cities: citiesReducer,
    itineraries: itinerariesReducer,
    users: usersReducer,
});
