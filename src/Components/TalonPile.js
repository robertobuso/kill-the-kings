import React, { Component } from 'react';
import Card from './Card.js'

class TalonPile extends Component {

  shouldWeFadeIn = () => {
    if (this.props.status === true) {
      return `talon-pile animated fadeInRightBig slower`
    } else {
      return `talon-pile`
    }
  }

  render() {
    const { card, handleDrop, handleTalonClick } = this.props;

    return (
      <div
        id="talon"
        className={this.shouldWeFadeIn()}>
          <Card
            card={card}
            src={require(`../Images/Cards/${card.id}.jpg`)}
            handleDrop={ handleDrop }
            handleTalonClick={ handleTalonClick }
            draggable='true'
          />
      </div>
    )
  }
}

export default TalonPile;
