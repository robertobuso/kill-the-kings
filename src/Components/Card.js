import React, { Component } from 'react';

class Card extends Component {

  render() {
    return (
        <img
          className='inserted-card'
          src={this.props.src}
          alt="Card"
          style={ {gridArea: '1 / 1 / 1 / 1',  marginTop: this.props.multiplier} }/>
    )
  }
}

export default Card;
