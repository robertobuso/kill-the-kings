import React, { Component } from 'react';
import { TransitionablePortal, Segment, Header, Button, Grid } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';


class TutorialPortal extends Component {

  state = { header: '',
            content: '',
            lesson: 0}

  handleMenuClick = () => {
    this.props.history.push('/')
  }

  handleGameClick = () => {
    this.props.history.push('/game')
  }

  handleNextClick = () => {
    this.setState( { lesson: this.state.lesson + 1})
  }

  showHeader = () => {
    switch (this.state.lesson) {
      case 0:
        return 'Kill the Kings!';
      case 1:
        return 'Click on Deck';
      case 2:
        return 'You cannot play a card of the same color but different suit than the last card on this pile.';
      case 3:
        return 'This reserve pile is full.';
      case 4:
        return 'You must select a card first.';
      default:
        return
    }
  }

  showContent = () => {
    switch (this.state.lesson) {
      case 0:
        return 'Your goal is to kill all four kings by placing specific combinations of cards under them.';
      case 1:
        return 'Click on the deck and a card will be dealt to the talon pile.';
      case 2:
        return 'You cannot play a card of the same color but different suit than the last card on this pile.';
      case 3:
        return 'This reserve pile is full.';
      case 4:
        return 'You must select a card first.';
      default:
        return
    }
  }

  leftMargin = () => {
    switch (this.state.lesson) {
      case 0:
        return '35%';
      case 1:
        return '30%';
      case 2:
        return '25%';
      case 3:
        return '30%';
      case 4:
        return '35%';
      default:
        return
    }
  }

  render() {
    return                          <TransitionablePortal
      open={this.props.open}
      transition={{ animation: 'swing right', duration: 500 }}>
    <Segment style={{ position: 'fixed', left: this.leftMargin(), top: '40%', zIndex: 1000 }}>
    <>
    <Header>{this.showHeader()}</Header>
    <p>{this.showContent()}</p>
    </>
    <br/>
    <Grid columns={3} centered>
    <Grid.Row>
    <Grid.Column>
    <Button size='tiny' basic color='green' onClick={this.handleMenuClick}>Main Menu</Button>
    </Grid.Column>
    <Grid.Column>
    <Button size='tiny' basic color='green' onClick={this.handleGameClick}>Play Game</Button>
    </Grid.Column>
    {this.state.lesson < 4 ?
    <Grid.Column>
    <Button size='tiny' basic color='green' onClick={this.handleNextClick}>Next Rule</Button>
    </Grid.Column>
    : null }
    </Grid.Row>
    </Grid>
    </Segment>
    </TransitionablePortal>
  }
}

export default withRouter(TutorialPortal);
