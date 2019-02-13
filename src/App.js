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
      gamesPlayed: 0,
      gamesWon: 0,
      gamesWonInARow: 0,
      kingsKilled3InARow: 0,
      kingsKilled4InARow: 0,
      kingsKilled5InARow: 0,
      totalKingsKilled: 0,
      leastCardsUsedToKillKing: 52,
      reserveSpotsUsedBeforeWin: 0,
      winPercentage: 0
    }
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage()
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

    updateGamesWon = (stats) => {
      this.setState({
        gamesPlayed: this.state.gamesPlayed + 1,
        gamesWon: stats.gamesWon,
        gamesWonInARow: stats.gamesWon > this.state.gamesWonInARow ? stats.gamesWon : this.state.gamesWonInARow,
        kingsKilled3InARow: stats.kingsKilled3InARow,
        kingsKilled4InARow: stats.kingsKilled4InARow,
        kingsKilled5InARow: stats.kingsKilled5InARow,
        totalKingsKilled: stats.totalKingsKilled,
        leastCardsUsedToKillKing: stats.leastCardsUsedToKillKing < 52 ? stats.leastCardsUsedToKillKing : this.state.leastCardsUsedToKillKing,
        reserveSpotsUsedBeforeWin: stats.reserveSpotsUsedBeforeWin
      }, () => console.log(this.state))

      // {
      //   gamesWon: 0,
      //   gamesWonInARow: 0,
      //   kingsKilled3InARow: 0,
      //   kingsKilled4InARow: 0,
      //   kingsKilled5InARow: 0,
      //   totalKingsKilled: 0,
      //   leastCardsUsedToKillKing: 52,
      //   reserveSpotsUsedBeforeWin: 0
      // }

      // key === 'gamesWon' ?
      // this.setState( {
      //   [key]: this.state[key] + 1,
      //   gamesPlayed: this.state.gamesPlayed + 1
      // }, () => localStorage.setItem(key, parseInt(this.state[key])) )
      // :
      // this.setState( {
      //   [key]: this.state[key] + 1
      // }, () => localStorage.setItem(key, parseInt(this.state[key])) )
    }

    updatePercentage = () => {
      this.setState({
        winPercentage: this.state.gamesWon ? (this.state.gamesWon / this.state.gamesPlayed) * 100 : 0
      }, () => localStorage.setItem('winPercentage', parseInt(this.state.winPercentage)) )
    }


    renderGamePage = () => {
      return (
      <GamePage
        updateGamesWon={this.updateGamesWon}
      />
    )
    }

    renderAchievements= () => {
      return (
      <Achievements
        stats={this.state}
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
        <Route path='/achievements' exact render ={ this.renderAchievements } />
      </Switch>
      </div>

    )
  }
}

export default DragDropContext(MultiBackend(HTML5toTouch))(App);
