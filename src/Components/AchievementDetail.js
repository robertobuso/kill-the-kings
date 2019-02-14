import React, { Component } from 'react';
import { Container, Image, Button, Header, Grid } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class AchievementDetail extends Component {
  handleGameClick = () => {
    this.props.history.push('/game')
  }

  handleMainMenuClick = () => {
    this.props.history.push('/')
  }

  achievementNumber = () => {
    let achievement
    const specificAchievement = this.props.item.id

    if (localStorage.getItem('state') && this.props.item.id) {

      return achievement = JSON.parse(localStorage.getItem('state')).specificAchievement
    }
      else {
        return achievement = {id: 'gamesWon', title: 'Games Won', description: ''}
      }
  }

  render() {
    const achievementId = this.props.item.id

    return (
      <Container style={ {width:'75%',
        height:'55%'} } >
          <Image centered src={ require('../Images/OtherImages/killthekings_header.png') } size='medium' alt='Achievements'/>
          <br/>
          <Button floated='right' size='mini' basic color='red' onClick={this.handleGameClick}>
            {'Play Game'}
          </Button>
          <Button size='mini' basic color='red'
          onClick={this.handleMainMenuClick}>
            Main Menu
          </Button>
          <Container style={{borderStyle: 'solid', borderWidth: '2px', borderColor: 'rgb(253, 206, 125)', marginTop:'20px', borderRadius:'10%', height: '65%'}}>
          <Image centered size='medium' src={require('../Images/OtherImages/achievements.png')} />
          <Header textAlign='center' style={{color: 'black'}}>{this.props.item.title}</Header>
          <Header textAlign='center' style={{color: 'red'}}>{this.props.item.description}</Header>
          <Header textAlign='center' style={{color: 'red'}}>{JSON.parse(localStorage.getItem('state'))? JSON.parse(localStorage.getItem('state'))[achievementId] : 0}</Header>
        </Container>
    </Container>
    )
  }
}

export default withRouter(AchievementDetail);
