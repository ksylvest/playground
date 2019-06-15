import * as cn from "classnames";
import * as React from "react";

import { Brand } from "./navbar/brand";
import { Burger } from "./navbar/burger";
import { Divider } from "./navbar/divider";
import { Dropdown } from "./navbar/dropdown";
import { End } from "./navbar/end";
import { Item } from "./navbar/item";
import { Link } from "./navbar/link";
import { Menu } from "./navbar/menu";
import { Start } from "./navbar/start";

type Color = "primary" | "link" | "info" | "success" | "warning" | "danger" | "black" | "dark"  | "light" | "white";

const Navbar: React.FC<{
  color?: Color;
}> = ({
  color,
  children,
}) =>
  <nav className={cn("navbar", color && `is-${color}`)}>{children}</nav>;

const Combined = Object.assign(Navbar, {
  Brand,
  Burger,
  Divider,
  Dropdown,
  End,
  Item,
  Link,
  Menu,
  Start,
});

export { Combined as Navbar };
