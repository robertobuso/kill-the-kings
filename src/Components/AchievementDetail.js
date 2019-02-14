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
      <Container style={ {width:'100%',
        height:'55%'} } >
          <Image centered src={ require('../Images/OtherImages/achievements.png') } alt='Achievements'/>
          <br/>
          <Button floated='right' size='mini' basic color='red' onClick={this.handleGameClick}>
            {'Play Game'}
          </Button>
          <Button size='mini' basic color='red'
          onClick={this.handleMainMenuClick}>
            Main Menu
          </Button>
          <Container>
          <Grid columns={2}>
          <Grid.Column>
            <Image size='small' src={require('../Images/OtherImages/king_face.svg')}
            style={{marginTop:'20px', borderRadius:'10%'}} />
          </Grid.Column>
          <Grid.Column>
          <Container style={{backgroundColor: 'rgb(	173, 255, 47)', marginTop:'20px', borderRadius:'10%'}}>
          <Image centered size='small' src={require('../Images/OtherImages/killthekings_header.png')} />
          <Header textAlign='center' style={{color: 'black'}}>{this.props.item.title}</Header>
          <Header textAlign='center' style={{color: 'red'}}>{this.props.item.description}</Header>
          <Header textAlign='center' style={{color: 'red'}}>{JSON.parse(localStorage.getItem('state'))[achievementId]}</Header>
        </Container>
        </Grid.Column>
        </Grid>
        </Container>
    </Container>
    )
  }
}

export default withRouter(AchievementDetail);
