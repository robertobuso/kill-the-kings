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
    const { connectDropTarget, id, currentCard, handleDrop, handleTalonClick } = this.props

    return connectDropTarget (
      <div className="reserve-pile" >
          {currentCard ?
                  <Card
                    card={currentCard}
                    src={require(`../Images/Cards/${currentCard.id}.jpg`)}
                    key={currentCard.id}
                    multiplier='0'
                    handleDrop={ handleDrop }
                    handleTalonClick={ handleTalonClick }
                    id={ id }
                    draggable='true'
                   />
            : null}
      </div>
    )
  }
}


export default DropTarget('card', cardTarget, collect)(ReservePile);
