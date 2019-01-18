import React, { Component } from 'react';
import Card from './Card.js'
import {Button, Grid} from 'semantic-ui-react'

class TalonPile extends Component {

  shouldWeFadeIn = () => {
    if (this.props.gameOver === 'winBeforeModal') {
      return `talon-pile animated hinge slower`
    } else if (this.props.newGame === true) {
      return `talon-pile animated fadeInRightBig slower`
    } else if (this.props.emphasis === 'talon-pile')
      { return 'talon-pile emphasis'
    } else {
      return 'talon-pile'
    }
  }

  render() {
    const { card, handleDrop, handleTalonClick, handleReserveClick } = this.props;

    return (
      <div
        className={this.shouldWeFadeIn()}
        onDoubleClick={() => handleReserveClick(card)}>

          <Card
            card={card}
            src={require(`../Images/Cards/${card.id}.jpg`)}
            handleDrop={ handleDrop }
            handleTalonClick={ handleTalonClick }
            draggable='true'
          />
          <br/><br/>
      
          </div>

    )
  }
}

export default TalonPile;
