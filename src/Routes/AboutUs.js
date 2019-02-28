import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Container, Image, Header, Button } from 'semantic-ui-react'

class AboutUs extends Component {

  handleMenuClick = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <Grid stackable className='main-menu-background animated fadeIn slower'>
        <Container style={ {width:'100vh', height:'100vh', margin: '50px', backgroundColor: 'white'} } textAlign='center'>

          <Image style={ {padding:'50px'} } centered src={ require('../Images/OtherImages/logo_sg.png') } size='large' alt='Standard Games'/>

          <a href='http://www.standardgames.com/' target="_blank" rel="noopener noreferrer"><button style={ {borderColor:'rgb(34, 173, 179)', backgroundColor:'transparent', color:'rgb(34, 173, 179)', borderRadius:'5px', padding: '15px', textAlign: 'center', fontSize:'14px', fontFamily:'Arial'} }
            onClick={this.props.updateFollow}>standardgames.com</button></a>
          <br/><br/>
          <a href='https://docs.google.com/document/d/1QnmFhW6lRC-ZG1BkAZeG0tQIm4EjrSKSBKCJ9a5Wctk/edit' target="_blank" rel="noopener noreferrer"><button style={ {borderColor:'rgb(76, 93, 206)', backgroundColor:'transparent', color:'rgb(76, 93, 206)', borderRadius:'5px', padding: '14px', textAlign: 'center', fontSize:'14px', fontFamily:'Arial'} }
            onClick={this.props.updateFollow}>Full Rules</button></a>
          <br/><br/>
          <a href='https://twitter.com/standardgames' target="_blank" rel="noopener noreferrer">
          <button style={ {borderColor:'rgb(34, 173, 179)', backgroundColor:'transparent', color:'rgb(34, 173, 179)', borderRadius:'5px', padding: '14px', textAlign: 'center', fontSize:'14px', fontFamily:'Arial'} }
            onClick={this.props.updateFollow}>Follow Us</button></a>
          <br/><br/>
          <button onClick={this.handleMenuClick} style={ {borderColor:'rgb(76, 93, 206)', backgroundColor:'transparent', color:'rgb(76, 93, 206)', borderRadius:'5px', padding: '14px', textAlign: 'center', fontSize:'14px', fontFamily:'Arial'} }>Main Menu</button>
          <br/><br/><br/>
          <a href='http://bit.ly/2Prky6l' target="_blank" rel="noopener noreferrer">
          <p float='right'>Developed by Roberto Busó-García</p>
          </a>
       </Container>
     </Grid>
    )
  }
}

export default withRouter(AboutUs);
