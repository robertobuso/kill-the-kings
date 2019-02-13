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
        gamesWon: 0,
        winPercentage: '0%',
        kingsKilled3InARow: 0,
        kingsKilled4InARow: 0,
        kingsKilled5InARow: 0,
        threeInARowPercentage: '0%',
        fourInARowPercentage: '0%',
        fiveInARowPercentage: '0%',
        currentWinStreak: 0,
        totalWinStreak: 0,
        averageKingsKilled: 0,
        totalKingsKilled: 0,
        maximumCardsToKillKing: 0,
        fewestReservesToWin: 0,
        renegade: false,
        revolutionary: false,
        threvolution: false,
        sevenUp: false,
        bastilleMyHeart: false,
        tripleNinja: false,
        suitedUp: false,
        rainbowRebel: false,
        cleanKill: false,
        patience: false,
        showOfForce: false,
        farFarBetter:false,
        rabbleRouse: false,
        voiceOfThePeople: false
    }
  }

  componentDidMount() {
    this.setState(  JSON.parse(localStorage.getItem('state')) )
  }

    updateAchievements = (stats) => {
      this.setState({
        gamesPlayed: this.state.gamesPlayed + 1,
        gamesWon: this.state.gamesWon + stats.gamesWon,
        currentWinStreak: stats.currentWinStreak,
        totalWinStreak: stats.currentWinStreak > this.state.totalWinStreak ? stats.currentWinStreak : this.state.totalWinStreak,
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
        winPercentage: this.state.gamesWon !== '0%' ? parseInt((parseInt(this.state.gamesWon) / parseInt(this.state.gamesPlayed)) * 100) + '%' : 0,
        threeInARowPercentage: this.state.kingsKilled3InARow !== '0%' ? parseInt((parseInt(this.state.kingsKilled3InARow) / parseInt(this.state.totalKingsKilled)) * 100) + '%' : 0,
        fourInARowPercentage: this.state.kingsKilled3InARow !== '0%' ? parseInt((parseInt(this.state.kingsKilled4InARow) / parseInt(this.state.totalKingsKilled)) * 100) + '%' : 0,
        fiveInARowPercentage: this.state.kingsKilled3InARow !== '0%' ? parseInt((parseInt(this.state.kingsKilled5InARow) / parseInt(this.state.totalKingsKilled)) * 100) + '%' : 0,
        averageKingsKilled: this.state.totalKingsKilled !== 0 ? (this.state.averageKingsKilled / this.state.gamesPlayed) * 100 : 0
      }, () => localStorage.setItem("state", JSON.stringify(this.state)) )
    }

    kingsKilledPercentage = () => {

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
