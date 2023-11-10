import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";
import { Marker as WanderlustMarker } from "@objects";

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 96px - 88px)",
  borderRadius: "12px",
};

type Center = {
  lat: number;
  lng: number;
};

type Props = {
  mapCenter: Center;
  mapZoomLevel: number;
  pointsOfInterest: WanderlustMarker[];
};

const mapOptions = {
  disableDefaultUI: true, // this will disable all default UI components
  zoomControl: false, // for additional control, you can disable zoom controls explicitly
};

function InteractiveMap({ mapCenter, mapZoomLevel, pointsOfInterest }: Props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={mapCenter}
      zoom={mapZoomLevel}
      options={mapOptions}
      onLoad={onMapLoad}
    >
      {pointsOfInterest.map((poi, index) => (
        <Marker key={index} position={{ lat: poi.lat, lng: poi.lng }} />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default InteractiveMap;
