import React, { Component } from 'react';
import PropTypes from 'prop-types';

class YoutubeVideo extends Component {

  componentWillMount () {
    console.log("\n\nDEBUG Youtube:\n\n " + this.props.video);
    console.log(this.props.video);
  }

  componentDidMount(){
  }

  render () {
      var videoSrc = "https://www.youtube.com/embed/" +
      this.props.video + "?autoplay=" +
      this.props.autoplay + "&rel=" +
      this.props.rel + "&modestbranding=" +
      this.props.modest;
      return (
        <div className="container">
          <iframe className="player" type="text/html" width="100%" height="100%"
            src={videoSrc}
            frameBorder="0" allowFullScreen />
        </div>
          );
  }

}

// YoutubeVideo.propTypes = {
//   video: PropTypes.string
// };


class DiagnosticPlot extends Component {
  render () {
       return (
          <div><img src={this.props.url} width="100%" height="100%" /></div>
          );
  }
}

// DiagnosticPlot.propTypes = {
//   url: PropTypes.string
// };


export {
  YoutubeVideo,
  DiagnosticPlot
}
