
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { YoutubeVideo, DiagnosticPlot } from './DiagnosticMedia';
import { DiagnosticsChart } from './DiagnosticsChart';
import { withRouter } from 'react-router';

import WPSWranglerDemo from './EnsembleAnomalyPlots';
import ADAGUCViewerComponent from '../../components/ADAGUCViewerComponent';
import MarkdownFromFile from '../../containers/MarkdownFromFile';

import { Row, Col, Button, Alert, Container } from 'reactstrap';
import Icon from 'react-fa';
import RenderWPSProcessOutput from '../../components/WPS/RenderWPSProcessOutput';
var $RefParser = require('json-schema-ref-parser');
var _ = require('lodash');

class DiagnosticPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      yamlData: '',
      readSuccess: false,
      yamlPath: '',
      staticPath: 'diagnosticsdata/'
    };
    this.readYaml = this.readYaml.bind(this);
    this.calculate = this.calculate.bind(this);
    this.downloadData = this.downloadData.bind(this);
    this.viewProvenance = this.viewProvenance.bind(this);
    this.renderPageElement = this.renderPageElement.bind(this);
    
    
  }

  readYaml() {
    var yamlPath = 'diagnosticsdata/' + this.props.params.diag + '/' + this.props.params.diag + '.yml';
    this.setState({ yamlPath: yamlPath });
    var that = this;
    $RefParser.dereference(yamlPath)
      .then(data => {
        that.setState({ yamlData: data, readSuccess: true });
      });
  }

  componentWillMount() {
    
    
  }

  componentDidMount() {
    this.readYaml();
  }

  getElementProperty(elementName, paramName) {
    var elem = this.state.yamlData[elementName];
    var paramVal = _.filter(elem, function (item) {
      if (typeof item[paramName] !== 'undefined') {
        return item[paramName];
      }
    });
    if (paramName === 'data_url') {
      return paramVal[0].data_url;
    }
    if (paramName === 'description_file') {
      paramVal = this.state.staticPath + paramVal[0].md_file;
      return paramVal;
    }
    if (paramVal.length == 0) {
      return false;
    }
    return paramVal;
  }


  isEnabled(elementName) {
    if (this.state.yamlData && this.state.readSuccess) {
      var _element = this.state.yamlData[elementName];
      return Boolean(_element);
    }
  }


  renderPageElement(elementName) {
    if (this.state.yamlData && this.state.readSuccess) {
      var _element = '';
      if (elementName === "partner") {
        _element = this.state.yamlData[elementName];
      }
      else if (elementName === "authors") {
        _element = '<ul key={elementName + \'partner\'}>';
        this.state.yamlData[elementName].forEach(function (element) {
          _element += '<li key={element}>' + element + '</li>';
        });
        _element += '</ul>';
      }
      else if (elementName === "contact") {
        _element = '<ul  key={elementName + \'contact\'}>';
        this.state.yamlData[elementName].forEach(function (element) {
          _element += '<li key={element}>' + element + '</li>';
        });
        _element += '</ul>';
      }
      else if (elementName === "description_short") {
        _element = this.state.yamlData[elementName];
      }
      else if (elementName === "description_file") {
        _element = this.state.yamlData[elementName];
      }
      else if (elementName === "settings") {
        _element = '<Table class="table table-bordered table-striped"> <thead> </thead> <tbody>';
        var elem = this.state.yamlData[elementName];
        Object.keys(elem).forEach(function (key) {
          var sub_elem = elem[key];
          Object.keys(sub_elem).forEach(function (sub_key) {
            _element += '</tr>';
            _element += '<th scope="row">' + sub_key + '</th>';
            _element += '<td>' + sub_elem[sub_key] + '</td>'
            _element += '</tr>';
          });
        });
        _element += '</tbody></Table>';
      }
      else if (elementName === "enableEnsembleAnomalyPlots") {
        _element = this.state.yamlData[elementName];
        return Boolean(_element);
      }
      else if (elementName === "enableADAGUC") {
        _element = this.state.yamlData[elementName];
        return Boolean(_element);
      }
      else if (elementName === "references") {
        _element = '<ul>';
        if (this.state.yamlData[elementName]) {
          this.state.yamlData[elementName].forEach(function (element) {
            _element += '<li key={element}>' + element + '</li>';
          });
        }
        _element += '</ul>';
      }
      else if (elementName === "media") {
        _element = this.state.yamlData[elementName];
        return _element;
      }
      else if (elementName === "title") {
        _element = this.state.yamlData[elementName];
        return _element;
      }
      else if (elementName === "youtube") {
        _element = this.state.yamlData[elementName];
        return _element;
      }
      else if (elementName === "chart") {
        _element = this.state.yamlData[elementName];
        return _element;
      } else if (elementName === "data") {
        _element = this.state.yamlData[elementName];
        return _element;
      } else if (elementName === "provenance") {
        _element = this.state.yamlData[elementName];
        return _element;
      } else if (elementName === "process") {
        _element = this.state.yamlData[elementName];
        return _element;
      } else {
        console.warn("Could not find the key " + elementName + " in the configuration file!");
        _element = "No key was requested! Check the diagnostics settings.";
      }
      return (<div key={elementName} dangerouslySetInnerHTML={{ __html: _element }} />);
    }
  }
  viewProvenance() {
    this.props.dispatch(this.props.actions.showWindow(
      {
        component:(<RenderWPSProcessOutput width={'100%'} height={'300px'} url={ this.renderPageElement("provenance")} title={'Provenance'} identifier={''} abstract={''}/>),
        title: 'provenance'
      })
    );
  }

  downloadData() {
    var win = window.open( this.renderPageElement("data"), '_blank');
    win.focus();
  }

  readMore() {
    var element = document.getElementById("additional");
    element.scrollIntoView();
  }

  toTop() {
    var element = document.getElementById("pagetop");
    element.scrollIntoView();
    window.scrollTo(0, 0);
  }

  calculate() {
    this.context.router.push( this.renderPageElement("process"),);
  }

  render() {
    if (this.state.readSuccess) {

      return (
        <div id="pagetop" className='MainViewport'>
          <Row>
            <Col sm={{ size: 8, offset: 2 }}>

              <div className='text vspace2em text-center'>
                <h1>
                  {this.renderPageElement('title')}
                </h1>
              </div>

              <Row>
                <Col xs="6" className='diagnosticsCol'>
                  <div className='text'>
                    <h2 style={{ color: '#921A36'}}>Partners</h2>
                    {this.renderPageElement('partner')}
                  </div>

                  <div className='text vspace2em'>
                    <h2 style={{ color: '#921A36'}}>Description</h2>
                    {this.renderPageElement('description_short')}
                    <div className='text vspace2em'>
                      <Button color="primary" onClick={this.readMore}><Icon name='' />&nbsp;Read more</Button>{' '}
                    </div>
                  </div>

                  <div className='text vspace2em'>
                    <h2 style={{ color: '#921A36'}}>Authors</h2>
                    {this.renderPageElement('authors')}
                  </div>

                  <div className='text vspace2em'>
                    <h2 style={{ color: '#921A36'}}>References</h2>
                    {this.renderPageElement('references')}
                  </div>

                  <div className='text vspace2em'>
                    <h2 style={{ color: '#921A36'}}>Contact</h2>
                    {this.renderPageElement('contact')}
                  </div>

                  <div className='vspace2em'>
                    { this.renderPageElement("provenance") && (<Button color="primary" onClick={this.viewProvenance}>&nbsp;View provenance</Button>) }
                    &nbsp;
                    { this.renderPageElement("data") && (<Button color="primary" onClick={this.downloadData}><Icon name='download' />&nbsp;Download data</Button>) }
                  </div>

                </Col>
                <Col xs="6" className='diagnosticsCol'>

                  <div className='text'>
                    {this.isEnabled('youtube') ?
                        <div key={'youtube'} className='text'>
                          <h2 style={{ color: '#921A36'}}>Screencast</h2>
                          <YoutubeVideo video={this.renderPageElement('youtube')} autoplay="0" rel="0" modest="1" />
                        </div>
                      : null
                    }
                  </div>

                  <div className='text vspace2em'>
                    <h2 style={{ color: '#921A36'}}>Settings</h2>
                    {this.renderPageElement('settings')}
                    { this.renderPageElement("process") && <Button color="primary" onClick={this.calculate}><Icon name='' />&nbsp;Calculate metric</Button> }
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs="12" className='diagnosticsCol'>
                  <div className='text'>
                    {this.isEnabled('chart') ?
                      <div key={'chart'} className='text'>
                        <h2 style={{ color: '#921A36'}}>Interactive chart</h2>
                        <DiagnosticsChart data={this.renderPageElement('chart')}/>
                      </div>
                      : null
                    }
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs="12" className='diagnosticsCol'>
                  <div className='text vspace2em'>
                    <h2 style={{ color: '#921A36'}}>Metric Results</h2>

                    {this.isEnabled('enableEnsembleAnomalyPlots') ?
                      [
                        <WPSWranglerDemo map_data={this.getElementProperty('enableEnsembleAnomalyPlots', 'data_url')}
                          showSlider={this.getElementProperty('enableEnsembleAnomalyPlots', 'map_slider')} />
                      ]
                      : null
                    }

                    {this.isEnabled('enableADAGUC') &&
                      <ADAGUCViewerComponent
                        height={'60vh'}
                        layers={[]}
                        controls={{
                          showprojectionbutton: this.getElementProperty('enableADAGUC', 'projectionbutton'),
                          showlayerselector: this.getElementProperty('enableADAGUC', 'layerselector'),
                          showtimeselector: this.getElementProperty('enableADAGUC', 'timeselector'),
                          showstyleselector: this.getElementProperty('enableADAGUC', 'styleselector')
                        }}
                        parsedLayerCallback={(layer, webMapJSInstance) => {
                          // console.log('webMapJSInstance', webMapJSInstance);
                          layer.zoomToLayer();
                          webMapJSInstance.draw();
                        }}
                        wmsurl={this.getElementProperty('enableADAGUC', 'data_url')}
                      />
                    }
                  </div>

                  {this.isEnabled('media') ?
                    [
                      <div key={'media'} className='vspace2em'>
                        <img width="100%" src={this.renderPageElement('media')} />
                      </div>
                    ]
                    : null
                  }

                  <div id="additional" className='vspace2em'>
                      {this.isEnabled('description_file') ?
                      [
                        <MarkdownFromFile key={'description_file'} url={this.state.staticPath + this.state.yamlData['description_file']} />
                      ]
                      : null
                    }
                  </div>

                  <div className='text'>
                    <Button color="primary" onClick={this.toTop}><Icon name='' />&nbsp;Go to the top of the page</Button>{' '}
                  </div>

                </Col>
              </Row>

            </Col>
          </Row>

        </div>);
    }
    else {
      return (
        <div style={{display: 'flex', justifyContent: 'center'}} className='text vspace2em'>

          <Container>
            <Row>
              <Col sm={{ size: 8, offset: 2 }}>

                <Alert color="danger">
                  <h4 className="alert-heading">Error!</h4>
                  <p>
                    This diagnostic is not ready yet or there is a technical problem.
                  </p>
                  <hr />
                  <p className="mb-0">
                    If you think this is an error, please contact us at magicians@c3s-magic.eu
                  </p>
                </Alert>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }

  }
}

DiagnosticPage.propTypes = {
  yamlFile: PropTypes.string
};

DiagnosticPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default  withRouter(DiagnosticPage);
