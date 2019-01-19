import React, { Component } from 'react';
import { TransitionablePortal, Segment, Header, Button } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';


class WinModal extends Component {

  handleClick = () => {
    this.props.history.push('/')
  }

  responsiveStyle = () => {
    if (window.screen.width <= 415) {
      return { left: '1%', position: 'fixed', top: '40%', zIndex: 1000 }
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
      <Button floated='left' basic color='green' onClick={this.handleClick}>
        Main Menu
      </Button>
      <Button floated='right' basic color='green' onClick={this.props.startNewGame}>
        New Game
      </Button>
      </Segment>
    </TransitionablePortal>
  }
}

  export default withRouter(WinModal);
