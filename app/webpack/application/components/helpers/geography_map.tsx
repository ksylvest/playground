import * as React from "react";

import { GeographyFragment } from "@root/app_schema";

import { Map, Marker } from "@application/libraries/mapbox";

export const GeographyMap: React.FC<{ geography: GeographyFragment }> = ({ geography }) => {
  const coordinate: mapboxgl.LngLat = [geography.longitude, geography.latitude];

  return (
    <Map center={coordinate} style={{ height: "200px" }}>
      <Marker coordinate={coordinate} />
    </Map>
  );
};
