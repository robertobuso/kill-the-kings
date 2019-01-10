import React, { Component } from 'react';
import { TransitionablePortal, Grid, Header, Button, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class Rules extends Component {

  handleTutorialClick = () => {
    this.props.history.push('/tutorial')
  }

  render() {
    return                            <TransitionablePortal
        open={true}
        onClose={() => this.props.handleClose(false)}
        transition={{ animation: 'slide up', duration: 500 }}>
      <Segment style={{ left: '33%', position: 'fixed', top: '40%', zIndex: 1000 }}>

        <Header textAlign='center'>HOW TO KILL A KING</Header>
        <p>Place 3 cards in a row of the same number.</p>
        <p>Place 4 cards in a row of descending value and same suit.</p>
        <p>Place 5 cards in a row of descending value but different color.</p>
        <br/>
      <Grid columns={3}>
      <Grid.Row>
      <Grid.Column>
      <a href='https://docs.google.com/document/d/1QnmFhW6lRC-ZG1BkAZeG0tQIm4EjrSKSBKCJ9a5Wctk/edit' target="_blank" rel="noopener noreferrer">
      <Button size='tiny' basic color='green'>Full Rules</Button>
      </a>
      </Grid.Column>
      <Grid.Column>
      <Button size='tiny' basic color='green' onClick={this.handleTutorialClick}>Tutorial</Button>
      </Grid.Column>
      <Grid.Column>
      <Button size='tiny' basic color='green' onClick={() => this.props.handleClose(false)}>Continue</Button>
      </Grid.Column>
      </Grid.Row>
      </Grid>
      <br/>
      </Segment>
    </TransitionablePortal>
  }

}

  export default withRouter(Rules);
