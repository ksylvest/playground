import * as cn from "classnames";
import * as React from "react";

import { Background } from "./modal/background";
import { Card } from "./modal/card";
import { Close } from "./modal/close";
import { Content } from "./modal/content";

const DEFAULT_ACTIVE = true;

const Modal: React.FC<{
  active?: boolean;
}> = ({
  children,
  active = DEFAULT_ACTIVE,
}) => (
  <div className={cn("modal", active && "is-active")}>{children}</div>
);

const Combined = Object.assign(Modal, {
  Background,
  Card,
  Close,
  Content,
});

export { Combined as Modal };
