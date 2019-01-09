import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Header, Container, Image } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';


class MainMenu extends Component {

  handleClick = () => {
    this.props.history.push('/game')
  }


  render() {
    return <div className='main-menu-background animated fadeIn slower'>
    <Container textAlign='center'>
    <br/><br/>
    <Image
      src={require('../Images/OtherImages/killthekings_header.png') } alt='Title'
      onClick={this.handleStockClick}
      size='large'
      centered
    />
    <Header>
    This Will Be the Home Page
    </Header>
    <br/>
    <Button size='large' basic color='red' onClick={this.handleClick}>Play Game</Button>
    <a href='https://docs.google.com/document/d/1QnmFhW6lRC-ZG1BkAZeG0tQIm4EjrSKSBKCJ9a5Wctk/edit' target="_blank" rel="noopener noreferrer">
    <br/><br/>
    <Button size='large' basic color='red'>Full Rules</Button>
    </a>
    <br/><br/><br/>
    <Image src={ require('../Images/OtherImages/four_kings_one.jpg')} />
    </Container>
    </div>
  }

}

export default withRouter(MainMenu);
