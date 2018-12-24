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
    props.setTarget(props)
  }
};

class ReservePile extends Component {
  render() {
    const { connectDropTarget, id, currentCard } = this.props
    
    return connectDropTarget (
      <div className="reserve-pile" >
          {currentCard.id ?
                  <Card
                    src={require(`../Images/Cards/${currentCard.id}.jpg`)}
                    key={currentCard.id}
                    multiplier='0' />
            : null}
      </div>
    )
  }
}


export default DropTarget('card', cardTarget, collect)(ReservePile);
