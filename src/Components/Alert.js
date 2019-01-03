import React, { Component } from 'react'
import { Button, TransitionablePortal, Image, Segment, Header } from 'semantic-ui-react'

class Alert extends Component {

  alertContent = () => {
    switch (this.props.alertKind) {
      case 'talon':
        return 'You must play the current card first.';
        break;
      
    }
  }
  render() {
    return (
    <TransitionablePortal size='mini'       open={this.props.alertStatus}
    transition={{ animation: 'zoom', duration: 500 }} >
      <Segment style={{ left: '40%', position: 'fixed', top: '40%', zIndex: 1000 }}>
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
