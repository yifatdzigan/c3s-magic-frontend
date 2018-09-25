// We only need to import the modules necessary for initial render
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { connect } from 'react-redux';
import useractions from '../actions/userActions';
import wpsactions from '../actions/WPSActions';
import joblistactions from '../actions/jobListActions';
import basketactions from '../actions/basketActions';
import { windowManagerActions } from '../actions/windowManagerActions';
import BaseLayout from '../layouts/BaseLayout';
import DoubleNavBarLayout from '../layouts/DoubleNavBarLayout';
import NavBarLayout from '../layouts/NavBarLayout';
/*
--- Menu structure ---
WP4 - Metrics
 - Home
 - Mean state
 - Climate variability
 - Extreme events

WP5 - MMP
 - Home
 - Sub ensemble selections
 - Future climate
 - Estimate of agreement

WP6 - Timeseries
 - Home
 - Indices on area averages
 - Spatio temporal analyses
 - Correlations

 WP7 - Tailored products
 - Home
 - User consultations
 - Coastal areas
 - Water / Hydrology
 - Energy
 - Insurance

 WP3 - System
 - Home
 - Provenance
 - Lot1
*/
/* Metrics */
import MetricsMenu from '../containers/Metrics/MetricsMenu';
import MetricsHome from '../containers/Metrics/MetricsHome';
import MeanState from '../containers/Metrics/MeanState';
import ExtremeEvents from '../containers/Metrics/ExtremeEvents';
import ClimateVariability from '../containers/Metrics/ClimateVariability';

/* MultiModelProducts */
import MultiModelProductsMenu from '../containers/MultiModelProducts/MultiModelProductsMenu';
import MultiModelProductsHome from '../containers/MultiModelProducts/MultiModelProductsHome';
import SubEnsembleSelections from '../containers/MultiModelProducts/SubEnsembleSelections';
import FutureClimate from '../containers/MultiModelProducts/FutureClimate';
import EstimateOfAgreement from '../containers/MultiModelProducts/EstimateOfAgreement';

/* TimeSeries */
import TimeSeriesMenu from '../containers/TimeSeries/TimeSeriesMenu';
import TimeSeriesHome from '../containers/TimeSeries/TimeSeriesHome';
import Correlations from '../containers/TimeSeries/Correlations';
import IndicesOnAreaAverages from '../containers/TimeSeries/IndicesOnAreaAverages';
import SpatioTemporalAnalyses from '../containers/TimeSeries/SpatioTemporalAnalyses';

/* TailoredProducts */
import TailoredProductsMenu from '../containers/TailoredProducts/TailoredProductsMenu';
import TailoredProductsHome from '../containers/TailoredProducts/TailoredProductsHome';
import CoastalAreas from '../containers/TailoredProducts/CoastalAreas';
import Energy from '../containers/TailoredProducts/Energy';
import Insurance from '../containers/TailoredProducts/Insurance';
import WaterHydrology from '../containers/TailoredProducts/WaterHydrology';
import UserConsultation from '../containers/TailoredProducts/UserConsultation';
import ActuariesDemo from '../containers/TailoredProducts/ActuariesDemo';

/* Diagnostics */
import DiagnosticsHome from '../containers/Diagnostics/DiagnosticsHome';

/* System */
import SystemMenu from '../containers/System/SystemMenu';
import SystemHome from '../containers/System/SystemHome';
import Provenance from '../containers/System/Provenance';
import Data from '../containers/System/Data';

import TitleComponent from '../containers/TitleComponent';
import WP1Home from '../containers/WP1Home';
import AccountComponent from '../containers/AccountComponent';

import WPSBinaryOperator from '../components/WPSBinaryOperator';

import WPSDemoCopernicus from '../components/WPSDemoCopernicus';

import RechartsDemo from '../components/RechartsDemo';

import ESGFSearch from '../components/ESGFSearch';

import EnsembleAnomalyPlots from '../containers/Diagnostics/EnsembleAnomalyPlots';

import BasketComponent from '../components/Basket/BasketComponent';

import AdagucViewerContainer from '../containers/AdagucViewerContainer';

import JoblistComponent from '../components/JobListComponent';

import WindowManager from '../components/WindowManager';

const mapStateToTitleProps = (state) => {
  return { ...state.userState, ...state.windowManagerState };
};

const mapDispatchToTitleProps = function (dispatch) {
  return ({
    dispatch: dispatch,
    actions: { ...useractions, ...windowManagerActions }
  });
};

