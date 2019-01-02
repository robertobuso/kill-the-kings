import React, { Component } from 'react';
import Card from './Card.js'
import { Popup, Rating } from 'semantic-ui-react'

class PopupExampleHtml extends Component {

  shouldWeFadeIn = () => {
    if (this.props.status === true) {
      return `talon-pile animated fadeInRightBig slower`
    } else {
      return `talon-pile`
    }
  }

  render() {
    const { card, handleDrop, handleTalonClick } = this.props;

    const IndividualCard = (
      <div
        id="talon"
        className={this.shouldWeFadeIn()}>
          <Card
            card={card}
            src={require(`../Images/Cards/${card.id}.jpg`)}
            handleDrop={ handleDrop }
            handleTalonClick={ handleTalonClick }
            draggable='true'
          />
      </div>
    )

    return (
      <Popup trigger={IndividualCard} inverted >
        <Popup.Header>This is the Talon Pile</Popup.Header>
        <Popup.Content>
          <Rating icon='star' defaultRating={3} maxRating={4} />
        </Popup.Content>
      </Popup>
    )
  }
}

export default PopupExampleHtml;
