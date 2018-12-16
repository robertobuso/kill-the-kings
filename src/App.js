import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import './App.css';
import { originalDeck, kings } from './Constants/CardObjects.js'
import { shuffle } from './Adapters/'
import KingPile from './Components/KingPile.js'
import TalonPile from './Components/TalonPile.js'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentGame: {
        inProgress: false,
        stock: shuffle(originalDeck),
        talon: {},
        club: [kings[0]],
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

  handleStockClick = () => {
    this.setState( { currentGame: {...this.state.currentGame, talon: this.state.currentGame.stock.shift()
    }})
  }

  handleKingClick = (id) => {
    console.log(`this.state.currentGame.${id}.length`)
  }

  handleTalonClick = (talonCard) => {
    this.setState( { currentGame: { ...this.state.currentGame,
                    talon:{},
                    club: [...this.state.currentGame.club, talonCard]
                  }})
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
            <KingPile
              id="diamond"
              cards={this.state.currentGame.diamond}
              handleKingClick={this.handleKingClick}
            />
            <KingPile
              id="spade"
              cards={this.state.currentGame.spade}
              handleKingClick={this.handleKingClick}
            />
            <KingPile
              id="heart"
              cards={this.state.currentGame.heart}
              handleKingClick={this.handleKingClick}
            />

            <img  id="stock" className="card"
                  src={require('./Images/Cards/logo_kk.png') } alt="Card Pile"
                  onClick={this.handleStockClick}/>

            {this.state.currentGame.talon.src ?
            <TalonPile
              card={this.state.currentGame.talon}
              handleTalonClick={this.handleTalonClick}
              /> : null }
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
