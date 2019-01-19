import React, { Component } from 'react';
import { TransitionablePortal, Grid, Header, Button, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class Rules extends Component {

  handleTutorialClick = () => {
    this.props.history.push('/tutorial')
  }

  handleMainMenuClick = () => {
    this.props.history.push('/')
  }

  responsiveStyle = () => {
    if (window.screen.width <= 360) {
      return { left: '1%', position: 'fixed', top: '40%', zIndex: 1000 }
    } else {
      return { left: '35%', position: 'fixed', top: '40%', zIndex: 1000 }
    }
  }

  render() {
    return (
      <TransitionablePortal
          open={true}
          onClose={() => this.props.handleClose(false)}
          transition={{ animation: 'slide up', duration: 500 }}>
        <Segment  style={this.responsiveStyle()}>
          <Header textAlign='center'>HOW TO KILL A KING</Header>
          <p>Place 3 cards in a row of the same number.</p>
          <p>Place 4 cards in a row of descending value and same suit.</p>
          <p>Place 5 cards in a row of descending value but different color.</p>
          <br/>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Button size='tiny' basic color='red' onClick={this.handleMainMenuClick}>Main Menu
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button size='tiny' basic color='red' onClick={this.handleTutorialClick}>Tutorial</Button>
            </Grid.Column>
            <Grid.Column>
              <Button size='tiny' basic color='red' onClick={() => this.props.handleClose(false)}>Continue</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br/>
        </Segment>
      </TransitionablePortal>
    )
  }
}

export default withRouter(Rules);
