import * as React from "react";

import { Block } from "./panel/block";
import { Heading } from "./panel/heading";
import { Tabs } from "./panel/tabs";

const Panel: React.FC = ({ children }) =>
  <nav className="panel">{children}</nav>;

const Combined = Object.assign(Panel, {
  Block,
  Heading,
  Tabs,
});

export { Combined as Panel };
