import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

export default class UploadComponent extends Component {
  constructor (props) {
    super(props);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileUpload (event) {
    event.preventDefault();
    const { dispatch, actions, domain, accessToken } = this.props;

    var fileName = this.fileInput.files[0].name;

    var formData = new FormData();
    formData.append('files', this.fileInput.files[0], fileName);

    let ok = (result) => {
      console.log(result, this.props);
      dispatch(actions.fetchBasketItems(this.props));
    };

    fetch('https://' + domain + '/basket/upload?key=' + accessToken,
      {
        method: 'POST',
        body: formData
      })
      .then(function (result) {
        console.log(result);
        ok(result);
      });
  }

  render () {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className='alert alert-info'>
          Please upload your file.
        </div>
        <form onSubmit={(event) => this.handleFileUpload(event)}>
          <div className='form-group row'>
            <label className='btn btn-primary btn-file'> Choose file
              <input
                type='file'
                style={{ display: 'none' }}
                onChange={(event) => { this.fileName = event.target.files[0].name; this.forceUpdate(); }}
                ref={(input) => { this.fileInput = input; }} />
            </label>
            <input type='text' className='form-control btn-input-text' value={this.fileName} />
          </div>
          <Button color='primary' type='submit'>Upload File</Button>
        </form>
      </div>
    );
  }
}
UploadComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  accessToken: PropTypes.string,
  domain: PropTypes.string
};
