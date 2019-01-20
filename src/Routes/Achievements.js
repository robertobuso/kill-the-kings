import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Menu, Header, Button, Container } from 'semantic-ui-react'

class Achievements extends Component {
  render() {
    return (
      <Container  style={ {width:'100vh',
    height:'100vh'} }>
      <Container style={ {width:'100%',
    height:'50%'} }>
      <Header textAlign='center'>HELLO MOTHERFUCKERS!</Header>
      </Container>
      <Container style={ {width:'100%',
    height:'50%', overflow: 'scroll'} }>
      <Menu fluid vertical>
       <Menu.Item name='run' color='pink'  />
       <Menu.Item name='walk' color= 'blue' />
       <Menu.Item name='bike' active />
       <Menu.Item name='run' color='pink' />
       <Menu.Item name='walk' color= 'blue' />
       <Menu.Item name='bike' active />
       <Menu.Item name='run' color='pink' />
       <Menu.Item name='walk' color= 'blue' />
       <Menu.Item name='bike' active />
       <Menu.Item name='run' color='pink' />
       <Menu.Item name='walk' color= 'blue' />
       <Menu.Item name='bike' active />
     </Menu>
     </Container>
     </Container>
    )
  }
}

export default withRouter(Achievements);
