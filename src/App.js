import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd'
import MultiBackend, { Preview } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import MainMenu from './Routes/MainMenu.js'
import GamePage from './Routes/GamePage.js'
import Tutorial from './Routes/Tutorial.js'

class App extends Component {

  render() {
    return (
      <div>
      <Switch>
        <Route path='/' exact component={ MainMenu } />
        <Route path='/game' exact component={ GamePage } />
        <Route path='/tutorial' exact component ={ Tutorial } />
      </Switch>
      </div>

    )
  }
}

export default DragDropContext(MultiBackend(HTML5toTouch))(App);
