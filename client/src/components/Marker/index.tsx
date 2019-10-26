import React from "react";
import classnames from "classnames";
import marker from "../../assets/placeholder.png";
import flagMarker from "../../assets/red-flag.png";
import circleMarker from "../../assets/red-circle.png";
import styles from "./marker.module.css";

/* lat / lng are used by the wrapper component using this component */
function Marker({ lng, lat, isFlag, isCircle }: any): JSX.Element {
  const className = classnames({
    [styles["flag"]]: isFlag,
    [styles["circle"]]: isCircle,
    [styles["marker"]]: !isFlag && !isCircle
  });
  const src = isFlag ? flagMarker : isCircle ? circleMarker : marker;
  return (
    <div>
      <img className={className} src={src} alt="map marker" />
    </div>
  );
}

export default Marker;
