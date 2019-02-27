import React, { Component } from 'react';
import { TransitionablePortal, Segment, Header, Button, Grid } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';


class WinModal extends Component {

  handleMenuClick = () => {
    this.props.history.push('/')
  }

  handleAchievementsClick = () => {
    this.props.history.push('/achievements')
  }

  responsiveStyle = () => {
    if (window.screen.width <= 415) {
      return { left: '4%', position: 'fixed', top: '40%', zIndex: 1000 }
    } else {
      return { left: '35%', position: 'fixed', top: '40%', zIndex: 1000 }
    }
  }

  render() {
    return                                            <TransitionablePortal
        open={true}
        transition={{ animation: 'zoom', duration: 500 }}>
      <Segment style={this.responsiveStyle()}>
      {this.props.gameOver === 'lose' ?
        <>
        <Header>The Kings Survived Your Attack</Header>
        <p>But there's still hope: play another game and try again!</p>
        </>
        :
        this.props.gameOver === 'win' ?
        <>
        <Header>REGICIDE</Header>
        <p>You killed all the kings. You are a WINNER.</p>
        </>
      : null }
      <br/>
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
      <Button floated='left' basic color='green' size='tiny' onClick={this.handleMenuClick}>
        Main Menu
      </Button>
      </Grid.Column>
      <Grid.Column>
      <Button basic color='green' size='tiny' onClick={this.handleAchievementsClick}>
        Achievements
      </Button>
      </Grid.Column>
      <Grid.Column>
      <Button floated='right' basic color='green' size='tiny' onClick={this.props.startNewGame}>
        New Game
      </Button>
      </Grid.Column>
      </Grid.Row>
      </Grid>
      </Segment>
    </TransitionablePortal>
  }
}

  export default withRouter(WinModal);
