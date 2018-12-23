import React, { Component } from 'react';
import Card from './Card.js'


class TalonPile extends Component {

  render() {
    const { card, handleDrop, handleTalonClick } = this.props;

    return (
      <div
        id="talon"
        className="talon-pile">
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
