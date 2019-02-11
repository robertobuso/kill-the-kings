import React, { Component } from 'react';
import { Button, Container, Image, Grid } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';


class MainMenu extends Component {

  handleGameClick = () => {
    this.props.history.push('/game')
  }

  handleTutorialClick = () => {
    this.props.history.push('/tutorial')
  }

  handleAchievementsClick = () => {
    this.props.history.push('/achievements')
  }

  render() {
    return (
      <div className='main-menu-background animated fadeIn slower'>
      <Container textAlign='center'>
        <br/><br/>
        <Image
          src={require('../Images/OtherImages/killthekings_header.png') } alt='Title'
          onClick={this.handleStockClick}
          size='large'
          centered
        />
        <br/>
        <br/>
        <Grid>
          <Grid.Row centered>
            <Button size='medium' basic color='red' onClick={this.handleGameClick}>{'Play Game'}</Button>
            <br/><br/>
          </Grid.Row>
          <Grid.Row centered>
            <Button size='medium' basic color='red'
              onClick={this.handleTutorialClick}>
                Tutorial
            </Button>
          </Grid.Row>
          <Grid.Row centered>
            <br/><br/>
            <Button size='medium' basic color='red'
              onClick={this.handleAchievementsClick}>
                Achievements
            </Button>
          </Grid.Row>
          <Grid.Row centered>
            <br/><br/>
            <a href='https://docs.google.com/document/d/1QnmFhW6lRC-ZG1BkAZeG0tQIm4EjrSKSBKCJ9a5Wctk/edit' target="_blank" rel="noopener noreferrer">
              <Button size='medium' basic color='red'>
                {'Full Rules'}
              </Button>
            </a>
          </Grid.Row>
        </Grid>
        <br/><br/>
        <br/><br/>
        <Image src={ require('../Images/OtherImages/four_kings_one.jpg')} />
      </Container>
    </div>
    )
  }
}

export default withRouter(MainMenu);
