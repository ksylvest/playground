import * as React from "react";

import { Body } from "./card/body";
import { Foot } from "./card/foot";
import { Head } from "./card/head";
import { Title } from "./card/title";

const Card: React.FC = ({ children }) => (
  <div className="modal-card">{children}</div>
);

const Combined = Object.assign(Card, {
  Body,
  Foot,
  Head,
  Title,
});

export { Combined as Card };
