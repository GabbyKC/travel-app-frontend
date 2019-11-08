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
    FAVORITE_ITINERARY_SUCCESS,
    UNFAVORITE_ITINERARY_FAILURE,
    UNFAVORITE_ITINERARY_SUCCESS,
    SET_USER_TOKEN
} from '../constants/action-types';
import jwtDecode from 'jwt-decode';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log('BACKEND', BACKEND_URL);

export function getCities() {
    return function (dispatch) {
        dispatch({type: FETCH_CITIES_REQUEST});

        return fetch(`${BACKEND_URL}/cities`)
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

        return fetch(`${BACKEND_URL}/cities/${cityId}/itineraries`)
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

        return fetch(`${BACKEND_URL}/users`, {
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

        return fetch(`${BACKEND_URL}/users/login`, {
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

                    window.localStorage.setItem('token', jwtToken);
                    dispatch({type: LOGIN_USER_SUCCESS, payload: {token: jwtToken, username: username}});
                    dispatch(fetchUserData(jwtToken));
                }
            })
            .catch(e => dispatch({type: LOGIN_USER_FAILURE}));
    };
}

export function logUserOut() {
    return function (dispatch) {
        window.localStorage.removeItem('token');
        dispatch({type: LOGOUT_USER_REQUEST});
    }
}

function fetchUserData(token) {
    return function (dispatch) {
        return fetch(`${BACKEND_URL}/users`, {
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
        return fetch(`${BACKEND_URL}/users/favoriteItineraries/${initeraryId}`, {
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

export function unfavoriteItinerary(initeraryId, token) {
    return function (dispatch) {
        return fetch(`${BACKEND_URL}/users/favoriteItineraries/${initeraryId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json.errors) {
                    dispatch({type: UNFAVORITE_ITINERARY_FAILURE, payload: json.errors})
                } else {
                    dispatch({type: UNFAVORITE_ITINERARY_SUCCESS, payload: json});
                }
            })
            .catch(e => dispatch({type: UNFAVORITE_ITINERARY_FAILURE}));
    }
}

// used when we have a token (fetched from local storage) and want to set it in the redux store
// this will then trigger loggedInUser to be set
export function attemptUserLogin(token) {
    return function (dispatch) {
        const username = jwtDecode(token).name;

        dispatch({type: SET_USER_TOKEN, payload: {token: token, username: username}});
        dispatch(fetchUserData(token));
    }
}
