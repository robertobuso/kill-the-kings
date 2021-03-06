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

wasKingKilled = () => {
  if (this.props.gameOver === 'winBeforeModal') {
    return `king-container animated flipOutY slower`
  } else if (this.props.kingKilled === false || (this.props.currentPile !== this.props.id)) {
    if (this.props.newGame === true) {
      return `king-container animated fadeInUpBig slow`
    } else if (this.props.emphasis === 'kings')
      { return `king-container emphasis`
    } else {return `king-container`}
  } else {
    return `king-container animated zoomOutDown slower`
  }
}

  render() {
    let x = 0
    const { connectDropTarget, cards } = this.props

    return connectDropTarget (
      <div className={this.wasKingKilled()} >
        {cards.map( newCard => {
          newCard === cards[0] ? x = 0 : x = x + 35
              const savedCard = localStorage.getItem(newCard.id) ? localStorage.getItem(newCard.id) : require(`../Images/Cards/${newCard.id}.jpg`)

          return <Card
                    class='inserted-card'
                    src={savedCard}
                    key={newCard.id}
                    multiplier={x}
                    draggable='false'/>
        })}
      </div>
    )
  }
}

export default DropTarget('card', cardTarget, collect)(KingPile);
