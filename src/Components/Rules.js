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
        <p>3 in a row of the same number</p>
        <p>4 in a row, descending value, same suit</p>
        <p>5 in a row, descending value, different color</p>
        <p>The play's the thing wherein you'll catch the conscience of the king.</p>
        <br/>

      <a href='https://docs.google.com/document/d/1QnmFhW6lRC-ZG1BkAZeG0tQIm4EjrSKSBKCJ9a5Wctk/edit'>
      <Button size='tiny' floated='left' basic color='green'>Full Rules</Button>
      </a>
      <Button size='tiny' floated='right' basic color='green' onClick={() => this.props.handleClose(false)}>Continue</Button>
      </Segment>
    </TransitionablePortal>
  }

}

  export default Rules;
