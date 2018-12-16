import React, { Component } from 'react';

class Card extends Component {

  render() {
    console.log(this.props.card)
    return (
      <img
        className="card"
        src={this.props.src}
        alt="Card"/>
    )
  }
}

export default Card;
