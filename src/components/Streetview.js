import React from "react";
import ReactDOM from "react-dom";
// TODO: Maybe React-helmet can solve this?
import asyncLoading from "react-async-loader";

class Streetview extends React.Component {
  state = {
    isLand: false,
    lat: getLat(),
    lng: getLng(),
    radius: 50,
    count: 0
  };
  componentDidMount() {
    const { lat, lng } = this.state;
    this.httpGetAsync(lat, lng, response => {
      this.setState({ isLand: !response.water });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.isLand) {
      var lat = getLat();
      var lng = getLng();
      this.httpGetAsync(lat, lng, response => {
        this.setState({ isLand: !response.water });
        if (!response.water) {
          this.setState({ lat: lat, lng: lng }, () => {
            this.initialize();
          });
        }
      });
    }
    if (prevState.radius < this.state.radius) {
      this.initialize();
    }
  }

  httpGetAsync = (lat, lng, callback) => {
    var theUrl = `https://api.onwater.io/api/v1/results/${lat},${lng}?access_token=${
      process.env.REACT_APP_WATER_IO
    }`;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
        callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  };

  initialize = () => {
    if (this.props.googleMaps && this.streetView == null) {
      const service = new this.props.googleMaps.StreetViewService();
      service.getPanorama(
        {
          location: { lat: this.state.lat, lng: this.state.lng },
          radius: this.state.radius
        },
        (data, status) => {
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
            if (this.state.radius < 5000000) {
              this.setState({ radius: this.state.radius * 10 });
            }
          }
        }
      );
    }
  };

  render() {
    return <div style={{ height: "100vh" }} />;
  }
}

function getLat() {
  var min = -90;
  var max = 90;
  var lat = Math.floor(Math.random() * 100000 * (+max - +min)) + +min;
  return lat / 1000000;
}

function getLng() {
  var min = -180;
  var max = 180;
  var lng = Math.floor(Math.random() * 100000 * (+max - +min)) + +min;
  return lng / 1000000;
}

Streetview.defaultProps = {
  streetViewPanoramaOptions: {
    // position: { lat: 28.433127, lng: -81.47857 },
    pov: { heading: 0, pitch: 0 },
    zoom: 1
  }
};

function mapScriptsToProps() {
  return {
    googleMaps: {
      globalPath: "google.maps",
      url: `https://maps.googleapis.com/maps/api/js?key=${
        process.env.REACT_APP_MAPS_API_KEY
      }`,
      jsonp: true
    }
  };
}

export default asyncLoading(mapScriptsToProps)(Streetview);
