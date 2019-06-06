import * as cn from "classnames";
import * as React from "react";

import { Content } from "./dropdown/content";
import { Divider } from "./dropdown/divider";
import { Item } from "./dropdown/item";
import { Menu } from "./dropdown/menu";
import { Trigger } from "./dropdown/trigger";

const Dropdown: React.FC<{
  alignment?: "right" | "left";
  active?: boolean;
  hoverable?: boolean;
}> = ({
  alignment,
  active,
  hoverable,
  children,
}) => (
  <div className={cn("dropdown", active && "is-active", hoverable && "is-hoverable", alignment && `is-${alignment}`)}>
    {children}
  </div>
);

const Combined = Object.assign(Dropdown, {
  Content,
  Divider,
  Item,
  Menu,
  Trigger,
});

export { Combined as Dropdown };
