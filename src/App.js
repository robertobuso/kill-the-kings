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

    this.handleKingClick = this.handleKingClick.bind(this)

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
        reserveSeven: {},
        sourceClick: {},
        targetClick: {},
        talonBorder: 'red'
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

  handleKingClick() {
    const category = this.state.currentGame[this.state.currentGame.targetClick];
    if (this.state.currentGame.sourceClick.id === 'green_two') {
      alert('You must select a card first.')
    } else {
      this.setState(
        {currentGame:
          { ...this.state.currentGame,
            [this.state.currentGame.targetClick]: category.concat(this.state.currentGame.sourceClick),
            talon: {},
            sourceClick: {},
            targetClick: {},
            talonBorder: 'red'
          }
        }
      )
    }
  }

  setTarget= (card) => {
    this.setState(
      {currentGame:
        { ...this.state.currentGame,
          targetClick: card.id
        }
      }
    )
  }

  handleTalonClick = (talonCard) => {
    this.setState(
                    { currentGame:
                      { ...this.state.currentGame,
                      sourceClick: talonCard,
                      talonBorder: 'yellow'
                      }
                    }
                  )
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
              setTarget={(card) => this.setTarget(card)}
            />
            <KingPile
              id="diamond"
              cards={this.state.currentGame.diamond}
              handleKingClick={this.handleKingClick}
              setTarget={(card) => this.setTarget(card)}
            />
            <KingPile
              id="spade"
              cards={this.state.currentGame.spade}
              handleKingClick={this.handleKingClick}
              setTarget={(card) => this.setTarget(card)}
            />
            <KingPile
              id="heart"
              cards={this.state.currentGame.heart}
              handleKingClick={this.handleKingClick}
              setTarget={(card) => this.setTarget(card)}
            />

            <img  id="stock" className="stock-pile"
                  src={require('./Images/Cards/bc.jpg') } alt="Card Pile"
                  onClick={this.handleStockClick}/>

            {this.state.currentGame.talon.src ?
            <TalonPile
              card={this.state.currentGame.talon}
              handleTalonClick={this.handleTalonClick}
              talonBorder={this.state.currentGame.talonBorder}
              handleDrop={ this.handleKingClick }
              /> :
            <TalonPile
              card={{id: 'green_two'}}
              handleTalonClick={this.handleTalonClick}
              talonBorder={this.state.currentGame.talonBorder}
              handleDrop={ this.handleKingClick }
            />
            }

        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App)
