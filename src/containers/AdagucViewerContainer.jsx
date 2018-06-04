import React, { Component } from 'react';
import MarkdownFromFile from './MarkdownFromFile';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col } from 'reactstrap';
import Icon from 'react-fa';
import ADAGUCViewerComponent from '../components/ADAGUCViewerComponent';
export default class AdagucViewerContainer extends Component {
  constructor (props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      datasets: [{
        wmsurl:'https://portal.c3s-magic.eu/wms?DATASET=AHUNTER',
        name:'AHUNTER',
        title:'AHUNTER'
      },{
        wmsurl:'https://portal.c3s-magic.eu/wms?DATASET=WP7_ISAC_rainfarm',
        name:'WP7_ISAC_rainfarm',
        title:'WP7_ISAC_rainfarm'
      }],
      datasetIndex:0,
      dropdownOpen: {}
    }
  }

  toggle (id) {
    let dropDownOpen = Object.assign({}, { ...this.state.dropdownOpen });
    dropDownOpen[id] = !dropDownOpen[id];
    this.setState({
      dropdownOpen: dropDownOpen
    });
  }

  render () {
    return (
      <div className='MainViewport'>
        <Row>
          <Col xs='3'>Dataset:</Col><Col xs='1'><Dropdown
            isOpen={this.state.dropdownOpen['datasets']}
            toggle={() => { this.toggle('datasets'); }}
            >
            <DropdownToggle caret>
              <Icon name='globe' />&nbsp;{this.state.datasets[this.state.datasetIndex].title || 'Map projection'}
            </DropdownToggle>
            <DropdownMenu>
              {
                this.state.datasets.map((dataset, index) => {
                  return (<DropdownItem key={index} onClick={(event) => {
                    this.setState({datasetIndex: index});
                  }
                  }>{dataset.title}</DropdownItem>);
                })
              }
            </DropdownMenu>
          </Dropdown>
          </Col>
        </Row>
        <Row>
          <ADAGUCViewerComponent
            height={'50vh'}
            layers={[]}
            controls={{
              showprojectionbutton: true,
              showlayerselector: true,
              showtimeselector: true,
              showstyleselector: true
            }}
            parsedLayerCallback={ (layer, webMapJSInstance) => {
              // console.log(webMapJSInstance);
              layer.zoomToLayer();
              webMapJSInstance.draw();
            } }
            wmsurl={this.state.datasets[this.state.datasetIndex].wmsurl}
          />
        </Row>
        <Row>
          <Col xs='8'>
            <div className='text'>
              <span>Our advanced adaguc viewer is available for expert users to browse and inspect available datasets. There you can combine different layers and change their styling individually. It allows you to view and set other NetCDF dimensions, like elevation, member, ensemble and threshold.
                To browse our datasets, first click on the big gear and then on the AutoWMS menu. On the right pane you can explore our datasets.
                Open it <a href={config.adagucViewerURL} target='_blank'>here </a>.
              </span>
            </div>
          </Col>
        </Row>

      </div>);
  }
}
