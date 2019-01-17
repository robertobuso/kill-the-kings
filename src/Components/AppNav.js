import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

class AppNav extends Component {
  render() {
    return <div className={ this.props.gameOver === 'winBeforeModal' ? 'animated hinge slower' : null
      }>
    <Button.Group vertical className='stock-pile'>
    <br/>
    <Button size ='mini' basic color='blue'
    onClick={()=> this.props.handleRulesClick(true)}>
      Rules
    </Button>
    <br/>
    <Button size ='mini' basic color='blue'
    onClick={this.props.handleGameClick}>
      New Game
    </Button>
  </Button.Group>
  </div>
  }
}

export default AppNav;
