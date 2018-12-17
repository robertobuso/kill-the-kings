import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const cardSource = {
  beginDrag(props) {
    props.handleTalonClick(props.card)
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
    console.log('TalonPile Props: ',this.props)
    const { isDragging, connectDragSource, card, handleTalonClick, talonBorder } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      <img
        id="talon"
        className="talon-pile"
        src={require(`../Images/Cards/${card.id}.jpg`)}
        alt="Talon Pile"
        onClick={() => handleTalonClick(card)}
        style={ {border: `3px solid ${talonBorder}`, opacity}}
      />
    )
  }
}

export default DragSource('card', cardSource, collect)(TalonPile);;
