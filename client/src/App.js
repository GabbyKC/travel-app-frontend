import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from './screen/Landing';
import Cities from './screen/Cities';
import Itineraries from "./screen/Itineraries";
import Login from './components/Login/Login';
import CreateAccount from "./components/CreateAccount/CreateAccount";

import './App.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/cities' component={Cities} />
            <Route exact path='/cities/:cityId/itineraries' component={Itineraries} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/create' component={CreateAccount} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
