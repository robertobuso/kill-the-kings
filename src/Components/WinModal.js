import React, { Component } from 'react';
import { TransitionablePortal, Segment, Header } from 'semantic-ui-react'

class WinModal extends Component {

  render() {
    return                            <TransitionablePortal
        open={true}
        transition={{ animation: 'zoom', duration: 500 }}>
      <Segment style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
      {this.props.status === 'lose' ?
        <>
        <Header>LOSER</Header>
        <p>You just lost the game, you dumb son of a bitch.</p>
        </>
        :
        <>
        <Header>REGICIDE</Header>
        <p>You killed all the kings. You are a WINNER.</p>
        </>
      }
      </Segment>
    </TransitionablePortal>
  }

}

  export default WinModal;
