import React, { Component } from 'react'
import { Button, TransitionablePortal, Image, Segment, Header } from 'semantic-ui-react'

class Alert extends Component {

  alertContent = () => {
    switch (this.props.alertKind) {
      case 'talon':
        return 'You must play the current card in the talon pile first.';
      case 'cardIsHigher':
        return 'You can only play a card lower in value than the last card on this pile.';
      case 'sameColorDifferentSuit':
        return 'You cannot play a card of the same color but different suit than the last card on this pile.';
      case 'fullReserve':
        return 'This reserve pile is full.';
      case 'selectCard':
        return 'You must select a card first.';
      default:
        return
    }
  }

  leftMargin = () => {
    switch (this.props.alertKind) {
      case 'talon':
        return '35%';
      case 'cardIsHigher':
        return '35%';
      case 'sameColorDifferentSuit':
        return '28%';
      case 'fullReserve':
        return '40%';
      case 'selectCard':
        return '40%';
      default:
        return
    }
  }

  render() {
    return (
    <TransitionablePortal     open={this.props.alertStatus}
    transition={{ animation: 'fade', duration: 500 }} >
      <Segment size='mini' style={{ left: this.leftMargin(), position: 'fixed', top: '40%', zIndex: 1000 }}>
        <Image wrapped size='small' src={require('../Images/OtherImages/killthekings_header.png')} />
        <Header textAlign='center'>{this.alertContent()}</Header>
        <br/>
        <Button size='tiny' basic color='green' floated='right' content='Continue'
          onClick={this.props.clearAlert} />
      </Segment>
    </TransitionablePortal>
    )
  }
}

export default Alert
