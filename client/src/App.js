import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Landing from './screen/Landing';
import Cities from './screen/Cities';

import './App.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/cities' component={Cities} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
