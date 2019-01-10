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
        return 'You must play the current card first.';
      case 1:
        return 'You can only play a card lower in value than the last card on this pile.';
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
        return 'You must play the current card first.';
      case 1:
        return 'You can only play a card lower in value than the last card on this pile.';
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

  render() {
    return                          <TransitionablePortal
      open={this.props.open}
      transition={{ animation: 'swing right', duration: 500 }}>
    <Segment style={{ left: '35%', position: 'fixed', top: '40%', zIndex: 1000 }}>
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
    <Grid.Column>
    <Button size='tiny' basic color='green' onClick={this.handleNextClick}>Next {<br/>}Rule</Button>
    </Grid.Column>
    </Grid.Row>
    </Grid>
    </Segment>
    </TransitionablePortal>
  }
}

export default withRouter(TutorialPortal);
