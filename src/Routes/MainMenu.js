import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Header, Container } from 'semantic-ui-react'

class MainMenu extends Component {

  render() {
    return <Container textAlign='center'>
    <br/><br/>
    <Header>
    This Will Be the Home Page
    </Header>
    <br/>
    <NavLink to='/game'>Play Game</NavLink>
    <a href='https://docs.google.com/document/d/1QnmFhW6lRC-ZG1BkAZeG0tQIm4EjrSKSBKCJ9a5Wctk/edit' target="_blank" rel="noopener noreferrer">
    <br/><br/>
    <Button size='tiny' basic color='green'>Full Rules</Button>
    </a>
    </Container>
  }

}

export default MainMenu;
