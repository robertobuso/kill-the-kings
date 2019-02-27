import React, { Component } from 'react';
import { TransitionablePortal, Segment, Header, Button, Grid } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';


class WinModal extends Component {

  componentDidMount() {
    window.twttr.widgets.load()
  }

  handleMenuClick = () => {
    this.props.history.push('/')
  }

  handleAchievementsClick = () => {
    this.props.history.push('/achievements')
  }

  responsiveStyle = () => {
    if (window.screen.width <= 415) {
      return { left: '2%', position: 'fixed', top: '40%', zIndex: 1000}
    } else {
      return { left: '36%', position: 'fixed', top: '40%', zIndex: 1000 }
    }
  }

  render() {
    return                                            <TransitionablePortal
        open={true}
        transition={{ animation: 'zoom', duration: 500 }}
        className='row-margin'>
      <Segment style={this.responsiveStyle()}>
      {this.props.gameOver === 'lose' ?
        <>
        <Header>The Kings Survived Your Attack</Header>
        <p>But there's still hope: play another game and try again!</p>
        </>
        :
        this.props.gameOver === 'win' ?
        <>
        <Header textAlign='center'>REGICIDE</Header>
        <p style={ {textAlign: 'center'} }>You killed all the kings. You are a WINNER.</p>
        </>
      : null }
      <br/>
      <Grid columns={3} className='twitter-wrapper'>
        <Grid.Row>
          <Grid.Column textAlign='center'>
      <Button basic color='green' size='tiny' onClick={this.handleMenuClick}>
        Main Menu
      </Button>
      </Grid.Column>
      <Grid.Column textAlign='center'>
      <Button  basic color='green' size='tiny' onClick={this.handleAchievementsClick}>
        Achievements
      </Button>
      </Grid.Column>
      <Grid.Column textAlign='center'>
      <Button  basic color='green' size='tiny' onClick={this.props.startNewGame}>
        New Game
      </Button>
      </Grid.Column>
      </Grid.Row>
      </Grid>
      {this.props.gameOver === 'win' ?
        <>
          <Grid className='twitter'>
          <Grid.Row>
              <Header textAlign='center' as='h5'>I killed the kings! @killthekings via @standardgames
              </Header>
            </Grid.Row>
            <Grid.Row>
            <span className='twitter-wrapper'>
              <a href="https://twitter.com/intent/tweet?text=I%20killed%20the%20kings!%20%23killthekings%20via%20@standardgames" class="twitter-share-button" data-show-count="false">Tweet</a>
              <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
          </span>
          </Grid.Row>
        </Grid>
        </>
      : null}
      </Segment>
    </TransitionablePortal>
  }
}

  export default withRouter(WinModal);
