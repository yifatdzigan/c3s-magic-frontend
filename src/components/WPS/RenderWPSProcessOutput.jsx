import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col,  Card, CardBody, CardText, CardLink, CardTitle,  Button } from 'reactstrap';


import ImagePreview from '../ImagePreview';
import YMLViewer from './YMLViewer';
import TXTViewer from './TXTViewer';
import SVGViewer from './SVGViewer';
import ADAGUCViewerComponent from '../ADAGUCViewerComponent';
import Icon from 'react-fa';

export default class RenderWPSProcessOutput extends Component {
    constructor() {
      super()
    }
    render () {
      const {processOutput, url, identifier, title, abstract} = this.props;
      let myProcessOutput = processOutput;
      if (!processOutput) {
        myProcessOutput = {
            Identifier:{
                value:identifier || '<value>'
            },
            Title:{
                value:title||'<title>'
            },
            Abstract:{
                value:abstract||'<abstract>'
            },
            Reference:{
                attr:{
                    href:url
                }
            }
        };
      }
      console.log('myProcessOutput:', myProcessOutput);
      let output = {
        identifier: null,
        title: '<no title>',
        abstract: '<no abstract>',
        data: null,
        imageLink: null,
        reference: null,
        esmRecipe: null,
        txtViewer:null,
        netcdfOpenDAP: null,
        svgViewer: null
      };
      if (myProcessOutput && myProcessOutput.Identifier && myProcessOutput.Identifier.value) { output.identifier = myProcessOutput.Identifier.value; }
      if (output.identifier === null) {
        return null;
      }
      if (myProcessOutput && myProcessOutput.Title && myProcessOutput.Title.value) { output.title = myProcessOutput.Title.value; }
      if (myProcessOutput && myProcessOutput.Abstract && myProcessOutput.Abstract.value) { output.abstract = myProcessOutput.Abstract.value; }
      /* Parse literaldata */
      if (myProcessOutput && myProcessOutput.Data) {
        if (myProcessOutput.Data.LiteralData && myProcessOutput.Data.LiteralData.value) {
          output.data = myProcessOutput.Data.LiteralData.value;
        }
      }
      
      /* Parse referenced data */
      if (myProcessOutput && myProcessOutput.Reference) {
        if (myProcessOutput.Reference.attr && myProcessOutput.Reference.attr.href) {
          output.reference = myProcessOutput.Reference.attr.href;
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
          /* Check if this is a svg file */
          if (output.reference.endsWith('.svg')) {
            output.svgViewer = output.reference;
          }
        }
      }
      console.log(output);
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
                {/* <Col><Button color='secondary' onClick={() =>{ this.props.resultClickCallback(output.imageLink);}}>Open image</Button></Col> */}
              </Row>)
            }
            { output.esmRecipe && (<Row><Col xs='10'><YMLViewer url={output.esmRecipe}></YMLViewer></Col></Row>) }
            { output.txtViewer && (<Row><Col xs='10'><TXTViewer url={output.txtViewer}></TXTViewer></Col></Row>) }
            { output.svgViewer && (<Row><Col xs='12'><SVGViewer url={output.svgViewer}></SVGViewer></Col></Row>) }
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
                      dapurl={output.netcdfOpenDAP}
                    />
  
  
            </Col></Row>) }
            { output.reference && <CardLink href={output.reference} target='_blank'><Icon name='download' /> Download</CardLink> }
          </CardBody>
        </Card>
      </div>);
    }
  };
  