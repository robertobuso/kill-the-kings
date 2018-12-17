import React, { Component } from 'react';

class TalonPile extends Component {

  render() {
    console.log(this.props)
    return (
      <img
        id="talon"
        className="talon-pile"
        src={require(`../Images/Cards/${this.props.card.id}.jpg`)}
        alt="Talon Pile"
        onClick={() => this.props.handleTalonClick(this.props.card)}
        style={ {border: `3px solid ${this.props.talonBorder}`}}
      />
    )
  }
}

export default TalonPile;
