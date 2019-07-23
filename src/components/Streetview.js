import React from "react";
import ReactDOM from "react-dom";
// TODO: Maybe React-helmet can solve this?
import asyncLoading from "react-async-loader";

class StreetView extends React.Component {
  constructor(props) {
    super(props);
    this.streetView = null;
  }

  componentDidMount() {
    this.initialize(ReactDOM.findDOMNode(this));
  }

  componentDidUpdate() {
    this.initialize(ReactDOM.findDOMNode(this));
  }

  componentWillUnmount() {
    if (this.streetView) {
      this.props.googleMaps.event.clearInstanceListeners(this.streetView);
    }
  }

  initialize = canvas => {

    if (this.props.googleMaps && this.streetView == null) {
      this.streetView = new this.props.googleMaps.StreetViewPanorama(
        canvas,
        {
          ...this.props.streetViewPanoramaOptions,
          styles: [
            {
              
            }

          ]
        }
      );

      this.streetView.addListener("position_changed", () => {
        if (this.props.onPositionChanged) {
          this.props.onPositionChanged(this.streetView.getPosition());
        }
      });

      this.streetView.addListener("pov_changed", () => {
        if (this.props.onPovChanged) {
          this.props.onPovChanged(this.streetView.getPov());
        }
      });
    }
  };

  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "#eeeeee"
        }}
      />
    );
  }
}

StreetView.defaultProps = {
  streetViewPanoramaOptions: {
    position: { lat: 46.9171876, lng: 17.8951832 },
    pov: { heading: 0, pitch: 0 },
    zoom: 1
  }
};

function mapScriptsToProps() {
  return {
    googleMaps: {
      globalPath: "google.maps",
      url: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}`,
      jsonp: true
    }
  };
}

export default asyncLoading(mapScriptsToProps)(StreetView);
