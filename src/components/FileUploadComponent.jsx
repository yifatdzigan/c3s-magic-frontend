import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

export default class UploadComponent extends Component {
  constructor (props) {
    super(props);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.state = {
      message: 'Please upload your file.',
      uploading: false
    };
  }

  handleFileUpload (event) {
    event.preventDefault();
    const { dispatch, actions, backend, accessToken } = this.props;

    var fileName = this.fileInput.files[0].name;

    var formData = new FormData();
    formData.append('files', this.fileInput.files[0], fileName);

    let succeeded = (result) => {
      if (result.error) {
        this.setState({ message: 'File upload failed: ' + JSON.stringify(result, null, 2), uploading: false });
      } else {
        this.setState({ message: 'File upload succeeded: ' + JSON.stringify(result, null, 2), uploading: false });
      }
      dispatch(actions.fetchBasketItems(this.props));
    };
    let failed = (e) => {
      this.setState({ message: 'File upload failed: ' + e, uploading: false });
      dispatch(actions.fetchBasketItems(this.props));
    };

    this.setState({ message: 'Uploading ... ', uploading: true });
    fetch(backend + '/basket/upload?key=' + accessToken,
      {
        method: 'POST',
        body: formData
      })
      .then(function (result) {
        return result.json();
      }).then(json => {
        succeeded(json);
        console.log(json);
      }).catch((e) => {
        console.error(e);
        failed(e);
      });
  }

  render () {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className='alert alert-info'>
          {this.state.message}
        </div>
        { (<div>
          <form onSubmit={(event) => this.handleFileUpload(event)}>
            <div className='form-group row'>
              <label className='btn btn-primary btn-file'> Choose file
                <input
                  type='file'
                  style={{ display: 'none' }}
                  onChange={(event) => { this.fileName = event.target.files[0].name; this.forceUpdate();}}
                  ref={(input) => { this.fileInput = input; }} />
              </label>
              <input type='text' className='form-control btn-input-text' value={this.fileName} />
            </div>
            { this.state.uploading === false ? <Button color='primary' type='submit'>Upload File</Button> : null }
          </form>
        </div>) }
      </div>
    );
  }
}
UploadComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  accessToken: PropTypes.string,
  backend: PropTypes.string
};
