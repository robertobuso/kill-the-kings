import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Dimmer, Container } from 'semantic-ui-react'

import { originalDeck, kings } from '../Constants/CardObjects.js'
import { shuffle } from '../Adapters/'

import KingPile from '../Components/KingPile.js'
import TalonPile from '../Components/TalonPile.js'
import ReservePile from '../Components/ReservePile.js'
import AppNav from '../Components/AppNav.js'

class Tutorial extends Component {
  state = {
    currentGame: {
      stock: shuffle(originalDeck),
      talon: {},
      club: [kings[0]],
      diamond: [kings[1]],
      spade: [kings[2]],
      heart: [kings[3]],
      reserve1: [],
      reserve2: [],
      reserve3: [],
      reserve4: [],
      reserve5: [],
      reserve6: [],
      reserve7: [],
      sourceClick: {},
      targetClick: {},
      currentPile: '',
      idArray: ['reserve1', 'reserve2', 'reserve3','reserve4', 'blank', 'club', 'diamond', 'spade', 'heart']
    }
  }

  handleClick = () => {
    this.props.history.push('/')
  }

render() {
  return (
  <>

    <div className="background animated fadeInUp dimmed">
      <div className="container">
      {this.state.currentGame.idArray.map(id => {
        return id.charAt(0) === 'r' ?
        <ReservePile
          key={id}
          id={id}
          currentCard={this.state.currentGame[id][0]}
          talon={this.state.currentGame.talon}
        />
        :
        id === 'blank' ?
        <AppNav key={id} id={id}
        handleGameClick={this.handleClick}
        handleRulesClick={this.handleClick}
        gameOver={this.state.currentGame.gameOver} /> :
        <KingPile
          key={id}
          id={id}
          cards={this.state.currentGame[id]}
          currentPile= {this.state.currentGame.currentPile}
          newGame={this.state.currentGame.newGame}
        />
      })}
        <img
          id="stock" className="stock-pile"
          src={require('../Images/Cards/logo_kk.jpg') } alt="Card Pile"
        />
        {this.state.currentGame.talon.src ?
        <TalonPile
          card={this.state.currentGame.talon}
          /> :
        <TalonPile
          card={{id: 'green_two'}}
        />
      }
    </div>
  </div>
  </>
  )
}
}

export default withRouter(Tutorial);
