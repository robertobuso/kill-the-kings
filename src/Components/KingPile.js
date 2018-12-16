import React, { Component } from 'react';

class KingPile extends Component {

  render() {
    return (
      <img
        className="card"
        src={this.props.src}
        alt="King Pile"/>
    )
  }
}

export default KingPile;
