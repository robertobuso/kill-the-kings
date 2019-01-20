import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Menu, Header, Button, Container, Image } from 'semantic-ui-react'

class Achievements extends Component {
  render() {
    return (
      <div className='main-menu-background'>
      <Container style={ {width:'100vh',
    height:'100vh'} }>
      <Container style={ {width:'100%',
    height:'50%'} }>
      <Image src={ require('../Images/OtherImages/achievements.png') } alt='Achievements'/>
      </Container>
      <Container style={ {width:'100%',
    height:'50%', overflow: 'scroll'} }>
      <Menu fluid vertical color='pink'>
       <Menu.Item name='run'  />
       <Menu.Item name='walk' />
       <Menu.Item name='bike' active />
       <Menu.Item name='run' />
       <Menu.Item name='walk'/>
       <Menu.Item name='bike' active />
       <Menu.Item name='run' />
       <Menu.Item name='walk'/>
       <Menu.Item name='bike' active />
       <Menu.Item name='run' />
       <Menu.Item name='walk'/>
       <Menu.Item name='bike' active />
     </Menu>
     </Container>
     </Container>
     </div>
    )
  }
}

export default withRouter(Achievements);
