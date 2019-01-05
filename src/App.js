import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend'

import { DragDropContext } from 'react-dnd'
import './App.css';

import { originalDeck, kings } from './Constants/CardObjects.js'
import { shuffle, isNewCardHigher, isNewCardSameColorDifferentSuit, isItThreeInARow, isItFourInARow, isItFiveInARow, didYouLose } from './Adapters/'

import KingPile from './Components/KingPile.js'
import TalonPile from './Components/TalonPile.js'
import ReservePile from './Components/ReservePile.js'
import WinModal from './Components/WinModal.js'
import Alert from './Components/Alert.js'
import AppNav from './Components/AppNav.js'
import Rules from './Components/Rules.js'


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
        kingKilled: false,
        currentPile: '',
        idArray: ['reserve1', 'reserve2', 'reserve3','reserve4', 'blank', 'club', 'diamond', 'spade', 'heart'],
        newReserveId: 4,
        fadeIn: false,
        gameOver: '',
        newGame: true,
        alertStatus: false,
        alertKind: '',
        showRules: false
      },
      history: {
        gamesPlayed: 0
      }
    }
  }

  handleStockClick = () => {
    if (!this.state.currentGame.talon.src) {
      this.setState( { currentGame: {...this.state.currentGame,
        talon: this.state.currentGame.stock.shift()
      }}, () => this.isItANewGame() )
    } else {
      this.setState(
                      { currentGame:
                        { ...this.state.currentGame,
                        alertStatus: true,
                        alertKind: 'talon'
                        }
                      }
                    )
    }
  }

  handleTalonClick = (talonCard) => {
      this.setState(
                      { currentGame:
                        { ...this.state.currentGame,
                        sourceClick: talonCard
                        }
                      }, () => didYouLose(this.state.currentGame) ?
                      this.setState( {
                        currentGame:
                          { ...this.state.currentGame,
                            gameOver: 'lose'
                          }
                        }
                      ) : null
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
      this.setState(
                      { currentGame:
                        { ...this.state.currentGame,
                        alertStatus: true,
                        alertKind: 'selectCard'
                        }
                      }
                    )
    } else if (isNewCardHigher(this.state.currentGame.sourceClick, category[category.length-1])) {
      this.setState(
                      { currentGame:
                        { ...this.state.currentGame,
                        alertStatus: true,
                        alertKind: 'cardIsHigher'
                        }
                      }
                    )
    } else if (isNewCardSameColorDifferentSuit(this.state.currentGame.sourceClick, category[category.length-1])) {
      this.setState(
                      { currentGame:
                        { ...this.state.currentGame,
                        alertStatus: true,
                        alertKind: 'sameColorDifferentSuit'
                        }
                      }
                    )
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
    if (this.state.currentGame[this.state.currentGame.targetClick].length > 0) {
      this.setState(
                      { currentGame:
                        { ...this.state.currentGame,
                        alertStatus: true,
                        alertKind: 'fullReserve'
                        }
                      }
                    )}
    else if (this.state.currentGame.sourceClick.id === 'green_two') {
        this.setState(
                        { currentGame:
                          { ...this.state.currentGame,
                          alertStatus: true,
                          alertKind: 'selectCard'
                          }
                        }
                      )
      } else {
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
    if (this.state.currentGame.targetClick.charAt(0) === 'r' ){
      return
    } else if (isNewCardHigher(this.state.currentGame.sourceClick, category[category.length-1])) {
      this.setState(
                      { currentGame:
                        { ...this.state.currentGame,
                        alertStatus: true,
                        alertKind: 'cardIsHigher'
                        }
                      }
                    )
    } else if (isNewCardSameColorDifferentSuit(this.state.currentGame.sourceClick, category[category.length-1])) {
      this.setState(
                      { currentGame:
                        { ...this.state.currentGame,
                        alertStatus: true,
                        alertKind: 'sameColorDifferentSuit'
                        }
                      }
                    )
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
          this.theKingIsDead(currentPile[0]['suit'])
        } else if (isItFourInARow(currentPile.slice(-4))) {
          this.theKingIsDead(currentPile[0]['suit'])
        } else if (isItFiveInARow(currentPile.slice(-5))) {
          this.theKingIsDead(currentPile[0]['suit'])
        }
      }
      else if (pileLength === 5) {
        if (isItThreeInARow(currentPile.slice(-3))) {
          this.theKingIsDead(currentPile[0]['suit'])
        } else if (isItFourInARow(currentPile.slice(-4))) {
          this.theKingIsDead(currentPile[0]['suit'])
      }
    } else if (pileLength === 4) {
        if (isItThreeInARow(currentPile.slice(-3))) {
          this.theKingIsDead(currentPile[0]['suit'])
        }
      }
    }

  theKingIsDead = (currentPile) => {
    const newId = this.state.currentGame.newReserveId + 1
    const idx = this.state.currentGame.idArray.indexOf(currentPile)
    const newIdArr = [...this.state.currentGame.idArray]
    newIdArr[idx] = `reserve${newId}`

    if (newId > 7) {
      return this.gameOver()
    } else {
    this.setState( {
      currentGame:
        { ...this.state.currentGame,
          kingKilled: true,
          currentPile: currentPile,
          newReserveId: newId
          }
        }, () => this.changeKingIntoReservePile(newIdArr, newId, newIdArr[idx]) )
    }
  }

  gameOver = () => {
    this.setState( {
      currentGame:
        { ...this.state.currentGame,
          gameOver: 'win'
        }
      }
    )
  }

  changeKingIntoReservePile = (newIdArr, newId, currentPile) => {
     setTimeout(() => this.setState( {
       currentGame:
       { ...this.state.currentGame,
        idArray: newIdArr,
        newReserveId: newId,
        kingKilled: false,
        fadeIn: true,
        currentPile: currentPile
      }}), 850)
  }

  startNewGame = () => {
    this.setState({
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
        kingKilled: false,
        currentPile: '',
        idArray: ['reserve1', 'reserve2', 'reserve3','reserve4', 'blank', 'club', 'diamond', 'spade', 'heart'],
        newReserveId: 4,
        fadeIn: false,
        gameOver: '',
        newGame: true,
        alertStatus: false,
        alertKind: '',
        showRules: false
      },
      history: {
        gamesPlayed: this.state.history.gamesPlayed + 1
      }
    })
  }

  isItANewGame = () => {
    if (this.state.currentGame.newGame === true) {
      this.setState(
                { currentGame:
                  {...this.state.currentGame,
                  newGame: false
                  }
                }
      )
    }
  }

  clearAlert = () => {
    this.setState(
            { currentGame:
              {...this.state.currentGame,
              alertStatus: false,
              alertKind: ''
              }
            }
    )
  }

  showRules = (arg) => {
    this.setState(
            { currentGame:
              {...this.state.currentGame,
              showRules: arg
              }
            }
    )
  }

  render() {
    return (
      <div className="background">
        <div className="container">
        {this.state.currentGame.alertStatus === true ?
          <Alert alertStatus={this.state.currentGame.alertStatus}
          alertKind={this.state.currentGame.alertKind}
          clearAlert={this.clearAlert} />
        : null}
        {this.state.currentGame.idArray.map(id => {
          return id.charAt(0) === 'r' ?
          <ReservePile
            key={id}
            id={id}
            currentCard={this.state.currentGame[id][0]}
            setTarget={(card) => this.setTarget(card)}
            handleDrop={ this.handleKingDropFromReserve }
            handleTalonClick={this.handleTalonClick}
            status={this.state.currentGame.newGame}
            fadeIn={this.state.currentGame.fadeIn}
            newId={this.state.currentGame.currentPile}
          />
          :
          id === 'blank' ?
          <AppNav key={id} id={id} handleGameClick={this.startNewGame}
          handleRulesClick={this.showRules} /> :
          <KingPile
            key={id}
            id={id}
            cards={this.state.currentGame[id]}
            setTarget={(card) => this.setTarget(card)}
            kingKilled= {this.state.currentGame.kingKilled}
            currentPile= {this.state.currentGame.currentPile}
            status={this.state.currentGame.newGame}
          />
        })}
          <img
            id="stock" className="stock-pile"
            src={require('./Images/Cards/logo_kk.jpg') } alt="Card Pile"
            onClick={this.handleStockClick}
          />
          {this.state.currentGame.talon.src ?
          <TalonPile
            card={this.state.currentGame.talon}
            handleTalonClick={this.handleTalonClick}
            handleDrop={ this.handleKingDrop }
            status={this.state.currentGame.newGame}
            /> :
          <TalonPile
            card={{id: 'green_two'}}
            handleTalonClick={this.handleTalonClick}
            handleDrop={ this.handleKingDrop }
            status={this.state.currentGame.newGame}
          />
        }
        {this.state.currentGame.gameOver !== '' ?
          <WinModal status={this.state.currentGame.gameOver}
          startNewGame={this.startNewGame}/>
        : null
        }
        {this.state.currentGame.showRules === true ?
          <Rules status={this.state.currentGame.gameOver}
          startNewGame={this.startNewGame}
          handleClose={this.showRules}/>
        : null
        }
      </div>
    </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)
