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

class Card extends Component {

  render() {
    const { isDragging, connectDragSource, src, multiplier } = this.props;
    const opacity = isDragging ? 0 : 1
    return connectDragSource(
        <img
          className='inserted-card'
          src={src}
          alt="Card"
          style={ {gridArea: '1 / 1 / 1 / 1',  marginTop: multiplier, opacity} }/>
    )
  }
}

export default DragSource('card', cardSource, collect)(Card);
