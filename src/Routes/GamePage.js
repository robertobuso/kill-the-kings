import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd'
import MultiBackend, { Preview } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch';
import disableScroll from 'disable-scroll';

import { originalDeck, kings } from '../Constants/CardObjects.js'
import { shuffle, isNewCardHigher, isNewCardSameColorDifferentSuit, isItThreeInARow, isItFourInARow, isItFiveInARow, didYouLose } from '../Adapters/'

import KingPile from '../Components/KingPile.js'
import TalonPile from '../Components/TalonPile.js'
import ReservePile from '../Components/ReservePile.js'
import WinModal from '../Components/WinModal.js'
import Alert from '../Components/Alert.js'
import AppNav from '../Components/AppNav.js'
import Rules from '../Components/Rules.js'
import StockPile from '../Components/StockPile.js'
import Card from '../Components/Card.js'


class GamePage extends Component {
  constructor(props) {
    super(props)
    this.handleKingDrop = this.handleKingDrop.bind(this)
    this.handleReserveClick = this.handleReserveClick.bind(this)

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
      stats: {
        gamesWon: 0,
        currentWinStreak: 0,
        kingsKilled3InARow: 0,
        kingsKilled4InARow: 0,
        kingsKilled5InARow: 0,
        totalKingsKilled: 0,
        maximumCardsToKillKing: 0,
        reserveSpotsUsedBeforeWin: [],
        currentReservePilesUsed: []
      }
    }
  }

  componentDidMount() {
    if (localStorage.getItem('state')) {
    this.setState(    { stats:
        { ...this.state.stats,
        currentWinStreak: JSON.parse(localStorage.getItem('state')).currentWinStreak
        }
      } )
    }
  }