const mapStateToWPSProps = (state) => {
  return { ...state.WPSState, ...state.userState, ...state.windowManagerActions };
};

const mapStateToAnomalyEnsembleProps = (state) => {
  return { ...state.WPSState,
    ...state.userState,
    ...state.windowManagerActions,
    map_data:'anomaly_agreement_stippling',
    showSlider:true
  };
};
const mapDispatchToWPSProps = function (dispatch) {
  return ({
    dispatch: dispatch,
    actions: { ...wpsactions, ...windowManagerActions }
  });
};

const mapStateToBasketProps = (state) => {
  return { ...state.basketState, ...state.userState, backend: state.userState.backend, compute: state.userState.compute };
};

const mapDispatchToBasketProps = function (dispatch) {
  return ({
    dispatch: dispatch,
    actions: { ...basketactions, ...windowManagerActions }
  });
};

const mapStateToJoblistProps = (state) => {
  console.log(state);
  return { ...state.JoblistState, ...state.userState };
};

const mapDispatchToJoblistProps = function (dispatch) {
  return ({
    dispatch: dispatch,
    actions: { ...joblistactions }
  });
};

export const createRoutes = (store) => {
  const mainmenu = React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(TitleComponent));
  const metricsmenu = React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(MetricsMenu));

  const diagnosticshome = React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(DiagnosticsHome));

  const multimodelproductsmenu = React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(MultiModelProductsMenu));
  const timeseriesmenu = React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(TimeSeriesMenu));
  const tailoredproductsmenu = React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(TailoredProductsMenu));
  const systemmenu = React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(SystemMenu));

  const home = React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(WP1Home));

  const account = React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(AccountComponent));

  const ensembleAnomalyPlots = React.createElement(connect(mapStateToWPSProps, mapStateToAnomalyEnsembleProps)(EnsembleAnomalyPlots));

  const actuariesDemo = React.createElement(connect(mapStateToWPSProps, mapDispatchToWPSProps)(ActuariesDemo));

  const basket = React.createElement(connect(mapStateToBasketProps, mapDispatchToBasketProps)(BasketComponent));

  const adagucviewer = React.createElement(connect(mapStateToBasketProps, mapDispatchToBasketProps)(AdagucViewerContainer));

  const jobs = React.createElement(connect(mapStateToJoblistProps, mapDispatchToJoblistProps)(JoblistComponent));

  let ww = React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(WindowManager));

  return (
    <Route path={'/'} component={BaseLayout} title={'C3S-Magic'} windowmanager={ww} >
      <IndexRoute component={NavBarLayout} header={mainmenu} viewComponent={home} />
      <Route path='account' title='Account'>
        <IndexRoute component={NavBarLayout} header={mainmenu} viewComponent={account} />
      </Route>
      <Route path='diagnostics' title='Diagnostics'>
        <IndexRoute component={NavBarLayout} header={mainmenu} viewComponent={diagnosticshome} />
      </Route>

      <Route path='diagnostics/:diag' title='Diagnostics' header={mainmenu} component={DiagnosticsHome} />
      <Route path='calculator' title='Demo'>
        <IndexRoute component={NavBarLayout} header={mainmenu} viewComponent={React.createElement(connect(mapStateToWPSProps, mapDispatchToWPSProps)(WPSBinaryOperator))} />
      </Route>
      <Route path='wps-submit' title='Demo'>
        <IndexRoute component={NavBarLayout} header={mainmenu} viewComponent={React.createElement(connect(mapStateToWPSProps, mapDispatchToWPSProps)(WPSDemoCopernicus))} />
      </Route>
      <Route path='interactivecharts' title='Interactive charts'>
        <IndexRoute component={NavBarLayout} header={mainmenu} viewComponent={React.createElement(connect(mapStateToWPSProps, mapDispatchToWPSProps)(RechartsDemo))} />
      </Route>
      <Route path='esgfsearch' title='ESGF Search'>
        <IndexRoute component={NavBarLayout} header={mainmenu} viewComponent={React.createElement(connect(mapStateToWPSProps, mapDispatchToWPSProps)(ESGFSearch))} />
      </Route>

      <Route path='actuaries' title='actuariesDemo'>
        <IndexRoute component={NavBarLayout} header={mainmenu} secondNavbar={metricsmenu} viewComponent={actuariesDemo} />
      </Route>
      <Route path='ensembleanomalyplots' title='ensembleAnomalyPlots'>
        <IndexRoute component={NavBarLayout} header={mainmenu} secondNavbar={metricsmenu} viewComponent={ensembleAnomalyPlots} />
      </Route>
      <Route path='basket' title='Basket'>
        <IndexRoute component={NavBarLayout} header={mainmenu} viewComponent={basket} />
      </Route>
      <Route path='adagucviewer' title='ADAGUC Viewer'>
        <IndexRoute component={NavBarLayout} header={mainmenu} viewComponent={adagucviewer} />
      </Route>
      <Route path='jobs' title='Jobs'>
        <IndexRoute component={NavBarLayout} header={mainmenu} viewComponent={jobs} />
      </Route>
      JoblistComponent
      <Route path='metrics' title='Metrics'>
        <Route path='home'>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={metricsmenu}
            viewComponent={React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(MetricsHome))}
          />
        </Route>
        <Route path='meanstate'>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={metricsmenu}
            viewComponent={React.createElement(connect(mapStateToWPSProps, mapDispatchToWPSProps)(MeanState))}
          />
        </Route>
        <Route path='extremeevents'>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={metricsmenu}
            viewComponent={React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(ExtremeEvents))}
          />
        </Route>
        <Route path='climatevariability'>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={metricsmenu}
            viewComponent={React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(ClimateVariability))}
          />
        </Route>
      </Route>
      <Route path='multimodelproducts' title='Multi Model Products'>
        <Route path='home'>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={multimodelproductsmenu}
            viewComponent={React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(MultiModelProductsHome))}
          />
        </Route>
        <Route path='futureclimate'>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={multimodelproductsmenu}
            viewComponent={React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(FutureClimate))}
          />
        </Route>
        <Route path='subensembleselections'>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={multimodelproductsmenu}
            viewComponent={React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(SubEnsembleSelections))}
          />
        </Route>
        <Route path='estimateofagreement'>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={multimodelproductsmenu}
            viewComponent={React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(EstimateOfAgreement))}
          />
        </Route>

      </Route>
      <Route path='timeseries' title='Timeseries'>
        <Route path='home'>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={timeseriesmenu}
            viewComponent={React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(TimeSeriesHome))}
          />
        </Route>
        <Route path='indicesonareaaverages'>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={timeseriesmenu}
            viewComponent={React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(IndicesOnAreaAverages))}
          />
        </Route>
        <Route path='spatiotemporalanalyses'>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={timeseriesmenu}
            viewComponent={React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(SpatioTemporalAnalyses))}
          />
        </Route>
        <Route path='correlations'>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={timeseriesmenu}
            viewComponent={React.createElement(connect(mapStateToWPSProps, mapDispatchToWPSProps)(Correlations))}
          />
        </Route>
      </Route>
      <Route path='tailoredproducts' title='Tailored products'>
        <Route path=''>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={tailoredproductsmenu}
            viewComponent={actuariesDemo}
          />
        </Route>
        <Route path='home'>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={tailoredproductsmenu}
            viewComponent={React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(TailoredProductsHome))}
          />
        </Route>
        <Route path='coastalareas'>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={tailoredproductsmenu}
            viewComponent={React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(CoastalAreas))}
          />
        </Route>
        <Route path='energy'>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={tailoredproductsmenu}
            viewComponent={React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(Energy))}
          />
        </Route>
        <Route path='insurance'>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={tailoredproductsmenu}
            viewComponent={React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(Insurance))}
          />
        </Route>
        <Route path='userconsultation'>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={tailoredproductsmenu}
            viewComponent={React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(UserConsultation))}
          />
        </Route>
        <Route path='waterhydrology'>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={tailoredproductsmenu}
            viewComponent={React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(WaterHydrology))}
          />
        </Route>
      </Route>
      <Route path='system' title='System'>
        <Route path='home'>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={systemmenu}
            viewComponent={React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(SystemHome))}
          />
        </Route>
        <Route path='provenance'>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={systemmenu}
            viewComponent={React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(Provenance))}
          />
        </Route>
        <Route path='data'>
          <IndexRoute component={DoubleNavBarLayout} header={mainmenu} secondNavbar={systemmenu}
            viewComponent={React.createElement(connect(mapStateToTitleProps, mapDispatchToTitleProps)(Data))}
          />
        </Route>
      </Route>

    </Route>
  );
};

export default createRoutes;
