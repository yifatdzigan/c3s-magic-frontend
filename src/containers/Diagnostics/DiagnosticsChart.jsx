import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RechartsDemo from '../../components/RechartsDemo';

class DiagnosticsChart extends Component {
  componentWillMount () {
  }

  componentDidMount(){
  }

  render () {

    return (
      <RechartsDemo data={this.props.data} />
    );
  }
}

export {
  DiagnosticsChart
}
