import * as React from "react";

import { Item } from "./level/item";
import { Left } from "./level/left";
import { Right } from "./level/right";

const Level: React.FC = ({ children }) => (
  <nav className="level">
    {children}
  </nav>
);

const Combined = Object.assign(Level, {
  Item,
  Left,
  Right,
});

export { Combined as Level };