//Shows the card at a different opacity while dragging object via touch event (mobile)
  generatePreview (type, item, style) {
    Object.assign(style, { height:'80px', width: '58px'})
    const savedCard = localStorage.getItem(item.id)
    return <Card src={savedCard} previewStyle={style} class='insertedCard'/>;
  }

  handleStockClick = () => {
    if (!this.state.currentGame.talon || !this.state.currentGame.talon.src) {
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
                    }
    )
  }

    setTarget = (card) => {
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

  handleReserveClick = (card) => {
    if (card.id === 'green_two') {
      return  this.setState(
                        { currentGame:
                          { ...this.state.currentGame,
                          alertStatus: true,
                          alertKind: 'selectCard'
                          }
                        }
              )
    }

    for(let i = 0; i < this.state.currentGame.idArray.length; i++) {
    let pile = this.state.currentGame.idArray[i]
          if(pile.charAt(0) === 'r') {
            if(this.state.currentGame[pile].length === 0) {
               return this.setState(
                {currentGame:
                  { ...this.state.currentGame,
                    [pile]: [...this.state.currentGame[pile], card],
                    talon: {},
                    sourceClick: {},
                    targetClick: {}
                  }
                }, () => this.countReservePile(pile)
              )
            }
          }
        }
        return this.setState(
                          { currentGame:
                            { ...this.state.currentGame,
                            alertStatus: true,
                            alertKind: 'allReservesFull'
                            }
                          }
        )
      }

  handleReserveDropWithTalonCard = () => {
      this.setState(
                      { currentGame:
                        { ...this.state.currentGame,
                        alertStatus: true,
                        alertKind: 'talon'
                        }
                      }
                    )
  }

  handleKingDropFromReserve = (props) => {
    const category = this.state.currentGame[this.state.currentGame.targetClick]

    const newReserveArray = this.state.stats.currentReservePilesUsed.splice( this.state.stats.currentReservePilesUsed.indexOf(props.id), 1)

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
          },
          stats:
            {...this.state.stats,
              countReservePile: newReserveArray
            }
        }, () => this.checkKillKing(category)
      )
    }
  }

  checkKillKing = (category) => {
    const currentPile = this.state.currentGame[category[0]['suit']]
    const pileLength = currentPile.length
    const killCards = pileLength - 1 > this.state.stats.maximumCardsToKillKing ? pileLength - 1 : this.state.stats.maximumCardsToKillKing

    if (pileLength < 4 ) {
      return
    } else if (pileLength > 5) {
        if (isItThreeInARow(currentPile.slice(-3))) {
          this.setState({
            stats: {...this.state.stats,
                    maximumCardsToKillKing: killCards,
                    totalKingsKilled: this.state.stats.totalKingsKilled + 1,
                    kingsKilled3InARow: this.state.stats.kingsKilled3InARow + 1}
          }, () => this.theKingIsDead(currentPile[0]['suit']))
        } else if (isItFourInARow(currentPile.slice(-4))) {
          this.setState({
            stats: {...this.state.stats,
                    maximumCardsToKillKing: killCards,
                    totalKingsKilled: this.state.stats.totalKingsKilled + 1,
                    kingsKilled4InARow: this.state.stats.kingsKilled4InARow + 1}
          }, () => this.theKingIsDead(currentPile[0]['suit']))
        } else if (isItFiveInARow(currentPile.slice(-5))) {
          this.setState({
            stats: {...this.state.stats,
                    maximumCardsToKillKing: killCards,
                    totalKingsKilled: this.state.stats.totalKingsKilled + 1,
                    kingsKilled5InARow: this.state.stats.kingsKilled5InARow + 1}
          }, () => this.theKingIsDead(currentPile[0]['suit']))
        }
      }
      else if (pileLength === 5) {
        if (isItThreeInARow(currentPile.slice(-3))) {
          this.setState({
            stats: {...this.state.stats,
                    maximumCardsToKillKing: killCards,
                    totalKingsKilled: this.state.stats.totalKingsKilled + 1,
                    kingsKilled3InARow: this.state.stats.kingsKilled3InARow + 1}
          }, () => this.theKingIsDead(currentPile[0]['suit']))
        } else if (isItFourInARow(currentPile.slice(-4))) {
          this.setState({
            stats: {...this.state.stats,
                    maximumCardsToKillKing: killCards,
                    totalKingsKilled: this.state.stats.totalKingsKilled + 1,
                    kingsKilled4InARow: this.state.stats.kingsKilled4InARow + 1}
          }, () => this.theKingIsDead(currentPile[0]['suit']))
      }
    } else if (pileLength === 4) {
        if (isItThreeInARow(currentPile.slice(-3))) {
          this.setState({
            stats: {...this.state.stats,
                    maximumCardsToKillKing: killCards,
                    totalKingsKilled: this.state.stats.totalKingsKilled + 1,
                    kingsKilled3InARow: this.state.stats.kingsKilled3InARow + 1}
          }, () => this.theKingIsDead(currentPile[0]['suit']))
        }
      }
    }

  theKingIsDead = (currentPile) => {
    const newId = this.state.currentGame.newReserveId + 1
    const idx = this.state.currentGame.idArray.indexOf(currentPile)
    const newIdArr = [...this.state.currentGame.idArray]
    newIdArr[idx] = `reserve${newId}`

    if (newId > 7) {
      return this.gameOver(currentPile)
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

  gameOver = (currentPile) => {
    this.setState( {
      currentGame:
        { ...this.state.currentGame,
          gameOver: 'winBeforeModal'
        }
      },
      () => this.showWinModal()
    )
  }

  showWinModal = () => {
    setTimeout( () => this.setState( {
      currentGame:
        { ...this.state.currentGame,
          gameOver: 'win'
        },
      stats:
        { ...this.state.stats,
          gamesWon: 1,
          currentWinStreak: this.state.stats.currentWinStreak + 1}
      }, () => this.props.updateAchievements(this.state.stats)), 2000 )
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
      stats: {
        ...this.state.stats,
        kingsKilled3InARow: 0,
        kingsKilled4InARow: 0,
        kingsKilled5InARow: 0,
        totalKingsKilled: 0,
        maximumCardsToKillKing: 0,
        reserveSpotsUsedBeforeWin: [],
        gamesWon: 0,
        currentReservePilesUsed: []
      }
  }
)}

  //Checks new talon card to see if it's a new game or if player lost
  isItANewGame = () => {
    //If it's a new game, make it a current one
    if (this.state.currentGame.newGame === true) {
      this.setState(
                { currentGame:
                  {...this.state.currentGame,
                  newGame: false
                  }
                }
      )
    }
    //Check if the game is lost
    if (didYouLose(this.state.currentGame)) {
      this.gameIsLost()
    }
  }

  gameIsLost = (reason) => {
    if(!reason){
    setTimeout(()=> this.setState( {
      currentGame:
        { ...this.state.currentGame,
          gameOver: 'lose'
        },
        stats:
        { ...this.state.stats,
          currentWinStreak: 0,
          gamesWon: 0,
          currentReservePilesUsed: []
        }
    }, () => this.props.updateAchievements(this.state.stats)
    ), 1000) }
     else {
       this.setState( {
         stats:
         { ...this.state.stats,
           currentWinStreak: 0,
           gamesWon: 0,
           currentReservePilesUsed: []
         }
       }, () => this.props.updateAchievements(this.state.stats), this.startNewGame() )
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

  countReservePile = (reservePile) => {
          this.setState( {
                  stats: {
                      ...this.state.stats,
                      currentReservePilesUsed: this.state.stats.currentReservePilesUsed.concat(reservePile),
                      reserveSpotsUsedBeforeWin: [...new Set(this.state.stats.reserveSpotsUsedBeforeWin.concat(reservePile)) ]
                    }
                  } )
                }

  render() {
    disableScroll.on()
    return (
      <div className="background">
        <div className="container">
        <Preview generator={this.generatePreview} />
        {this.state.currentGame.alertStatus === true ?
          <Alert alertStatus={this.state.currentGame.alertStatus}
          alertKind={this.state.currentGame.alertKind}
          clearAlert={this.clearAlert} />
        : null}
        {this.state.currentGame.gameOver === 'win' ? null :
        this.state.currentGame.idArray.map(id => {
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
            countReservePile={this.countReservePile}
          />
          :
          id === 'blank' ?
          <AppNav key={id} id={id}
          handleGameClick={() => this.gameIsLost('button')}
          handleRulesClick={this.showRules}
          gameOver={this.state.currentGame.gameOver} /> :
          id !== 'stock' && id !== 'talon' ?
          <KingPile
            key={id}
            id={id}
            cards={this.state.currentGame[id]}
            setTarget={(card) => this.setTarget(card)}
            kingKilled= {this.state.currentGame.kingKilled}
            currentPile= {this.state.currentGame.currentPile}
            newGame={this.state.currentGame.newGame}
          />
          : null
        }  )}
          <StockPile
            handleStockClick={this.handleStockClick}
          />
          {this.state.currentGame.talon && Object.keys(this.state.currentGame.talon).length > 0 ?
          <TalonPile
            card={this.state.currentGame.talon}
            handleTalonClick={this.handleTalonClick}
            handleDrop={ this.handleKingDrop }
            newGame={this.state.currentGame.newGame}
            gameOver={this.state.currentGame.gameOver}
            handleReserveClick={this.handleReserveClick}
            /> :
          <TalonPile
            card={{id: 'green_two'}}
            handleTalonClick={this.handleTalonClick}
            handleDrop={ this.handleKingDrop }
            newGame={this.state.currentGame.newGame}
            gameOver={this.state.currentGame.gameOver}
            handleReserveClick={this.handleReserveClick}
          />
        }

        {this.state.currentGame.gameOver === 'win'  || this.state.currentGame.gameOver === 'lose' ?
         <WinModal gameOver={this.state.currentGame.gameOver}
          startNewGame={this.startNewGame}
          updateTwitter={this.props.updateTwitter}/>
        : null
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

export default DragDropContext(MultiBackend(HTML5toTouch))(GamePage);
