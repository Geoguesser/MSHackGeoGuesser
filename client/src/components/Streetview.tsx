import React from "react";
import ReactDOM from "react-dom";
import { getLat, getLng, pickCity } from "../utils/helpers";
import "../style/streetview.scss";

interface StreetViewProps {
  googleMaps: any;
  setStreetLat: React.Dispatch<React.SetStateAction<number>>;
  setStreetLng: React.Dispatch<React.SetStateAction<number>>;
}

interface StreetViewState {
  lat?: number;
  lng?: number;
  radius: number;
  count: number;
  googleMaps: any;
}
class Streetview extends React.Component<StreetViewProps, StreetViewState> {
  state = {
    lat: undefined,
    lng: undefined,
    radius: 50,
    count: 0,
    googleMaps: this.props.googleMaps
  };

  componentDidMount() {
    const { lat, lng } = pickCity();
    this.setState({ lat: lat, lng: lng }, () => {
      this.initialize();
    });
  }

  componentDidUpdate(prevProps: StreetViewProps, prevState: StreetViewState) {
    if (prevState.radius < this.state.radius) {
      const lat = getLat(this.state.lat);
      const lng = getLng(this.state.lng);
      this.props.setStreetLat(lat);
      this.props.setStreetLng(lng);
      this.initialize();
    }
    if (prevState.googleMaps !== this.state.googleMaps) {
      this.initialize();
    }
  }

  initialize = () => {
    if (this.state.googleMaps) {
      const service = new this.state.googleMaps.StreetViewService();
      service.getPanorama(
        {
          location: { lat: this.state.lat, lng: this.state.lng },
          radius: this.state.radius
        },
        (data: { location: { pano: any } }, status: string) => {
          if (status === "OK") {
            const panorama = new this.state.googleMaps.StreetViewPanorama(ReactDOM.findDOMNode(this), {
              pov: { heading: 0, pitch: 0 },
              zoom: 0,
              addressControl: false,
              fullscreenControl: false,
              closeControl: false,
              showRoadLabels: false
            });
            panorama.setPano(data.location.pano);
            panorama.setPov({
              heading: 270,
              pitch: 0
            });
            panorama.setVisible(true);
            this.props.setStreetLat(this.state.lat || 0);
            this.props.setStreetLng(this.state.lng || 0);
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

export default Streetview;
