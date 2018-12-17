import React, { Component } from 'react';
import Card from './Card.js'


class TalonPile extends Component {

  render() {
    return (
      <img  id="talon"
            className="talon-pile"
            src={require(`../Images/Cards/${this.props.card.id}.jpg`)}
            alt="Talon Pile"
            onClick={() => this.props.handleTalonClick(this.props.card)}/>
        )}


}

export default TalonPile;
