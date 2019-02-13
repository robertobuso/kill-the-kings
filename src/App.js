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
      winPercentage: 0,
      threeInARowPercentage: 0,
      fourInARowPercentage: 0,
      fiveInARowPercentage: 0
    }
  }

  componentDidMount() {
    this.setState(  JSON.parse(localStorage.getItem('state')))
  }

    updateAchievements = (stats) => {
      this.setState({
        gamesPlayed: this.state.gamesPlayed + 1,
        gamesWon: stats.gamesWon,
        gamesWonInARow: stats.gamesWon > this.state.gamesWonInARow ? stats.gamesWon : this.state.gamesWonInARow,
        kingsKilled3InARow: this.state.kingsKilled3InARow + stats.kingsKilled3InARow,
        kingsKilled4InARow: this.state.kingsKilled4InARow + stats.kingsKilled4InARow,
        kingsKilled5InARow: this.state.kingsKilled5InARow + stats.kingsKilled5InARow,
        totalKingsKilled: this.state.totalKingsKilled + stats.totalKingsKilled,
        leastCardsUsedToKillKing: stats.leastCardsUsedToKillKing < 52 ? stats.leastCardsUsedToKillKing : this.state.leastCardsUsedToKillKing,
        reserveSpotsUsedBeforeWin: stats.reserveSpotsUsedBeforeWin
      }, () => this.updatePercentages())
    }

    updatePercentages = () => {
      this.setState({
        winPercentage: this.state.gamesWon != 0 ? (this.state.gamesWon / this.state.gamesPlayed) * 100 : 0,
        threeInARowPercentage: this.state.kingsKilled3InARow != 0 ? (this.state.kingsKilled3InARow / this.state.totalKingsKilled) * 100 : 0,
        fourInARowPercentage: this.state.kingsKilled4InARow != 0 ? (this.state.kingsKilled4InARow / this.state.totalKingsKilled) * 100 : 0,
        fiveInARowPercentage: this.state.kingsKilled5InARow != 0 ? (this.state.kingsKilled5InARow / this.state.totalKingsKilled) * 100 : 0
      }, () => localStorage.setItem("state", JSON.stringify(this.state)) )
    }


    renderGamePage = () => {
      return (
      <GamePage
        updateAchievements={this.updateAchievements}
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
