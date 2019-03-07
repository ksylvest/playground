import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as classnames from "classnames";
import * as React from "react";

import { sentence } from "../utilities";

interface IFieldErrors {
  [key: string]: string[];
}

interface IFieldProps {
  icon: "envelope" | "lock" | "info";
  type: "email" | "password" | "text";
  field: string;
  value: string;
  label: string;
  placeholder: string;
  errors?: IFieldErrors;
  onChange(field: string, value: string): void;
}

class Field extends React.Component<IFieldProps> {
  constructor(props: IFieldProps) {
    super(props);
  }

  public render() {
    const { icon, label, value, placeholder, type } = this.props;

    return (
      <div className="field">
        <label className="label">{label}</label>
        <div className="control has-icons-left has-icons-right">
          <input
            className={classnames("input", { "is-success": this.valid, "is-danger": this.invalid })}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={this.onChange}
          />
          <span className="icon is-small is-left"><FontAwesomeIcon icon={icon} /></span>
          <span className="icon is-small is-right">
            {this.valid && <FontAwesomeIcon icon="check-square" />}
            {this.invalid && <FontAwesomeIcon icon="exclamation-circle" />}
          </span>
          {this.invalid && <p className="help is-danger">{this.help}</p>}
        </div>
      </div>
    );
  }

  private get help(): string | undefined {
    const { errors, field } = this.props;
    if (errors === undefined || errors[field] === undefined) { return; }
    return sentence(errors[field]);
  }

  private get invalid(): boolean {
    const { errors, field } = this.props;
    return errors !== undefined && errors[field] !== undefined;
  }

  private get valid(): boolean {
    const { errors, field } = this.props;
    return errors !== undefined && errors[field] === undefined;
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();

    this.props.onChange(this.props.field, event.target.value);
  }
}

export { Field };
