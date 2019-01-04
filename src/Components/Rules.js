import React, { Component } from 'react';
import { TransitionablePortal, Segment, Header, Button } from 'semantic-ui-react'

class Rules extends Component {

  render() {
    return                            <TransitionablePortal
        open={true}
        onClose={() => this.props.handleClose(false)}
        transition={{ animation: 'slide up', duration: 500 }}>
      <Segment style={{ left: '40%', position: 'fixed', top: '40%', zIndex: 1000 }}>

        <Header textAlign='center'>HOW TO KILL A KING</Header>
        <p>Place 3 cards in a row of the same number.</p>
        <p>Place 4 cards in a row of descending value and same suit.</p>
        <p>Place 5 cards in a row of descending value but different color.</p>
        <p>The play's the thing wherein you'll catch the conscience of the king.</p>
        <br/>

      <a href='https://docs.google.com/document/d/1QnmFhW6lRC-ZG1BkAZeG0tQIm4EjrSKSBKCJ9a5Wctk/edit' target="_blank">
      <Button size='tiny' floated='left' basic color='green'>Full Rules</Button>
      </a>
      <Button size='tiny' floated='right' basic color='green' onClick={() => this.props.handleClose(false)}>Continue</Button>
      </Segment>
    </TransitionablePortal>
  }

}

  export default Rules;
