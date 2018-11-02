import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Progress, Card, CardBody, CardText, CardLink, CardTitle, CardSubtitle, Button } from 'reactstrap';
import ImagePreview from './ImagePreview';
import YMLViewer from './YMLViewer';
import TXTViewer from './TXTViewer';
import ADAGUCViewerComponent from './ADAGUCViewerComponent';
import Icon from 'react-fa';
export default class RenderProcesses extends Component {
  constructor() {
    super()
    this.renderProcess = this.renderProcess.bind(this);
    this.iterProcesses = this.iterProcesses.bind(this);
  }
  toArray (array) {
    if (!array) return [];
    if (array.length) {
      return array;
    } else {
      var newArray = [];
      newArray[0] = array;
      return newArray;
    }
  };
  renderProcessOutput (processOutput) {
    // console.log(processOutput);
    let output = {
      identifier: null,
      title: '<no title>',
      abstract: '<no abstract>',
      data: null,
      imageLink: null,
      reference: null,
      esmRecipe: null,
      txtViewer:null,
      netcdfOpenDAP: null
    };
    if (processOutput && processOutput.Identifier && processOutput.Identifier.value) { output.identifier = processOutput.Identifier.value; }
    if (output.identifier === null) {
      return null;
    }
    if (processOutput && processOutput.Title && processOutput.Title.value) { output.title = processOutput.Title.value; }
    if (processOutput && processOutput.Abstract && processOutput.Abstract.value) { output.abstract = processOutput.Abstract.value; }
    /* Parse literaldata */
    if (processOutput && processOutput.Data) {
      if (processOutput.Data.LiteralData && processOutput.Data.LiteralData.value) {
        output.data = processOutput.Data.LiteralData.value;
      }
    }
    /* Parse referenced data */
    if (processOutput && processOutput.Reference) {
      if (processOutput.Reference.attr && processOutput.Reference.attr.href) {
        output.reference = processOutput.Reference.attr.href;
        /* Check if is image */
        if (output.reference.endsWith('.png')) {
          output.imageLink = output.reference;
        }
        /* Check if is esmvaltool recipe */
        if (output.reference.endsWith('.yml')) {
          output.esmRecipe = output.reference;
        }
        /* Check if this is a textfile */
        if (output.reference.endsWith('.txt')) {
          output.txtViewer = output.reference;
        }
        /* Check if this is a NetCDF file served over opendap */
        if (output.reference.endsWith('.nc')) {
          output.netcdfOpenDAP = output.reference;
        }
      }
    }
    // console.log(output);

    return (<div key={output.identifier}>
      <Card style={{border:'none',backgroundColor:'#EEE', margin:'8px 0px 8px 0'}}>
        <CardBody>
          <CardTitle>{output.title}&nbsp;<span style={{color:'darkgrey',fontStyle:'italic'}}>-&nbsp;({output.identifier})</span></CardTitle>
          <CardText>{output.abstract}</CardText>
        </CardBody>
        <CardBody>
          { output.data && (<CardText>{output.data}</CardText>) }
          { output.imageLink && (<Row>
              <Col xs='10'><ImagePreview imagedata={output.imageLink}></ImagePreview></Col>
              <Col><Button color='secondary' onClick={() =>{ this.props.resultClickCallback(output.imageLink);}}>Open image</Button></Col>
            </Row>)
          }
          { output.esmRecipe && (<Row><Col xs='10'><YMLViewer url={output.esmRecipe}></YMLViewer></Col></Row>) }
          { output.txtViewer && (<Row><Col xs='10'><TXTViewer url={output.txtViewer}></TXTViewer></Col></Row>) }
          { output.netcdfOpenDAP && (<Row><Col xs='10'>
                  <ADAGUCViewerComponent
                    height={'300px'}
                    layers={[]}
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
                    wmsurl={output.netcdfOpenDAP}
                  />


          </Col></Row>) }
          { output.reference && <CardLink href={output.reference} target='_blank'><Icon name='download' /> Download</CardLink> }
        </CardBody>
      </Card>
    </div>);
  }
  renderProcess (process,processid) {
    const {actions, dispatch} = this.props;
    let processOutputs = {};
    try {
      const _processOutputs = process.result.ExecuteResponse.ProcessOutputs.Output;
      if (!_processOutputs['0']) {
        processOutputs['0'] = _processOutputs;
      } else {
        processOutputs = _processOutputs;
      }
    }catch (e){
    }
    return (
      <Card>
        <CardBody>
          <Row>
            <Col xs='11'><CardTitle>{process.id}) {process.message}</CardTitle></Col>
            <Col className='float-right'><Button color='danger' onClick={()=>{
              dispatch(actions.removeWPSResult(process.id));
            }}>X</Button>
            </Col>
          </Row>
          <Col> <div className='text-center'>{process.percentageComplete} </div><Progress value={process.percentageComplete} /></Col>

          { /* <Col style={{ backgroundColor: '#d9edf7', cursor: 'pointer', color: '#31708f' }} onClick={() => { this.props.resultClickCallback(value); }}>{shown}</Col> */ }
        <Row>
          <Col>
            {
              Object.keys(processOutputs).map((k) => {
                const processOutput = processOutputs[k];
                return this.renderProcessOutput(processOutput);
              })
            }
          </Col>
        </Row>
        </CardBody>
      </Card>
    );
  }

  iterProcesses (runningProcesses) {
    let result = [];
    Object.keys(runningProcesses).reverse().map((processid) => {
      result.push(Object.assign({}, this.renderProcess(runningProcesses[processid], processid), { key: processid }));
    });
    return result;
  }
  render () {
    const { runningProcesses } = this.props;
    return (<span>{this.iterProcesses(runningProcesses)}</span>);
  }
};

RenderProcesses.propTypes = {
  runningProcesses: PropTypes.object.isRequired,
  resultClickCallback: PropTypes.func.isRequired,
  actions: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};
