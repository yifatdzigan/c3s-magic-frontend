import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import ADAGUCViewerComponent from '../../components/ADAGUCViewerComponent';

class StormSurge extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const wmsurl = 'https://portal.c3s-magic.eu/backend/adagucserver?source=c3smagic%2FWP7-surge_estimator%2Fsurge_heights_EC-Earth_s01r14_20131201-20140131.nc&';
    return (<div className='MainViewport'>
    <h1>Surge height estimator</h1>

    <ADAGUCViewerComponent
                  height={'50vh'}
                  layers={[]}
                  wmsurl={wmsurl}
                  controls={{
                    showprojectionbutton: true,
                    showlayerselector: true,
                    showtimeselector: true,
                    showstyleselector: true
                  }}
                  parsedLayerCallback={(layer, webMapJSInstance) => {
                    // console.log('webMapJSInstance', webMapJSInstance);
                    layer.zoomToLayer();
                    webMapJSInstance.draw();
                  }}
                />

    </div>);
  }
};

StormSurge.propTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};

export default withRouter(StormSurge);
