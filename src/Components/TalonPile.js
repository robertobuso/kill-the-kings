import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const cardSource = {
  beginDrag(props) {
    return props.card
  },
  endDrag(props, monitor, component) {
    return props.handleDrop(props.card.id)
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class TalonPile extends Component {

  render() {
    const { isDragging, connectDragSource, card, handleTalonClick, talonBorder } = this.props;

    return connectDragSource(
      <img
        id="talon"
        className="talon-pile"
        src={require(`../Images/Cards/${card.id}.jpg`)}
        alt="Talon Pile"
        onClick={() => handleTalonClick(card)}
        style={ {border: `3px solid ${talonBorder}`}}
      />
    )
  }
}

export default DragSource('card', cardSource, collect)(TalonPile);;
