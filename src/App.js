import React, { Component } from 'react';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'

import { DragDropContext } from 'react-dnd'
import './App.css';

import { originalDeck, kings } from './Constants/CardObjects.js'
import { shuffle, isNewCardHigher, isItThreeInARow, isItFourInARow } from './Adapters/'

import KingPile from './Components/KingPile.js'
import TalonPile from './Components/TalonPile.js'


class App extends Component {
  constructor(props) {
    super(props)
    this.handleKingDrop = this.handleKingDrop.bind(this)

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
        talonBorder: ''
      },
      history: {
        gamesPlayed: 0
      }
    }
  }

  handleStockClick = () => {
    if (!this.state.currentGame.talon.src) {
      this.setState( { currentGame: {...this.state.currentGame, talon: this.state.currentGame.stock.shift()
      }})
    } else {
      alert("You must play the current card first.")
    }
  }

  handleTalonClick = (talonCard) => {
      this.setState(
                      { currentGame:
                        { ...this.state.currentGame,
                        sourceClick: talonCard,
                        talonBorder: 'red'
                        }
                      }
                    )
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

  handleKingDrop() {
    const category = this.state.currentGame[this.state.currentGame.targetClick]

    if (this.state.currentGame.sourceClick.id === 'green_two') {
      alert('You must select a card first.')
    } else if (isNewCardHigher(this.state.currentGame.sourceClick, category[category.length-1])) {
         return alert('You can only play a card lower in value than the last card on this pile.')
    } else {
      this.setState(
        {currentGame:
          { ...this.state.currentGame,
            [this.state.currentGame.targetClick]: category.concat(this.state.currentGame.sourceClick),
            talon: {},
            sourceClick: {},
            targetClick: {}
          }
        }, () => this.checkKillKing(category)
      )
    }
  }

  checkKillKing = (category) => {
    const currentPile = this.state.currentGame[category[0]['suit']]
    const pileLength = currentPile.length

    console.log("The current pile is: ", currentPile)
    console.log("pile length is: ", pileLength)

    if (pileLength < 4 ) {
      console.log('We need at least three cards after King.')
      return
    } else if (pileLength >= 5) {
        if (isItThreeInARow(currentPile.slice(-3))) {
          console.log('You killed a king with three in a row of the same value!')
        } else if (isItFourInARow(currentPile.slice(-4))) {
        console.log('You killed a king with four in a row of descending value and the same suit!')
        } else { console.log("FISH!")}
    } else if (pileLength === 4) {
        if (isItThreeInARow(currentPile.slice(-3))) {
          console.log('You killed a king with three in a row of the same value!')
        }
    }
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
              setTarget={(card) => this.setTarget(card)}
            />
            <KingPile
              id="diamond"
              cards={this.state.currentGame.diamond}
              setTarget={(card) => this.setTarget(card)}
            />
            <KingPile
              id="spade"
              cards={this.state.currentGame.spade}
              setTarget={(card) => this.setTarget(card)}
            />
            <KingPile
              id="heart"
              cards={this.state.currentGame.heart}
              setTarget={(card) => this.setTarget(card)}
            />

            <img  id="stock" className="stock-pile"
                  src={require('./Images/Cards/bc.jpg') } alt="Card Pile"
                  onClick={this.handleStockClick}/>

            {this.state.currentGame.talon.src ?
            <TalonPile
              card={this.state.currentGame.talon}
              handleTalonClick={this.handleTalonClick}
              handleDrop={ this.handleKingDrop }
              /> :
            <TalonPile
              card={{id: 'green_two'}}
              handleTalonClick={this.handleTalonClick}
              handleDrop={ this.handleKingDrop }
            />
            }

        </div>
      </div>
    );
  }
}

export default DragDropContext(MultiBackend(HTML5toTouch))(App)
