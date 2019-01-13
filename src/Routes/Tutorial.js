import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { originalDeck, kings } from '../Constants/CardObjects.js'
import { shuffle } from '../Adapters/'

import KingPile from '../Components/KingPile.js'
import TalonPile from '../Components/TalonPile.js'
import ReservePile from '../Components/ReservePile.js'
import AppNav from '../Components/AppNav.js'
import TutorialPortal from '../Components/TutorialPortal.js'

class Tutorial extends Component {

  state = {
    currentGame: {
      stock: shuffle(originalDeck),
      talon: [],
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
      idArray: ['reserve1', 'reserve2', 'reserve3','reserve4', 'blank', 'club', 'diamond', 'spade', 'heart'],
      showTutorialBox: false,
      startTutorial: true,
      emphasis: 'kings',
      cards: []
    }
  }

  showEmphasis = (pile, oldPile, currentPile, cards) => {
    const pileArray=this.state.currentGame[currentPile]

    this.setState( {currentGame:
      {...this.state.currentGame,
        emphasis: pile,
        [currentPile]: pileArray.concat(cards),
        [oldPile]: []
      }
    }
    )
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
          emphasis={this.state.currentGame.emphasis}
        />
        :
        id === 'blank' ?
        <AppNav key={id} id={id}
        handleGameClick={this.handleClick}
        handleRulesClick={this.handleClick}
        gameOver={this.state.currentGame.gameOver}
        emphasis={this.state.currentGame.emphasis} /> :
        <KingPile
          key={id}
          id={id}
          cards={this.state.currentGame[id]}
          currentPile= {this.state.currentGame.currentPile}
          newGame={this.state.currentGame.newGame}
          emphasis={this.state.currentGame.emphasis}
        />
      })}
        <img
          id="stock" className={this.state.currentGame.emphasis === 'stock-pile' ? 'stock-pile emphasis' : 'stock-pile'}
          src={require('../Images/Cards/logo_kk.jpg') } alt="Card Pile"
        />
        {this.state.currentGame.talon.length > 0 ?
        <TalonPile
          card={this.state.currentGame.talon[0]}
          emphasis={this.state.currentGame.emphasis}
          /> :
        <TalonPile
          card={{id: 'green_two'}}
          emphasis={this.state.currentGame.emphasis}
        />
      }
    </div>
    </div>
    <TutorialPortal open={this.state.currentGame.showTutorialBox}
    showEmphasis={this.showEmphasis} />
    </>
    )
  }
}

export default withRouter(Tutorial);
