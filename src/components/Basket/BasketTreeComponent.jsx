import React, { Component } from 'react';
import { Treebeard, decorators } from 'react-treebeard';
import PropTypes from 'prop-types';
import treeBeardStyling from '../../styles/stylingBasket/stylingBasket';
import { Button, Row } from 'reactstrap';
import ScrollArea from 'react-scrollbar';
import PreviewComponent from '../PreviewComponent';
import DapPreview from '../DapPreview';
import { withRouter } from 'react-router';
import Moment from 'react-moment';

class BasketTreeComponent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      cursor: null,
      previewActive: false
    };
    this.onToggle = this.onToggle.bind(this);
    this.deleteBasketItem = this.deleteBasketItem.bind(this);
    this.previewFile = this.previewFile.bind(this);
    decorators.Header = (properties) => {
      if (!properties.node.type === 'NODE') return;
      const style = properties.style;
      const iconType = properties.node.children ? 'folder' : 'file-text';
      const iconClass = `fa fa-${iconType}`;
      const iconStyle = { marginRight: '5px' };

      if (properties.node.type === 'LEAF') {
        return (
          <div style={{ verticalAlign: 'top', color: '#000000' }}>
            <div style={style.title}>
              <div>
                <i className={iconClass} style={iconStyle} />

                <span>{properties.node.name}</span>
                <Moment format='MMMM Do YYYY, HH:mm:ss' style={{ float: 'right' }}>{properties.node.date}</Moment>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div style={style.base}>
            <div style={style.title}>
              <div>
                {properties.node.name}
              </div>
            </div>
          </div>
        );
      }
    };
  }

  /**
   * What to do when the treebeard is toggled.
   **/
  onToggle (node, toggled) {
    console.log(node, toggled);
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }

    node.active = true;

    if (node.children) {
      node.toggled = toggled;
    }

    /* When toggled, preview is always not active. */
    this.setState({ cursor: node, previewActive: false });

    if (node.dapurl) {
      this.setState({ dapurl : node.dapurl });
    }
  }

  /**
   * Deleting an item by dispatching an action.
   **/
  deleteBasketItem () {
    const { dispatch, actions } = this.props;

    /* Getting the path of the currently selected item. */
    let pathItem = this.state.cursor.id;
    const pathItemWithoutGoogleId =
      pathItem.substring(pathItem.indexOf('/'), pathItem.length);

    dispatch(actions.deleteBasketItem({ path: pathItemWithoutGoogleId }));
  }

  /**
   * Download a basket item.
   **/
  downloadBasketItem () {
    // There's always an if..
    if (!this.state.cursor) return;

    /* this.state.cursor is always the current selected item in the basket. */
    window.location = this.state.cursor.httpurl;
  }

  previewFile () {
    this.setState({ previewActive: !this.state.previewActive });
  }

  /**
   * Small functions that checks if selected file is a CSV file.
   * Only then, activate the preview button.
   */
  isPreviewButtonDisabled () {
    if (!this.state.cursor) return false;
    return !(this.state.cursor.type === 'LEAF' && this.state.cursor.name.endsWith('.csv'));
  }

  /**
   * Small functions that checks if selected file is a CSV file.
   * Only then, activate the wrangle button.
   */
  isWrangleButtonDisabled () {
    if (!this.state.cursor) return false;
    return !(this.state.cursor.type === 'LEAF' && this.state.cursor.name.endsWith('.csv'));
  }

  /**
   * Small functions that checks if selected file is a CSV file.
   * Only then, activate the download button.
   */
  isDownloadButtonDisabled () {
    if (!this.state.cursor) return false;
    return this.state.cursor.type === 'NODE';
  }

  // goToWrangler () {
  //   if (!this.state.cursor) return;

  //   const { dispatch } = this.props;

  //   let fullId = this.state.cursor.id;
  //   const idWithoutGoogleId = fullId.substring(fullId.indexOf('/') + 1);

  //   dispatch(wpsActions.setCSVFileToWrangle({ fileName: idWithoutGoogleId }));
  //   this.props.router.push('/wrangler');
  // }

  render () {


    return (
      <div className='basketTreeContainer'>
        <Row className='basketTreeContainerMainSection'>
          <ScrollArea speed={1} horizontal={false} contentClassName='content' className='scrollAreaBasket' >
            {/* More about Treebeard: https://github.com/alexcurtis/react-treebeard */}
            <Treebeard
              data={this.props.data}
              onToggle={this.onToggle}
              style={treeBeardStyling}
              decorators={decorators}
            />
          </ScrollArea>
        </Row>
        <Row style={{ minHeight: '60px' }}>
          <hr /> {/* Dividing line, for dividing the tree and the buttons. */}
          <Button className='basketButton' onClick={() => this.props.router.push('/upload')}>Upload</Button>
          <Button className='basketButton' onClick={() => this.previewFile()}
            disabled={this.isPreviewButtonDisabled()}>Preview</Button>
          <Button className='basketButton' onClick={() => this.downloadBasketItem()}
            disabled={this.isDownloadButtonDisabled()}>Download</Button>
          <Button className='basketButton' onClick={() => this.deleteBasketItem()}>Delete</Button>
          <hr />
          {
            this.state.previewActive
            ? <PreviewComponent
              file={this.state.cursor ? this.state.cursor.httpurl : ''}
              tableClassName='previewTable'
              componentClassName='previewComponent'
              numberOfLinesDisplayed={30} />
            : null
          }
        </Row>
        { this.state.dapurl
          ? <Row>
            <DapPreview dapurl={this.state.dapurl} closeCallback={() => { this.setState({ dapurl:null }); }} />
          </Row> : null
        }
      </div>
    );
  }
}

BasketTreeComponent.propTypes = {
  // wpsActions: PropTypes.object.isRequired,
  data: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  router: PropTypes.object
};

export default withRouter(BasketTreeComponent);
