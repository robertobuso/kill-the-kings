import React, { Component } from 'react'
import { Button, TransitionablePortal, Image, Segment, Header } from 'semantic-ui-react'

class Alert extends Component {

  alertContent = () => {
    switch (this.props.alertKind) {
      case 'talon':
        return 'You must play the current card first.';
      case 'cardIsHigher':
        return 'You can only play a card lower in value than the last card on this pile.';
      case 'sameColorDifferentSuit':
        return 'You cannot play a card of the same color but different suit than the last card on this pile.';
      case 'fullReserve':
        return 'This reserve pile is full.';
      default:
        return

    }
  }
  render() {
    return (
    <TransitionablePortal     open={this.props.alertStatus}
    transition={{ animation: 'fade', duration: 500 }} >
      <Segment size='mini' style={{ left: '20%', position: 'fixed', top: '40%', zIndex: 1000 }}>
        <Image wrapped size='medium' src={require('../Images/OtherImages/killthekings_header.png')} />
        <Header>{this.alertContent()}</Header>
        <br/>
        <Button basic color='green' floated='right' content='Continue'
          onClick={this.props.clearAlert} />
      </Segment>
    </TransitionablePortal>
    )
  }
}

export default Alert
