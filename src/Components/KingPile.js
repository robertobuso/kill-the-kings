import React, { Component } from 'react';

class KingPile extends Component {

  render() {
    return (
      <img
        className="card"
        src={this.props.src}
        onClick={() => this.props.handleKingClick(this.props.id)}
        alt="King Pile"/>
    )
  }
}

export default KingPile;
