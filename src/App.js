import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
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

export default DragDropContext(HTML5Backend)(App)
