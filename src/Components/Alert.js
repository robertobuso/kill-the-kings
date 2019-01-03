import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'

class Alert extends Component {

  render() {

    return (
      <Modal size='mini' open={this.props.alertStatus} >
        <Modal.Header>You must play the current card first.</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
          </Modal.Content>
          <Modal.Actions>
            <Button positive icon='checkmark' labelPosition='right' content='Continue'
            onClick={this.props.clearAlert} />
          </Modal.Actions>
        </Modal>
    )
  }
}

export default Alert
