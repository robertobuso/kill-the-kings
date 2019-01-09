import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { originalDeck, kings } from '../Constants/CardObjects.js'
import { shuffle } from '../Adapters/'

import KingPile from '../Components/KingPile.js'
import TalonPile from '../Components/TalonPile.js'
import ReservePile from '../Components/ReservePile.js'
import AppNav from '../Components/AppNav.js'
import Rules from '../Components/Rules.js'

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
    <div className="background animated fadeIn slower">
      <div className="container">
      {this.state.currentGame.idArray.map(id => {
        return id.charAt(0) === 'r' ?
        <ReservePile
          key={id}
          id={id}
          currentCard={this.state.currentGame[id][0]}
          setTarget={(card) => this.setTarget(card)}
          handleDrop={ this.handleKingDropFromReserve }
          handleTalonClick={this.handleTalonClick}
          newGame={this.state.currentGame.newGame}
          fadeIn={this.state.currentGame.fadeIn}
          newId={this.state.currentGame.currentPile}
          gameOver={this.state.currentGame.gameOver}
          talon={this.state.currentGame.talon}
          showAlert={this.handleReserveDropWithTalonCard}
        />
        :
        id === 'blank' ?
        <AppNav key={id} id={id} handleGameClick={this.startNewGame}
        handleRulesClick={this.showRules}
        gameOver={this.state.currentGame.gameOver} /> :
        <KingPile
          key={id}
          id={id}
          cards={this.state.currentGame[id]}
          setTarget={(card) => this.setTarget(card)}
          kingKilled= {this.state.currentGame.kingKilled}
          currentPile= {this.state.currentGame.currentPile}
          newGame={this.state.currentGame.newGame}
        />
      })}
        <img
          id="stock" className="stock-pile"
          src={require('../Images/Cards/logo_kk.jpg') } alt="Card Pile"
          onClick={this.handleStockClick}
        />
        {this.state.currentGame.talon.src ?
        <TalonPile
          card={this.state.currentGame.talon}
          handleTalonClick={this.handleTalonClick}
          handleDrop={ this.handleKingDrop }
          newGame={this.state.currentGame.newGame}
          gameOver={this.state.currentGame.gameOver}
          /> :
        <TalonPile
          card={{id: 'green_two'}}
          handleTalonClick={this.handleTalonClick}
          handleDrop={ this.handleKingDrop }
          newGame={this.state.currentGame.newGame}
          gameOver={this.state.currentGame.gameOver}
        />
      }
      {this.state.currentGame.showRules === true ?
        <Rules
        startNewGame={this.startNewGame}
        handleClose={this.showRules}/>
      : null
      }
    </div>
  </div>
  )
}
}

export default withRouter(Tutorial);
