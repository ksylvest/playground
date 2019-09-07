import * as React from "react";
import { useContext, useEffect, useState } from "react";
export * from "./marker";

import { Context } from "../context";

export const Marker: React.FC<{
  coordinate: mapboxgl.LngLat;
}> = ({ coordinate }) => {
  const { map } = useContext(Context);
  const [marker] = useState(() => new mapboxgl.Marker());
  useEffect(() => {
    marker.setLngLat(coordinate);
  }, [coordinate]);

  useEffect(() => {
    if (!map) {
      return;
    }
    marker.addTo(map);
    return () => {
      marker.remove();
    };
  }, [map]);

  return null;
};
