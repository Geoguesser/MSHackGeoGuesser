import React from "react";
import ReactDOM from "react-dom";
import "../style/streetview.scss";
import { ActualLocation } from "../utils/types";

interface StreetViewProps {
  googleMaps: any;
  location: ActualLocation;
}

interface StreetViewState {
  radius: number;
}

class StreetView extends React.Component<StreetViewProps, StreetViewState> {
  state = {
    radius: 50
  };

  componentDidMount() {
    this.initializeMap();
  }

  initializeMap = () => {
    const { radius } = this.state;
    const { location, googleMaps } = this.props;

    const streetView = new googleMaps.StreetViewService();

    const panoramaOptions = {
      pov: { heading: 0, pitch: 0 },
      zoom: 1,
      addressControl: false,
      fullscreenControl: false,
      closeControl: false,
      showRoadLabels: false
    };

    const panorama = new googleMaps.StreetViewPanorama(ReactDOM.findDOMNode(this), panoramaOptions);

    // setup the streetview to the location with a margin of radius
    streetView.getPanorama(
      { location, radius },
      (data: { location: { pano: any } }, status: string) => {
        if (status === "OK") {
          // returns OK when there is a streetview image found
          panorama.setPano(data.location.pano);
          panorama.setPov({ heading: 270, pitch: 0 });
          panorama.setVisible(true);
        } else {
          // no street view image was found, so try and expand the radius until we find one
          // theoretically this could give black screens in very terrible coverage locations
          if (radius < 5000000) {
            this.setState({ radius: this.state.radius * 10 });
          }
        }
      }
    );
  };

  render() {
    // ReactDOM.findDomNode(this) will insert the street view into this dom element
    return <div className="streetview" />;
  }
}

export default StreetView;

// interface StreetViewProps {
//   googleMaps: any;
//   setStreetLat: React.Dispatch<React.SetStateAction<number>>;
//   setStreetLng: React.Dispatch<React.SetStateAction<number>>;
// }

// interface StreetViewState {
//   lat?: number;
//   lng?: number;
//   radius: number;
//   count: number;
//   googleMaps: any;
// }
// class Streetview extends React.Component<StreetViewProps, StreetViewState> {
//   state = {
//     location: pickCity(),
//     radius: 50,
//     count: 0,
//     googleMaps: this.props.googleMaps
//   };

//   componentDidMount() {
//     this.initialize();
//   }

//   componentDidUpdate(prevProps: StreetViewProps, prevState: StreetViewState) {
//     if (prevState.radius < this.state.radius) {
//       const { location } = this.state;
//       const lat = getLat(location.lat);
//       const lng = getLng(location.lng);
//       this.props.setStreetLat(lat);
//       this.props.setStreetLng(lng);
//       this.initialize();
//     }
//     if (prevState.googleMaps !== this.state.googleMaps) {
//       this.initialize();
//     }
//   }

//   initialize = () => {
//     if (this.state.googleMaps) {
//       const { location } = this.state;
//       const service = new this.state.googleMaps.StreetViewService();
//       service.getPanorama(
//         {
//           location: { lat: location.lat, lng: location.lng },
//           radius: this.state.radius
//         },
//         (data: { location: { pano: any } }, status: string) => {
//           if (status === "OK") {
//             const panorama = new this.state.googleMaps.StreetViewPanorama(
//               ReactDOM.findDOMNode(this),
//               {
//                 pov: { heading: 0, pitch: 0 },
//                 zoom: 1,
//                 addressControl: false,
//                 fullscreenControl: false,
//                 closeControl: false,
//                 showRoadLabels: false
//               }
//             );
//             panorama.setPano(data.location.pano);
//             panorama.setPov({
//               heading: 270,
//               pitch: 0
//             });
//             panorama.setVisible(true);
//             this.props.setStreetLat(location.lat || 0);
//             this.props.setStreetLng(location.lng || 0);
//           } else {
//             if (this.state.radius < 5000000) {
//               this.setState({ radius: this.state.radius * 10 });
//             }
//           }
//         }
//       );
//     }
//   };

//   render() {
//     return <div className="streetview" />;
//   }
// }

// export default Streetview;
