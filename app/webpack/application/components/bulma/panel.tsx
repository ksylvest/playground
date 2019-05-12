import * as React from "react";

import { Heading } from "./panel/heading";

const Panel: React.FC = ({ children }) =>
  <nav className="panel">{children}</nav>;

const Combined = Object.assign(Panel, {
  Heading,
});

export { Combined as Panel };
