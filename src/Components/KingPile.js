import React, { Component } from 'react';

class KingPile extends Component {

  render() {
    console.log(this.props.src)
    return (
      <img
        className="card"
        src={this.props.src}
        alt="King Pile"/>
    )
  }
}

export default KingPile;
