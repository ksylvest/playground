import * as React from "react";

import { Item } from "./footer/item";

const Content: React.FC = ({ children }) => (
  <footer className="card-footer">{children}</footer>
);

const Combined = Object.assign(Content, { Item });
export { Combined as Footer };
