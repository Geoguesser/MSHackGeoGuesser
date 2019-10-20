import React from "react";
import marker from "../../assets/placeholder.png";
import styles from "./marker.module.css";

function Marker(): JSX.Element {
  return (
    <div>
      <img className={styles["marker"]} src={marker} alt="map marker" />
    </div>
  );
}

export default Marker;
