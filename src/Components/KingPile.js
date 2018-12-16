import React, { Component } from 'react';
import Card from './Card.js'


class KingPile extends Component {

  render() {

    return (
      <>
        {this.props.cards.map( card => {
          return <Card src={require(`../Images/Cards/${card['id']}.jpg`)}/>
        })}
      </>
        )}


}

export default KingPile;
