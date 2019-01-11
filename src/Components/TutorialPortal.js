import React, { Component } from 'react';
import { TransitionablePortal, Segment, Header, Button, Grid } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';


class TutorialPortal extends Component {

  state = { header: 'Kill the Kings!',
            content: 'Your goal is to kill all four kings by placing specific combinations of cards under them.',
            lesson: 0}

  handleMenuClick = () => {
    this.props.history.push('/')
  }

  handleGameClick = () => {
    this.props.history.push('/game')
  }

  handleNextClick = () => {
    this.setState( { lesson: this.state.lesson + 1}, () => this.changeEmphasis(this.state.lesson))
  }

  changeEmphasis = (lesson) => {
    switch (this.state.lesson) {
      case 1:
        return this.setState( {
          header: 'Click on Deck',
          content: 'When you click on the deck...'
        }, () => this.props.showEmphasis('stock-pile', '', 'diamond', []) );
      case 2:
      return this.setState( {
        header: 'Card on Talon Pile',
        content: '...a card will be dealt to the talon pile. Once a card is dealt, it *must* be played.'
      }, () => this.props.showEmphasis('talon-pile','', 'talon', [{id: 'ha', value: 10, suit: 'heart', src: './Images/Cards/ha.jpg'}]) );
      case 3:
      return this.setState( {
        header: 'Reserves',
        content: 'The text of this next RULE!'
      }, () => this.props.showEmphasis('reserves','talon','reserve1', [{id: 'ha', value: 10, suit: 'heart', src: './Images/Cards/ha.jpg'}]) );
      case 4:
      return this.setState( {
        header: 'Reserves',
        content: 'The text of this next RULE!'
      }, () => this.props.showEmphasis('kings','reserve1','spade', [{id: 'ha', value: 10, suit: 'heart', src: './Images/Cards/ha.jpg'}]) );
      default:
        return
      }
  }

  render() {
    return                          <TransitionablePortal
      open={this.props.open}
      transition={{ animation: 'swing right', duration: 500 }}>
    <Segment style={{ position: 'fixed', left: '5%', top: '50%', zIndex: 1000 }}>
    <>
    <Header>{this.state.header}</Header>
    <p>{this.state.content}</p>
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
