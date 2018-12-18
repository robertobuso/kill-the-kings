import React, { Component } from 'react';
import Card from './Card.js'


class TalonPile extends Component {

  render() {
    const { card, talonBorder, handleDrop, handleTalonClick } = this.props;

    return (
      <div
        id="talon"
        className="talon-pile"
        style={ {border: `3px solid ${talonBorder}` }}>
          <Card
            card={card}
            src={require(`../Images/Cards/${card.id}.jpg`)}
            handleDrop={ handleDrop }
            handleTalonClick={ handleTalonClick }
          />
      </div>
    )
  }
}

export default TalonPile;
