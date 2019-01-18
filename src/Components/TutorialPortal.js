import React, { Component } from 'react';
import { TransitionablePortal, Segment, Header, Button, Grid } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class TutorialPortal extends Component {

  state = { header: 'Kill the Kings!',
            content: 'Your goal is to kill all four kings by placing specific combinations of cards under them.',
            lesson: 0,
            open: true}

  handleMenuClick = () => {
    this.props.history.push('/')
  }

  handleGameClick = () => {
    this.props.history.push('/game')
  }

  handleNextClick = () => {
    this.setState({ open: false, lesson: this.state.lesson + 1 }, () => setTimeout( ()=> this.changeEmphasis(this.state.lesson), 500) )
  }

  handleClose = () => {
    this.setState({ open: false, lesson: this.state.lesson + 1 }, ()=> this.changeEmphasis(this.state.lesson) )
  }

  changeEmphasis = (lesson) => {
    switch (this.state.lesson) {
      case 1:
        return this.setState( {
          open: true,
          header: 'Click on Deck',
          content: 'When you click on the deck...'
        }, () => this.props.showEmphasis('stock-pile', '', 'diamond', []) );
      case 2:
      return this.setState( {
        open: true,
        header: 'Card on Talon Pile',
        content: '...a card will be dealt to the talon pile. Once a card is dealt, it *must* be played.'
      }, () => this.props.showEmphasis('talon-pile','', 'talon', [{id: 'ha', value: 10, suit: 'heart', src: './Images/Cards/ha.jpg'}]) );
      case 3:
      return this.setState( {
        open: true,
        header: 'Reserve Piles',
        content: 'If a Reserve Pile is free, you may drag (or double click) the card and place it on that pile.'
      }, () => this.props.showEmphasis('reserves','talon','reserve1', [{id: 'ha', value: 10, suit: 'heart', src: './Images/Cards/ha.jpg'}]) );
      case 4:
      return this.setState( {
        open: true,
        header: 'King Piles',
        content: 'You may also place the card on one of the King Piles if it follows one of three combinations that kill the kings.'
      }, () => this.props.showEmphasis('kings','reserve1','spade', [{id: 'ha', value: 10, suit: 'heart', src: './Images/Cards/ha.jpg'}]) );
      case 5:
      return this.setState( {
        open: true,
        header: 'Three of a Kind',
        content: 'Place 3 cards in a row of the same number under a King.'
      }, () => this.props.showEmphasis('kings','','spade', [ {id: 'ca', value: 10, suit: 'club', src: './Images/Cards/ca.jpg'}, {id: 'da', value: 10, suit: 'diamond', src: './Images/Cards/da.jpg'}]) );
      case 6:
      return this.setState( {
        open: true,
        header: 'Four of the Same Suit',
        content: 'Place 4 cards in a row of descending value and same suit under a King. Please note that the Ace is *always* low.'
      }, () => this.props.showEmphasis('kings','spade','heart', [ {id: 'hb', value: 11, suit: 'heart', src: './Images/Cards/hb.jpg'}, {id: 'h9', value: 9, suit: 'heart', src: './Images/Cards/h9.jpg'}, {id: 'h6', value: 6, suit: 'heart', src: './Images/Cards/h6.jpg'}, {id: 'h1', value: 1, suit: 'heart', src: './Images/Cards/h1.jpg'}]) );
      case 7:
      return this.setState( {
        open: true,
        header: 'Five Alternating Colors',
        content: 'Place 5 cards in a row of descending value but different color under a King.'
      }, () => this.props.showEmphasis('kings','heart','diamond', [ {id: 'cc', value: 12, suit: 'club', src: './Images/Cards/cc.jpg'}, {id: 'd9', value: 9, suit: 'diamond', src: './Images/Cards/d9.jpg'}, {id: 's7', value: 7, suit: 'spade', src: './Images/Cards/s7.jpg'}, {id: 'h4', value: 4, suit: 'heart', src: './Images/Cards/h4.jpg'}, {id: 'c2', value: 2, suit: 'club', src: './Images/Cards/c2.jpg'}]) );
      default:
        return
      }
  }

  chooseAnimation = () => {
    if(this.state.lesson === 0) {
      return 'swing right'
    } else {
      return 'scale'
    }
  }

  render() {

    return                              <TransitionablePortal
      open={this.state.open}
      transition={{ animation: this.chooseAnimation(), duration: 500 }}
      onClose={this.handleClose}>

      <Segment style={{ position: 'fixed', left: '3%', top: '55%', zIndex: 1000 }}>
      <>
        <Header>{this.state.header}</Header>
        <p>{this.state.content}</p>
        <br/>
      </>

      <Grid columns={3} centered>
        <Grid.Row>

          <Grid.Column>
          <Button size='tiny' basic color='red' onClick={this.handleMenuClick}>{'Main Menu'}</Button>
          </Grid.Column>

          <Grid.Column>
          <Button size='tiny' basic color='red' onClick={this.handleGameClick}>{'Play Game'}</Button>
          </Grid.Column>

          {this.state.lesson < 7 ?
          <Grid.Column>
          <Button size='tiny' basic color='red' onClick={this.handleNextClick}>Next Rule</Button>
          </Grid.Column>
          : null }

        </Grid.Row>
      </Grid>
      </Segment>
    </TransitionablePortal>
  }
}

export default withRouter(TutorialPortal);
