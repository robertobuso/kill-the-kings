import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd'
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import MainMenu from './Routes/MainMenu.js'
import GamePage from './Routes/GamePage.js'
import Tutorial from './Routes/Tutorial.js'
import Achievements from './Routes/Achievements.js'

class App extends Component {

  constructor() {
    super()

    this.state = {
      gamesWon: localStorage.hasOwnProperty('gamesWon') ? parseInt(localStorage.getItem('gamesWon')) : 0,
      gamesWonInARow: 0,
      gamesPlayed: localStorage.hasOwnProperty('gamesPlayed') ? parseInt(localStorage.getItem('gamesPlayed')) : 0
    }
  }

    updateGamesWon = (key) => {
      this.setState( {
        [key]: this.state[key] + 1
      }, () => localStorage.setItem(key, parseInt(this.state[key])) )
    }

    renderGamePage = () => {
      return (
      <GamePage
        updateGamesWon={this.updateGamesWon}
      />
    )
    }
  render() {
    return (
      <div>
      <Switch>
        <Route path='/' exact component={ MainMenu } />
        <Route path='/game' exact render={this.renderGamePage} />
        <Route path='/tutorial' exact component ={ Tutorial } />
        <Route path='/achievements' exact component ={ Achievements } />
      </Switch>
      </div>

    )
  }
}

export default DragDropContext(MultiBackend(HTML5toTouch))(App);
