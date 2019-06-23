import * as React from "react";

import { Content } from "./media/content";
import { Left } from "./media/left";
import { Right } from "./media/right";

const Media: React.FC = ({ children }) => (
  <article className="media">
    {children}
  </article>
);

const Combined = Object.assign(Media, {
  Content,
  Left,
  Right,
});

export { Combined as Media };
