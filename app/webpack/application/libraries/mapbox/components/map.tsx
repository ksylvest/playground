import * as React from "react";
import { useEffect, useRef, useState } from "react";

import { Context } from "../context";

import { useLoadJS } from "@application/libraries/loadjs";

const STYLE = "mapbox://styles/mapbox/streets-v11";

export const Map: React.FC<{
  style?: React.CSSProperties;
  center?: mapboxgl.LngLat;
}> = ({ center, children, style }) => {
  const [map, setMap] = useState<mapboxgl.Map | undefined>();
  const ref = useRef<HTMLDivElement>(null);
  const ready = useLoadJS("mapboxgl");

  useEffect(() => {
    if (!ready || !ref.current) {
      return;
    }

    const map = new mapboxgl.Map({
      center: center,
      container: ref.current,
      style: STYLE,
    });
    setMap(map);

    return (): void => {
      map.remove();
      setMap(undefined);
    };
  }, [ready, ref, center]);

  if (!ready) {
    return null;
  }

  return (
    <>
      <div ref={ref} style={style} />
      <Context.Provider value={{ map }} children={children} />
    </>
  );
};
