import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { config } from 'static/config.js';
import { Button, Input } from 'reactstrap';

export default class UploadComponent extends Component {

  determineFileName() {
    console.log('Hallo');
    console.log(this.fileName);
    return this.fileName;
  }

  handleFileUpload(event) {
    event.preventDefault();

    const { backendHost, frontendHost, adagucServicesHost } = config;
    const { dispatch, actions } = this.props;

    var fileName = this.fileInput.files[0].name;

    var formData = new FormData();
    formData.append('files', this.fileInput.files[0], fileName);

    fetch(adagucServicesHost + '/basket/upload?key=' + this.props.accessToken,
      {
        credentials:'include',
        method: 'POST',
        body: formData
      })
      .then(function(result) {
        console.log(result);
        dispatch(actions.setUploadedFile(fileName));
      });
  }

  render () {
    return (
      <div>
        <div className='alert alert-info col-6'>
          Please upload your file.
        </div>
        <form onSubmit={ (event) => this.handleFileUpload(event) }>
          <div className='form-group row'>
            <label className='btn btn-primary btn-file col-3'> Choose file
              <input
                type='file'
                style={{ display: 'none' }}
                onChange={ (event) => { this.fileName = event.target.files[0].name; this.forceUpdate()}}
                ref={ (input) => { this.fileInput = input; } }/>
            </label>
            <input type='text' className='form-control col-3 btn-input-text'
                   value={ this.fileName }/>
          </div>
          <Button color='primary' type='submit'>Upload File</Button>
        </form>
      </div>
    );
  }
}
