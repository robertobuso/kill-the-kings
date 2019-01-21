import React, { Component } from 'react';
import { Container, Image, Button, Header } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class AchievementDetail extends Component {
  handleGameClick = () => {
    this.props.history.push('/game')
  }

  handleMainMenuClick = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <Container style={ {width:'100%',
        height:'55%'} } >
          <Image centered src={ require('../Images/OtherImages/achievements.png') } alt='Achievements'/>
          <br/>
          <Button floated='right' size='mini' basic color='red' onClick={this.handleMainMenuClick}>
            Main Menu
          </Button>
          <Button size='mini' basic color='red'
          onClick={this.handleGameClick}>
            {'Play Game'}
          </Button>
          <Container style={{backgroundColor: 'rgb(	173, 255, 47)', width:'50%', marginTop:'20px', borderRadius:'10%'}}>
          <Image centered size='small' src={require('../Images/OtherImages/killthekings_header.png')} />
          <Header textAlign='center' style={{color: 'black'}}>{this.props.item.title}</Header>
          <Header textAlign='center' style={{color: 'red'}}>{this.props.item.description}</Header>
          <Header textAlign='center' style={{color: 'red'}}>{this.props.item.id}</Header>
        </Container>
    </Container>
    )
  }
}

export default withRouter(AchievementDetail);
