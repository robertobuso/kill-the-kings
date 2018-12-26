import React, { Component } from 'react';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'

import { DragDropContext } from 'react-dnd'
import './App.css';

import { originalDeck, kings } from './Constants/CardObjects.js'
import { shuffle, isNewCardHigher, isNewCardSameColorDifferentSuit, isItThreeInARow, isItFourInARow, isItFiveInARow } from './Adapters/'

import KingPile from './Components/KingPile.js'
import TalonPile from './Components/TalonPile.js'
import ReservePile from './Components/ReservePile.js'


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
        reserve1: [],
        reserve2: [],
        reserve3: [],
        reserve4: [],
        reserve5: [],
        reserve6: [],
        reserve7: [],
        sourceClick: {},
        targetClick: {},
        talonBorder: '',
        kingKilled: false,
        currentPile: '',
        idArray: ['reserve1', 'reserve2', 'reserve3','reserve4', 'blank', 'club', 'diamond', 'spade', 'heart']
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

  handleKingDrop(props) {
    const category = this.state.currentGame[this.state.currentGame.targetClick]

    if (this.state.currentGame.targetClick.charAt(0) === 'r') {
      return this.handleReserveDrop()
    }

    if (this.state.currentGame.sourceClick.id === 'green_two') {
      alert('You must select a card first.')
    } else if (isNewCardHigher(this.state.currentGame.sourceClick, category[category.length-1])) {
         return alert('You can only play a card lower in value than the last card on this pile.')
    } else if (isNewCardSameColorDifferentSuit(this.state.currentGame.sourceClick, category[category.length-1])) {
      return alert('You cannot play a card of the same color but different suit than the last card on this pile.')
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

  handleReserveDrop() {
    const category = this.state.currentGame[this.state.currentGame.targetClick]

    if (this.state.currentGame[this.state.currentGame.targetClick].length > 0) { alert('This reserve pile is full.')}
    else {
      this.setState(
        {currentGame:
          { ...this.state.currentGame,
            [this.state.currentGame.targetClick]: category.concat(this.state.currentGame.sourceClick),
            talon: {},
            sourceClick: {},
            targetClick: {}
          }
        }
      )
    }
  }

  handleKingDropFromReserve = (props) => {
    const category = this.state.currentGame[this.state.currentGame.targetClick]

    if (isNewCardHigher(this.state.currentGame.sourceClick, category[category.length-1])) {
      return alert('You can only play a card lower in value than the last card on this pile.')
    } else if (isNewCardSameColorDifferentSuit(this.state.currentGame.sourceClick, category[category.length-1])) {
      return alert('You cannot play a card of the same color but different suit than the last card on this pile.')
    } else {
      this.setState(
        {currentGame:
          { ...this.state.currentGame,
            [this.state.currentGame.targetClick]: category.concat(this.state.currentGame.sourceClick),
            sourceClick: {},
            targetClick: {},
            [props.id]: []
          }
        }, () => this.checkKillKing(category)
      )
    }
  }

  checkKillKing = (category) => {
    const currentPile = this.state.currentGame[category[0]['suit']]
    const pileLength = currentPile.length

    if (pileLength < 4 ) {
      return
    } else if (pileLength > 5) {
        if (isItThreeInARow(currentPile.slice(-3))) {
          this.theKingIsDead(category[0]['suit'])
        } else if (isItFourInARow(currentPile.slice(-4))) {
        alert('You killed a king with four in a row of descending value and the same suit!')
        } else if (isItFiveInARow(currentPile.slice(-5))) {
          alert('You killed a king with five in a row of descending value and alternating color suits!')
        }
      }
      else if (pileLength === 5) {
        if (isItThreeInARow(currentPile.slice(-3))) {
          this.setState( {
            currentGame:
              { ...this.state.currentGame,
                kingKilled: true,
                currentPile: category[0]['suit']}
            })
        } else if (isItFourInARow(currentPile.slice(-4))) {
        alert('You killed a king with four in a row of descending value and the same suit!')
      }
    } else if (pileLength === 4) {
        if (isItThreeInARow(currentPile.slice(-3))) {
          this.setState( {
            currentGame:
              { ...this.state.currentGame,
                kingKilled: true,
                currentPile: category[0]['suit']}
            })
        }
    }
  }

  theKingIsDead = (currentPile) => {
    this.setState( {
      currentGame:
        { ...this.state.currentGame,
          kingKilled: true,
          currentPile: currentPile}
      }, )
  }

  render() {
    return (
      <div className="background">
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
          />
          :
          id === 'blank' ?
          <div key={id} id={id}/> :
          <KingPile
            key={id}
            id={id}
            cards={this.state.currentGame[id]}
            setTarget={(card) => this.setTarget(card)}
            kingKilled= {this.state.currentGame.kingKilled}
            currentPile= {this.state.currentGame.currentPile}
          />
        }
    )
  }

            <img  id="stock" className="stock-pile"
                  src={require('./Images/Cards/logo_kk.jpg') } alt="Card Pile"
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
    )
  }
}

export default DragDropContext(MultiBackend(HTML5toTouch))(App)
