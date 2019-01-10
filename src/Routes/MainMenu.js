import React, { Component } from 'react';
import { Button, Container, Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';


class MainMenu extends Component {

  handleGameClick = () => {
    this.props.history.push('/game')
  }

  handleTutorialClick = () => {
    this.props.history.push('/tutorial')
  }

  render() {
    return                                          <div className='main-menu-background animated fadeIn slower'>
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
        <Button size='large' basic color='red'
          onClick={this.handleGameClick}>
            Play Game
        </Button>
        <br/>
        <br/>
        <Button size='large' basic color='red'
          onClick={this.handleTutorialClick}>
            Tutorial
        </Button>
        <br/>
        <br/>
        <a href='https://docs.google.com/document/d/1QnmFhW6lRC-ZG1BkAZeG0tQIm4EjrSKSBKCJ9a5Wctk/edit' target="_blank" rel="noopener noreferrer">
          <Button size='large' basic color='red'>
            Full Rules
          </Button>
        </a>
        <br/><br/>
        <br/><br/>
        <Image src={ require('../Images/OtherImages/four_kings_one.jpg')} />
      </Container>
    </div>
  }
}

export default withRouter(MainMenu);
