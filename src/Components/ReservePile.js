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
    props.countReservePile(props.id)
    props.setTarget(props)
  }
};

class ReservePile extends Component {

  shouldWeFadeIn = () => {
    if (this.props.gameOver === 'winBeforeModal') {
      return `${this.props.id}-container animated hinge slower`
    } else if (this.props.newGame === true) {
      return 'reserve-pile animated fadeInDownBig slow'
    } else if (this.props.fadeIn === true &&    this.props.newId === this.props.id) {
      return 'reserve-pile animated fadeInUpBig slow'
    } else if (this.props.emphasis === 'reserves')
      { return 'reserve-pile emphasis'
    } else {
      return 'reserve-pile'
    }
  }
  render() {
    const { connectDropTarget, id, currentCard, handleDrop, handleTalonClick, talon, showAlert } = this.props

    return connectDropTarget (
      <div className={this.shouldWeFadeIn()}>
          {currentCard ?
                  <Card
                    class='inserted-card'
                    card={currentCard}
                    src={require(`../Images/Cards/${currentCard.id}.jpg`)}
                    key={currentCard.id}
                    multiplier='0'
                    handleDrop={ handleDrop }
                    handleTalonClick={ handleTalonClick }
                    id={ id }
                    draggable={Object.keys(talon).length === 0  ? 'true' : 'false'}
                    showAlert={ showAlert }
                   />
            : null}
      </div>
    )
  }
}


export default DropTarget('card', cardTarget, collect)(ReservePile);
