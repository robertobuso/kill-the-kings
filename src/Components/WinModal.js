import React, { Component } from 'react';
import { TransitionablePortal, Segment, Header, Button } from 'semantic-ui-react'

class WinModal extends Component {

  render() {
    return                            <TransitionablePortal
        open={true}
        transition={{ animation: 'zoom', duration: 500 }}>
      <Segment style={{ left: '40%', position: 'fixed', top: '40%', zIndex: 1000 }}>
      {this.props.gameOver === 'lose' ?
        <>
        <Header>LOSER</Header>
        <p>You just lost the game, you dumb son of a bitch.</p>
        </>
        :
        this.props.gameOver === 'win' ?
        <>
        <Header>REGICIDE</Header>
        <p>You killed all the kings. You are a WINNER.</p>
        </>
      : null }
      <Button floated='right' basic color='green' onClick={this.props.startNewGame}>New Game</Button>
      </Segment>
    </TransitionablePortal>
  }

}

  export default WinModal;
