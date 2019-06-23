import * as React from "react";

import { Control } from "./form/control";
import { Field } from "./form/field";
import { File } from "./form/file";
import { Help } from "./form/help";
import { Icon } from "./form/icon";
import { Input } from "./form/input";
import { Label } from "./form/label";

const Form: React.FC<React.FormHTMLAttributes<HTMLFormElement>> = ({
  children,
  ...props
}) => (
  <form {...props}>{children}</form>
);

const Combined = Object.assign(Form, {
  Control,
  Field,
  File,
  Help,
  Icon,
  Input,
  Label,
});

export { Combined as Form };
