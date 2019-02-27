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

          <a href='http://www.standardgames.com/' target="_blank" rel="noopener noreferrer"><Header as='h1' textAlign='center' style={ {color:'rgb(34, 173, 179)'} }>standardgames.com</Header></a>
          <br/>
          <a href='https://docs.google.com/document/d/1QnmFhW6lRC-ZG1BkAZeG0tQIm4EjrSKSBKCJ9a5Wctk/edit' target="_blank" rel="noopener noreferrer"><Header as='h1' textAlign='center' style={ {color:'rgb(76, 93, 206)'} }>Full Rules</Header></a>
          <br/>
          <a href='https://twitter.com/standardgames' target="_blank" rel="noopener noreferrer"><Header as='h1' textAlign='center' onClick={this.props.updateFollow} style={ {color:'rgb(34, 173, 179)'} }>Follow Us</Header></a>
          <br/>
          <a href='#' onClick={this.handleMenuClick}><Header as='h1' textAlign='center' style={ {color:'rgb(76, 93, 206)'} }>Main Menu</Header></a>
       </Container>
     </Grid>
    )
  }
}

export default withRouter(AboutUs);
