import '../style/streetview.scss';
import React from "react";
import ReactDOM from "react-dom";

class Streetview extends React.Component {
  state = {
    isLand: false,
    lat: null,
    lng: null,
    radius: 50,
    count: 0
  };
  componentDidMount() {
    const { lat, lng } = pickCity();
    this.setState({ lat: lat, lng: lng });
    this.httpGetAsync(lat, lng, response => {
      this.setState({ isLand: !response.water });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.isLand) {
      var lat = getLat(this.state.lat);
      var lng = getLng(this.state.lng);
      this.httpGetAsync(lat, lng, response => {
        this.setState({ isLand: !response.water });
        if (!response.water) {
          // TODO:make sure this functionality is still working
          this.props.setStreetLat(lat);
          this.props.setStreetLng(lng);
          this.initialize();
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
    if (this.props.googleMaps) {
      const service = new this.props.googleMaps.StreetViewService();
      const { streetLat, streetLng } = this.props;
      service.getPanorama(
        {
          location: { lat: streetLat, lng: streetLng },
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
    return <div className="streetview" />;
  }
}
function pickCity() {
  var json = require("../assets/cities.json");
  var item = json[Math.floor(Math.random() * json.length)];
  return item;
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function getLat(lat) {
  var min = lat - 0.5;
  var max = lat + 0.5;
  const l = random(min, max);
  return l;
}

function getLng(lng) {
  var min = lng - 0.5;
  var max = lng + 0.5;
  var l = random(min, max);
  return l;
}

Streetview.defaultProps = {
  streetViewPanoramaOptions: {
    // position: { lat: 28.433127, lng: -81.47857 },
    pov: { heading: 0, pitch: 0 },
    zoom: 1
  }
};

export default Streetview;
