import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Menu, Header, Button, Container, Image, Card, Icon } from 'semantic-ui-react'

class Achievements extends Component {

  handleGameClick = () => {
    this.props.history.push('/game')
  }

  handleMainMenuClick = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <Grid stac className='main-menu-background'>
      <Container stacked='true' style={ {width:'100vh',
    height:'100vh'} }>
      <Container style={ {width:'100%',
    height:'60%'} } >
      <Image centered src={ require('../Images/OtherImages/achievements.png') } alt='Achievements'/>
      <br/>
      <Button floated='right' size='mini' basic color='red'
        onClick={this.handleMainMenuClick}>
          Main Menu
      </Button>
      <Button size='mini' basic color='red'
        onClick={this.handleGameClick}>
          {'Play Game'}
      </Button>
<Container style={{backgroundColor: 'rgb(0, 66, 51)', width:'50%', marginTop:'10px', borderRadius:'10%'}}>
    <Image centered size='small' src={require('../Images/OtherImages/killthekings_header.png')} />
      <Header textAlign='center' style={{color: 'yellow'}}>THREVOLUTION</Header>
      <Header textAlign='center' style={{color: 'white'}}>Won 3 Games in a Row</Header>
      <Header textAlign='center' style={{color: 'white'}}>0</Header>
  </Container>
      </Container>
      <Container style={ {width:'100%',
    height:'40%', overflow: 'scroll'} }>
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
     </Grid>
    )
  }
}

export default withRouter(Achievements);
