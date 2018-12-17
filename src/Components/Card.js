import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const cardSource = {
  beginDrag(props) {
    console.log('THIS IS A DRAG')
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

    return connectDragSource(
        <img
          className='inserted-card'
          src={src}
          alt="Card"
          style={ {gridArea: '1 / 1 / 1 / 1',  marginTop: multiplier} }/>
    )
  }
}

export default DragSource('card', cardSource, collect)(Card);
