import React, { Component } from 'react';
import { Container, Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';
import { listOfAchievements } from '../Constants/ListOfAchievements.js'

class AchievementMenu extends Component {

  render() {
    return(
      <Container style={ {width:'100%', height:'45%', overflow: 'scroll'} }>
        <Menu fluid vertical color='pink'>
          {listOfAchievements.map(item => {
            return <Menu.Item name={item.title} onClick={() => this.props.handleMenuClick(item)}
            key={item.id}  />
          })}
       </Menu>
     </Container>
    )
  }

}

export default withRouter(AchievementMenu);
