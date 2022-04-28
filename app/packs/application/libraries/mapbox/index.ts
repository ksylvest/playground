import loadjs from "loadjs";

const VERSION = "v2.0.0";

if (typeof window !== "undefined") {
  const MAPBOX_ACCESS_TOKEN = document.head.querySelector('meta[name="mapbox-access-token"]').getAttribute("content");
  if (MAPBOX_ACCESS_TOKEN) {
    loadjs(
      [
        `https://api.mapbox.com/mapbox-gl-js/${VERSION}/mapbox-gl.js`,
        `https://api.mapbox.com/mapbox-gl-js/${VERSION}/mapbox-gl.css`,
      ],
      "mapboxgl",
      () => {
        mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
      }
    );
  }
}

export * from "./components";
