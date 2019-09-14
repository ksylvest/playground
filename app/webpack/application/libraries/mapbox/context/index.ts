import * as React from "react";

export const Context = React.createContext<{
  map?: mapboxgl.Map;
}>({
  map: undefined,
});
