import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import Card from './Card.js'

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    card: monitor.getItem()
  }
}

class KingPile extends Component {

  render() {
    let x = 0
    const { connectDropTarget, hovered, id, handleKingClick, cards } = this.props
    return connectDropTarget(
      <div className={`${id}-container`} onClick={() => handleKingClick(id)} >
        {cards.map( newCard => {
          newCard === cards[0] ? x = 0 : x = x + 35

          return <Card  src={require(`../Images/Cards/${newCard['id']}.jpg`)}
                        key={newCard.id}
                        multiplier={x}/>
        })}
      </div>
        )}


}

export default DropTarget('card', {}, collect)(KingPile);
