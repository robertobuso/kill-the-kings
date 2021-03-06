import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Container } from 'semantic-ui-react'
import AchievementDetail from '../Components/AchievementDetail.js'
import AchievementMenu from '../Components/AchievementMenu.js'

class Achievements extends Component {
  state = { item:
      {}
  }

  handleMenuClick = (item) => {
    this.setState( {
      item: item})
  }

  render() {
    return (
      <Grid stackable className='main-menu-background'>
        <Container style={ {width:'100vh',
      height:'100vh'} }>
          <AchievementDetail
            item={this.state.item}
            stats={this.props.stats}/>
          <AchievementMenu
            handleMenuClick={this.handleMenuClick}/>
       </Container>
     </Grid>
    )
  }
}

export default withRouter(Achievements);
