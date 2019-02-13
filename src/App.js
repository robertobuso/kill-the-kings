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
        gamesPlayed: 0,
        winPercentage: '0%',
        currentKingsKilled3InARow: 0,
        currentKingsKilled4InARow: 0,
        currentKingsKilled5InARow: 0,
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
        renegade: 'Not Achieved',
        revolutionary: 'Not Achieved',
        threvolution: 'Not Achieved',
        sevenUp: 'Not Achieved',
        bastilleMyHeart: 'Not Achieved',
        tripleNinja: 'Not Achieved',
        suitedUp: 'Not Achieved',
        rainbowRebel: 'Not Achieved',
        cleanKill: 'Not Achieved',
        patience: 'Not Achieved',
        showOfForce: 'Not Achieved',
        farFarBetter:'Not Achieved',
        rabbleRouse: 'Not Achieved',
        voiceOfThePeople: 'Not Achieved'
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
        maximumCardsToKillKing: stats.maximumCardsToKillKing > this.state.maximumCardsToKillKing ? stats.maximumCardsToKillKing : this.state.maximumCardsToKillKing,
        reserveSpotsUsedBeforeWin: stats.reserveSpotsUsedBeforeWin,
        currentKingsKilled3InARow: stats.kingsKilled3InARow,
        currentKingsKilled4InARow: stats.kingsKilled4InARow,
        currentKingsKilled5InARow: stats.kingsKilled5InARow,
      }, () => this.updatePercentages())
    }

    updatePercentages = () => {
      this.setState({
        winPercentage: this.state.gamesWon !== '0%' ? parseInt((parseInt(this.state.gamesWon) / parseInt(this.state.gamesPlayed)) * 100) + '%' : 0,
        threeInARowPercentage: this.state.kingsKilled3InARow !== '0%' ? parseInt((parseInt(this.state.kingsKilled3InARow) / parseInt(this.state.totalKingsKilled)) * 100) + '%' : 0,
        fourInARowPercentage: this.state.kingsKilled3InARow !== '0%' ? parseInt((parseInt(this.state.kingsKilled4InARow) / parseInt(this.state.totalKingsKilled)) * 100) + '%' : 0,
        fiveInARowPercentage: this.state.kingsKilled3InARow !== '0%' ? parseInt((parseInt(this.state.kingsKilled5InARow) / parseInt(this.state.totalKingsKilled)) * 100) + '%' : 0,
        averageKingsKilled: this.state.totalKingsKilled !== 0 ? (this.state.totalKingsKilled / this.state.gamesPlayed) : 0,
        renegade: this.state.gamesWon > 0 ? 'Achieved' : 'Not Achieved',
        revolutionary: this.state.gamesWon >= 5 ? 'Achieved' : 'Not Achieved',
        threvolution: this.state.totalWinStreak >= 3 ? 'Achieved' : 'Not Achieved',
        sevenUp: this.state.totalWinStreak >= 7 ? 'Achieved' : 'Not Achieved',
        bastilleMyHeart: this.state.gamesWon >= 14 ? 'Achieved' : 'Not Achieved',
        tripleNinja: this.state.currentKingsKilled3InARow === 4 ? 'Achieved' : 'Not Achieved',
        suitedUp: this.state.currentKingsKilled4InARow === 4 ? 'Achieved' : 'Not Achieved',
        rainbowRebel: this.state.currentKingsKilled5InARow === 4 ? 'Achieved' : 'Not Achieved',
        patience: this.state.maximumCardsToKillKing >= 14 ?
        'Achieved' : 'Not Achieved'
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
