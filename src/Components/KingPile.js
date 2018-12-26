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

const cardTarget = {
  drop(props, monitor) {
    // const targetId = props.id;
    // const sourceProps = monitor.getItem();
    // const sourceId = sourceProps.id;
    props.setTarget(props)
  }
};

class KingPile extends Component {

  render() {
    let x = 0
    const { connectDropTarget, id, cards } = this.props

    return connectDropTarget (
      <div className={`${id}-container`} >
        {cards.map( newCard => {
          newCard === cards[0] ? x = 0 : x = x + 35

          return <Card
                    src={require(`../Images/Cards/${newCard['id']}.jpg`)}
                    key={newCard.id}
                    multiplier={x}
                    draggable='false'/>
        })}
      </div>
    )
  }
}

export default DropTarget('card', cardTarget, collect)(KingPile);
