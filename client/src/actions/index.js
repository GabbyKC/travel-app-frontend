import {
    FETCH_CITIES_SUCCESS,
    FETCH_CITIES_REQUEST,
    FETCH_CITIES_FAILURE,
    FETCH_ITINERARIES_SUCCESS,
    FETCH_ITINERARIES_REQUEST,
    FETCH_ITINERARIES_FAILURE,
    CREATE_USER_FAILURE,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER_REQUEST,
    FETCH_USER_DATA_SUCCESS,
    FETCH_USER_DATA_FAILURE,
    FAVORITE_ITINERARY_FAILURE,
    FAVORITE_ITINERARY_SUCCESS
} from '../constants/action-types';
import jwtDecode from 'jwt-decode';

export function getCities() {
    return function (dispatch) {
        dispatch({type: FETCH_CITIES_REQUEST});

        return fetch('http://192.168.0.110:5000/cities')
            .then(response => response.json())
            .then(json => {
                dispatch({type: FETCH_CITIES_SUCCESS, payload: json});
            })
            .catch(e => dispatch({type: FETCH_CITIES_FAILURE}));

    };
}

export function getItineraries(cityId) {
    return function (dispatch) {
        dispatch({type: FETCH_ITINERARIES_REQUEST});

        return fetch(`http://192.168.0.110:5000/cities/${cityId}/itineraries`)
            .then(response => response.json())
            .then(json => {
                dispatch({type: FETCH_ITINERARIES_SUCCESS, payload: json});
            })
            .catch(e => dispatch({type: FETCH_ITINERARIES_FAILURE}))
    };
}

export function createAccount(data) {
    return function (dispatch) {
        dispatch({type: CREATE_USER_REQUEST});

        return fetch('http://192.168.0.110:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                if (json.errors) {
                    dispatch({type: CREATE_USER_FAILURE, payload: json.errors})
                } else {
                    dispatch({type: CREATE_USER_SUCCESS, payload: json});
                }
            })
            .catch(e => dispatch({type: CREATE_USER_FAILURE}));
    };
}

export function logUserIn(data) {
    return function (dispatch) {
        dispatch({type: LOGIN_USER_REQUEST});

        return fetch('http://192.168.0.110:5000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                if (json.errors) {
                    dispatch({type: LOGIN_USER_FAILURE, payload: json.errors})
                } else {
                    const jwtToken = json.token;
                    const username = jwtDecode(jwtToken).name;

                    dispatch({type: LOGIN_USER_SUCCESS, payload: {token: jwtToken, username: username}});
                    dispatch(fetchUserData(jwtToken));
                }
            })
            .catch(e => dispatch({type: LOGIN_USER_FAILURE}));
    };
}

export function logUserOut() {
    return function (dispatch) {
        dispatch({type: LOGOUT_USER_REQUEST});
    }
}

function fetchUserData(token) {
    return function (dispatch) {
        return fetch('http://192.168.0.110:5000/users', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json.errors) {
                    dispatch({type: FETCH_USER_DATA_FAILURE, payload: json.errors})
                } else {
                    dispatch({type: FETCH_USER_DATA_SUCCESS, payload: json});
                }
            })
            .catch(e => dispatch({type: FETCH_USER_DATA_FAILURE}));
    }
}

export function favoriteItinerary(initeraryId, token) {
    return function (dispatch) {
        return fetch(`http://192.168.0.110:5000/users/favoriteItineraries/${initeraryId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json.errors) {
                    dispatch({type: FAVORITE_ITINERARY_FAILURE, payload: json.errors})
                } else {
                    dispatch({type: FAVORITE_ITINERARY_SUCCESS, payload: json});
                }
            })
            .catch(e => dispatch({type: FAVORITE_ITINERARY_FAILURE}));
    }
}