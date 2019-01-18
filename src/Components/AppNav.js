import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

class AppNav extends Component {
  render() {
    return <div className={ this.props.gameOver === 'winBeforeModal' ? 'animated hinge slower' : 'reserve-pile'
      }>
  
  </div>
  }
}

export default AppNav;
