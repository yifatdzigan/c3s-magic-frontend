import React, { Component } from 'react';
import { withRouter } from 'react-router';
import ADAGUCViewerComponent from '../../components/ADAGUCViewerComponent';

class StormSurge extends Component {
  render () {
    const wmsurl = 'https://portal.c3s-magic.eu/backend/adagucserver?source=c3smagic%2FWP7-surge_estimator%2Fsurge_heights_EC-Earth_s01r14_20131201-20140131.nc&';
    return (<div className='MainViewport'>
      <h1>Surge height estimator</h1>
      Estimates surge levels along the coast of the North Sea from anomalies in mean sea level pressure and wind components.
       Please check the <a href='/#/diagnostics/surge_height'>surge height diagnostic</a>.
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
          layer.zoomToLayer();
          webMapJSInstance.draw();
        }}
      />
    </div>);
  }
};

export default withRouter(StormSurge);
