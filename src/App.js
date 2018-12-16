import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import './App.css';
import { originalDeck, kings } from './Constants/CardObjects.js'
import { shuffle } from './Adapters/'
import KingPile from './Components/KingPile.js'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentGame: {
        inProgress: false,
        stock: shuffle(originalDeck),
        talon: {},
        club: [kings[0], originalDeck[12], originalDeck[33]],
        diamond: [kings[1]],
        spade: [kings[2]],
        heart: [kings[3]],
        reserveOne: {},
        reserveTwo: {},
        reserveThree: {},
        reserveFour: {},
        reserveFive: {},
        reserveSix: {},
        reserveSeven: {}
      },
      history: {
        gamesPlayed: 0
      }
    }
  }

  handleTalonClick = () => {
    this.setState( { currentGame: {...this.state.currentGame, talon: this.state.currentGame.stock.shift()
    }}, () => console.log(this.state))
  }

  handleKingClick = (id) => {

  }

  render() {
    return (
      <div className="background">
        <div className="container">
            <div className="reserve-pile"/>
            <div className="reserve-pile"/>
            <div className="reserve-pile"/>
            <div className="reserve-pile"/>
            <div />
            <KingPile
              id="club"
              cards={this.state.currentGame.club}
              handleKingClick={this.handleKingClick}
            />

            <img  id="stock" className="card"
                  src={require('./Images/Cards/logo_kk.png') } alt="Card Pile"
                  onClick={this.handleTalonClick}/>
                  {this.state.currentGame.talon.src ?
            <img  id="talon" className="talon-pile"
                  src={require(`${this.state.currentGame.talon.src}`)} alt="Talon Pile"/>
                  : null }
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
