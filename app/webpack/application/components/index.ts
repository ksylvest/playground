import ReactRailsUJS from "react_ujs";
import { App } from "./app";

ReactRailsUJS.getConstructor = (name: string) => {
  switch (name) {
    case "App": return App;
  }
};
