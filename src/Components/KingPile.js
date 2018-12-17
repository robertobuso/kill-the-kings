import React, { Component } from 'react';
import Card from './Card.js'


class KingPile extends Component {

  render() {
    let x = 0
    console.log(this.props.cards)
    
    return (
      <div className={`${this.props.id}-container`} onClick={() => this.props.handleKingClick(this.props.id)} >
        {this.props.cards.map( card => {
          card === this.props.cards[0] ? x = 0 : x = x + 35

          return <Card  src={require(`../Images/Cards/${card['id']}.jpg`)}
                        key={card.id}
                        multiplier={x}/>
        })}
      </div>
        )}


}

export default KingPile;
