import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Landing from './screen/Landing';
import Cities from './screen/Cities';
import Itineraries from "./screen/Itineraries";
import Login from './components/Login/Login';
import CreateAccount from "./components/CreateAccount/CreateAccount";
import Favorites from "./components/Favorites/Favorites";
import './App.css';
import {attemptUserLogin, logUserOut} from "./actions";
import {connect} from "react-redux";
import jwtDecode from 'jwt-decode';

class App extends Component {

    componentDidMount() {
        const token = window.localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);
            const now = Math.floor(Date.now() / 1000);

            if (decodedToken.exp < now) {
                console.log('Token has expired. Logging user out!');
                this.props.logUserOut();
            } else {
                console.log('Found valid Token. Logging user in!');
                this.props.attemptUserLogin(token);
            }
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route exact path='/' component={Landing}/>
                        <Route exact path='/cities' component={Cities}/>
                        <Route exact path='/cities/:cityId/itineraries' component={Itineraries}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/create' component={CreateAccount}/>
                        <Route exact path='/favorites' component={Favorites}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    attemptUserLogin: (token) => dispatch(attemptUserLogin(token)),
    logUserOut: () => dispatch(logUserOut()),
});

export default connect(null, mapDispatchToProps)(App);
