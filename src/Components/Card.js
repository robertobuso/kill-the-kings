import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const cardSource = {
  beginDrag(props) {
    console.log('In Begin Drag!', props)
    if (props.draggable==='true') {
      console.log('First if is yes')
        props.handleTalonClick(props.card)
        return props.card
    } else if (props.showAlert){
      return props.showAlert()
    } else { return {} }
    },
  endDrag(props, monitor, component) {
    console.log('In End Drag!')
    if(!monitor.didDrop() || props.draggable === 'false') {
      return {}
    }
    return props.handleDrop(props)
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
    const { isDragging, connectDragSource, src, multiplier, previewStyle } = this.props;
    const opacity = isDragging ? 0.5 : 1

    if (previewStyle !== undefined) { Object.assign(previewStyle, {gridArea: '1 / 1 / 1 / 1',  marginTop: 0, opacity })
  }

    return connectDragSource(
        <img
          className='inserted-card'
          src={src}
          alt="Card"
          style={ previewStyle ? previewStyle :  {gridArea: '1 / 1 / 1 / 1',  marginTop: multiplier, opacity }}/>
    )
  }
}

export default DragSource('card', cardSource, collect)(Card);
