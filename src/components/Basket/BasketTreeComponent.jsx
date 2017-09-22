import React, { Component } from 'react';
import { Treebeard, decorators } from 'react-treebeard';
import PropTypes from 'prop-types';
import treeBeardStyling from '../../styles/stylingBasket/stylingBasket';
import { Button } from 'reactstrap';
import ScrollArea from 'react-scrollbar';
import PreviewComponent from '../PreviewComponent';
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
  }

  /**
   * What to do when the treebeard is toggled.
   **/
  onToggle (node, toggled) {
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }

    node.active = true;

    if (node.children) {
      node.toggled = toggled;
    }

    /* When toggled, preview is always not active. */
    this.setState({ cursor: node, previewActive: false });
  }

  /**
   * Deleting an item by dispatching an action.
   **/
  deleteBasketItem () {
    const { dispatch, actions, accessToken } = this.props;
    if (!accessToken) return;

    /* Getting the path of the currently selected item. */
    let pathItem = this.state.cursor.id;
    const pathItemWithoutGoogleId =
      pathItem.substring(pathItem.indexOf('/'), pathItem.length);

    dispatch(actions.deleteBasketItem({ accessToken: accessToken,
      path: pathItemWithoutGoogleId }));
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

  goToWrangler () {
    if (!this.state.cursor) return;

    const { dispatch, wpsActions } = this.props;

    let fullId = this.state.cursor.id;
    const idWithoutGoogleId = fullId.substring(fullId.indexOf('/') + 1);

    dispatch(wpsActions.setCSVFileToWrangle({ fileName: idWithoutGoogleId }));
    this.props.router.push('/wrangler');
  }

  render () {
    decorators.Header = (props) => {
      if (!props.node.type === 'NODE') return;
      const style = props.style;
      if (props.node.type === 'LEAF') {
        return (
          <div style={{ verticalAlign: 'top', color: '#000000' }}>
            <div style={style.title}>
              <div>
                <span>{props.node.name}</span>
                <Moment format='MMMM Do YYYY, HH:mm:ss' style={{ float: 'right' }}>{props.node.date}</Moment>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div style={style.base}>
            <div style={style.title}>
              <div>
                {props.node.name}
              </div>
            </div>
          </div>
        );
      }
    };

    return (
      <div>
        <ScrollArea speed={1} horizontal={false} contentClassName='content' className='scrollAreaBasket' >
          {/* More about Treebeard: https://github.com/alexcurtis/react-treebeard */}
          <Treebeard
            data={this.props.data}
            onToggle={this.onToggle}
            style={treeBeardStyling}
            decorators={decorators}
          />
        </ScrollArea>
        <hr /> {/* Dividing line, for dividing the tree and the buttons. */}
        <Button className='basketButton' onClick={() => this.props.router.push('/upload')}>Upload</Button>
        <Button className='basketButton' onClick={() => this.previewFile()}
          disabled={this.isPreviewButtonDisabled()}>Preview</Button>
        <Button className='basketButton' onClick={() => this.goToWrangler()}
          disabled={this.isWrangleButtonDisabled()}>Wrangle</Button>
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
      </div>
    );
  }
}

BasketTreeComponent.propTypes = {
  wpsActions: PropTypes.object.isRequired,
  data: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  accessToken: PropTypes.string.isRequired,
  router: PropTypes.object
};

export default withRouter(BasketTreeComponent);
