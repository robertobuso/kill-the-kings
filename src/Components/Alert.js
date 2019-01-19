import React, { Component } from 'react'
import { Button, TransitionablePortal, Image, Segment, Header } from 'semantic-ui-react'

class Alert extends Component {

state = { open: this.props.alertStatus }

handleClick = () => this.setState({ open: false }, () => setTimeout(()=> this.props.clearAlert(), 2000) )

handleClose = () => this.setState({ open: false }, () => this.props.clearAlert())

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
        case 'allReservesFull':
          return 'All the reserve piles are full!';
      default:
        return
    }
  }

  leftMargin = () => {
    //Check if it's mobile
    if (window.screen.width <= 415 && (this.props.alertKind ==='talon' || this.props.alertKind === 'cardIsHigher'|| this.props.alertKind === 'sameColorDifferentSuit')) {
      return '5%'
    } else if (window.screen.width <= 415) {
      return '25%'
    }

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
        case 'allReservesFull':
          return '40%';
      default:
        return
    }
  }

  render() {
    return (
    <TransitionablePortal
    open={this.state.open}
    transition={{ animation: 'fade', duration: 500 }}
    onClose={this.handleClose} >
      <Segment size='mini' style={{ left: this.leftMargin(), position: 'fixed', top: '40%', zIndex: 1000 }}>
        <Image wrapped size='small' src={require('../Images/OtherImages/killthekings_header.png')} />
        <Header textAlign='center'>{this.alertContent()}</Header>
        <br/>
        <Button size='tiny' basic color='red' floated='right' content='Continue'
          onClick={this.handleClick} />
      </Segment>
    </TransitionablePortal>
    )
  }
}

export default Alert
