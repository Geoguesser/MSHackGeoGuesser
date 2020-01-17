import * as React from "react";
import Layout from "../../components/layout/layout";
import MapView from "../../components/mapview/mapview";

interface GameProps {}

function Game(props: GameProps) {
  const [markerLatitude, setMarkerLatitude] = React.useState<number | undefined>();
  const [markerLongitude, setMarkerLongitude] = React.useState<number | undefined>();
  const [googleMapsObject, setGoogleMapsObject] = React.useState<any>();
  return (
    <Layout>
      <h1>Game Page</h1>
      <MapView
        setGoogleMapsObject={setGoogleMapsObject}
        markerLatitude={markerLatitude}
        markerLongitude={markerLongitude}
        setMarkerLatitude={setMarkerLatitude}
        setMarkerLongitude={setMarkerLongitude}
      />
    </Layout>
  );
}

export default Game;
