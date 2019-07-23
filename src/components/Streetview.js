import React from "react";
import ReactDOM from "react-dom";
// TODO: Maybe React-helmet can solve this?
import asyncLoading from "react-async-loader";

class Streetview extends React.Component {
  componentDidMount() {
    this.initialize();
  }

  componentDidUpdate() {
    this.initialize();
  }
  componentWillUnmount() {
    if (this.streetView) {
      this.props.googleMaps.event.clearInstanceListeners(this.streetView);
    }
  }

  initialize = () => {
    if (this.props.googleMaps && this.streetView == null) {
      const { position: location } = this.props.streetViewPanoramaOptions;
      const service = new this.props.googleMaps.StreetViewService();
      service.getPanorama({ location, radius: 500 }, (data, status) => {
        if (status === "OK") {
          const panorama = new this.props.googleMaps.StreetViewPanorama(
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
    return <div style={{ height: "100vh" }} />;
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
    googleMaps: {
      globalPath: "google.maps",
      url: `https://maps.googleapis.com/maps/api/js?key=${
        process.env.REACT_APP_GOOGLE_MAP_KEY
      }`,
      jsonp: true
    }
  };
}

export default asyncLoading(mapScriptsToProps)(Streetview);
