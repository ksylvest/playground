import * as React from "react";

import { Content } from "./card/content";
import { Footer } from "./card/footer";
import { Header } from "./card/header";
import { Image } from "./card/image";

const Card: React.FC = ({ children }) => (
  <div className="card">{children}</div>
);

const Combined = Object.assign(Card, {
  Content,
  Footer,
  Header,
  Image,
});
export { Combined as Card };
