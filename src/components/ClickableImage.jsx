import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

export default class ClickableImage extends Component {
  constructor (props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      modal: false
    };
  }

  toggle () {
    this.setState({
      modal: !this.state.modal
    });
  }

  render () {
    return (<div className={'ClickableImage'} >
      <img ref='myimg' onClick={this.toggle} src={this.props.src} />
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={'ClickableImageModal'}>
        <ModalBody>
          <img onClick={this.toggle} style={{ width:'95vw', maxHeight: '80vh' }} src={this.props.src} />
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={this.toggle}>Close</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>);
  }
};

ClickableImage.propTypes = {
  src: PropTypes.string
};
