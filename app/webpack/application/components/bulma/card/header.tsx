import * as React from "react";

import { Title } from "./header/title";

const Content: React.FC = ({ children }) => (
  <header className="card-header">{children}</header>
);

const Combined = Object.assign(Content, { Title });
export { Combined as Header };
