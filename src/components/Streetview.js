import React from "react";
import ReactDOM from "react-dom";

class Streetview extends React.Component {
  state = {
    isLand: false,
    lat: getLat(),
    lng: getLng(),
    radius: 50,
    count: 0
  };
  componentDidMount() {
    pickCity();
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
function pickCity() {
  // var record_num = 3;
  //var allText = "../assets/goodCities.csv"; // or however many elements there are in each row
  // var entries = allTextLines[0].split(",");
  // var lines = [];
  // const results = [];
  //fs.createReadStream("../assets/goodCities.csv")
    // .pipe(csv())
    // .on("headers", headers => {
    //   console.log(results);
    // });

  // alert(lines);
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function getLat() {
  var min = 47.440755;
  var max = 47.809214;
  const lat = random(min, max);
  return lat;
}

function getLng() {
  var min = -122.405804;
  var max = -121.9935;
  var lng = random(min, max);
  return lng;
}

Streetview.defaultProps = {
  streetViewPanoramaOptions: {
    // position: { lat: 28.433127, lng: -81.47857 },
    pov: { heading: 0, pitch: 0 },
    zoom: 1
  }
};

export default Streetview;
