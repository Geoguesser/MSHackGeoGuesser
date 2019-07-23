import React from "react";
import ReactDOM from "react-dom";
import { Game } from '../App'
// TODO: Maybe React-helmet can solve this?
import asyncLoading from "react-async-loader";

class Streetview extends React.Component {
  componentDidMount() {
    this.state = {
      maps: {}
    }
  }

  componentDidUpdate(newState) {
    this.initialize();
  }

  componentWillUnmount() {
    if (this.streetView) {
      this.state.maps.event.clearInstanceListeners(this.streetView);
    }
  }

  setMap = (maps, map) => {
    console.log("setMap", maps)
    this.setState({ maps }, () => {
      this.initialize();
    });
  }
  
  initialize = () => {
    if (this.state.maps && this.streetView == null) {
      const { position: location } = this.props.streetViewPanoramaOptions;
      const service = new this.state.maps.StreetViewService();
      service.getPanorama({ location, radius: 500 }, (data, status) => {
        if (status === "OK") {
          const panorama = new this.state.maps.StreetViewPanorama(
            ReactDOM.findDOMNode(this),
            {
              ...this.props.streetViewPanoramaOptions,
              addressControl: false,
              fullscreenControl: false,
              closeControl: false,
              showRoadLabels: false
            }
          );
          panorama.setPano(data.location.pano);
          panorama.setPov({
            heading: 270,
            pitch: 0
          });
          panorama.setVisible(true);
        } else {
          console.log(status);
        }
      });
    }
  };

  render() {
    return (
    <div style={{ height: "100vh" }}>
      <Game setMap={this.setMap}/>
    </div>);
  }
}

Streetview.defaultProps = {
  streetViewPanoramaOptions: {
    position: { lat: 28.433127, lng: -81.47857 },
    pov: { heading: 0, pitch: 0 },
    zoom: 1
  }
};

function mapScriptsToProps() {
  return {
  };
}

export default asyncLoading(mapScriptsToProps)(Streetview);
