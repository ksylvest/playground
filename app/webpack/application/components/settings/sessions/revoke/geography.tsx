import * as React from "react";

import { IGeography } from "@application/types";

import { Map, Marker } from "@application/libraries/mapbox";

export const Geography: React.FC<{ geography: IGeography }> = ({ geography }) => {
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
