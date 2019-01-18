import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react'

class AppNav extends Component {
  render() {
    return <div className={ this.props.gameOver === 'winBeforeModal' ? 'animated hinge slower' : 'king-container'
      }>
    <Grid centered>
    <Grid.Row>
    <Button circular size ='mini' basic color='blue'
    onClick={()=> this.props.handleRulesClick(true)}>
      Rules
    </Button>
    </Grid.Row>
    <Grid.Row>
    <Button circular size ='mini' basic color='blue'
    onClick={this.props.handleGameClick}>
      New<br/>Game
    </Button>
    </Grid.Row>
    <br/>
    </Grid>
  </div>
  }
}

export default AppNav;
