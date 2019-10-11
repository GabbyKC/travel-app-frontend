import { combineReducers } from "redux";
import { reducer as citiesReducer } from './cities';

export const initialState = {};

export const rootReducer = combineReducers({ citiesReducer });
