import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Container, Image, Header, Button } from 'semantic-ui-react'

class AboutUs extends Component {

  handleMenuClick = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <Grid stackable className='main-menu-background'>
        <Container style={ {width:'100vh', height:'100vh', margin: '50px', backgroundColor: 'white'} } textAlign='center'>

          <Image style={ {padding:'50px'} } centered src={ require('../Images/OtherImages/logo_sg.png') } size='large' alt='Standard Games'/>

          <Header as='h1' textAlign='center'>@standardgames</Header>

          <a href='http://www.standardgames.com/' target="_blank" rel="noopener noreferrer"><Header as='h1' textAlign='center' color='blue'>standardgames.com</Header></a>
          <br/>
          <a href='https://docs.google.com/document/d/1QnmFhW6lRC-ZG1BkAZeG0tQIm4EjrSKSBKCJ9a5Wctk/edit' target="_blank" rel="noopener noreferrer"><Header as='h1' textAlign='center' color='red'>Full Rules</Header></a>

          <Header as='h1' textAlign='center'>(c) Standard Games 2018. All Rights Reserved</Header>
          <br/>
          <Button basic color='red' size='small' onClick={this.handleMenuClick}>
            Main Menu
          </Button>

       </Container>
     </Grid>
    )
  }
}

export default withRouter(AboutUs);
