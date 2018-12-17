import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const cardSource = {
  beginDrag(props) {
    props.handleTalonClick(props.card)
    return props.card
  },
  endDrag(props, monitor, component) {
    if(!monitor.didDrop()) {
      return
    }
    return props.handleDrop()
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
    const { isDragging, connectDragSource, card, talonBorder } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      <img
        id="talon"
        className="talon-pile"
        src={require(`../Images/Cards/${card.id}.jpg`)}
        alt="Talon Pile"
        style={ {border: `3px solid ${talonBorder}`, opacity}}
      />
    )
  }
}

export default DragSource('card', cardSource, collect)(TalonPile);;
