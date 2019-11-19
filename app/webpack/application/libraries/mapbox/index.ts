import * as loadjs from "loadjs";

declare const MAPBOX_ACCESS_TOKEN: string | null;

const VERSION = "v1.4.1";

if (typeof window !== "undefined" && !!MAPBOX_ACCESS_TOKEN) {
  loadjs(
    [
      `https://api.mapbox.com/mapbox-gl-js/${VERSION}/mapbox-gl.js`,
      `https://api.mapbox.com/mapbox-gl-js/${VERSION}/mapbox-gl.css`,
    ],
    "mapboxgl",
    () => {
      mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    },
  );
}

export * from "./components";
