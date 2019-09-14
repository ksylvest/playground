import * as React from "react";

import { GeographyFragment } from "@root/app_schema";

import { Map, Marker } from "@application/libraries/mapbox";

export const Geography: React.FC<{ geography: GeographyFragment }> = ({ geography }) => {
  const coordinate: mapboxgl.LngLat = [geography.longitude, geography.latitude];

  return (
    <>
      <p>
        <strong>
          {geography.city}, {geography.region}, {geography.country}
        </strong>
      </p>
      <Map center={coordinate} style={{ height: "200px" }}>
        <Marker coordinate={coordinate} />
      </Map>
    </>
  );
};
