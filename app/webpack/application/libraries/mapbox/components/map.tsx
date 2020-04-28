import * as mapboxgl from "mapbox-gl";
import * as React from "react";
import { useEffect, useRef, useState } from "react";

import { Context } from "../context";

const STYLE = "mapbox://styles/mapbox/streets-v11";

declare const MAPBOX_ACCESS_TOKEN: string | undefined;

export const Map: React.FC<{
  style?: React.CSSProperties;
  center?: mapboxgl.LngLat;
}> = ({ center, children, style }) => {
  const [map, setMap] = useState<mapboxgl.Map | undefined>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const map = new mapboxgl.Map({
      accessToken: MAPBOX_ACCESS_TOKEN,
      center: center,
      container: ref.current,
      style: STYLE,
    });
    setMap(map);

    return (): void => {
      map.remove();
      setMap(undefined);
    };
  }, [ref, center]);

  return (
    <>
      <div ref={ref} style={style} />
      <Context.Provider value={{ map }} children={children} />
    </>
  );
};
