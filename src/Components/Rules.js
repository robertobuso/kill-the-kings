import React, { Component } from 'react';
import { TransitionablePortal, Segment, Header, Button } from 'semantic-ui-react'

class Rules extends Component {

  render() {
    return                            <TransitionablePortal
        open={true}
        onClose={() => this.props.handleClose(false)}
        transition={{ animation: 'slide up', duration: 500 }}>
      <Segment style={{ left: '40%', position: 'fixed', top: '40%', zIndex: 1000 }}>
      {this.props.rulesStatus === 'rules' ?
        <>
        <Header>LOSER</Header>
        <p>You just lost the game, you dumb son of a bitch.</p>
        </>
        :
        <>
        <Header>CHEAT SHEET</Header>
        <p>You killed all the kings. You are a WINNER.</p>
        </>
      }
      <Button floated='right' basic color='green' onClick={this.props.startNewGame}>New Game</Button>
      </Segment>
    </TransitionablePortal>
  }

}

  export default Rules;
