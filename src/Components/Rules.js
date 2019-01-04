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
        <br/>

      <Button size='tiny' floated='left' basic color='green' onClick={() => alert('Full Rules Coming Soon')}>Full Rules</Button>
      <Button size='tiny' floated='right' basic color='green' onClick={() => this.props.handleClose(false)}>Continue</Button>
      </Segment>
    </TransitionablePortal>
  }

}

  export default Rules;
