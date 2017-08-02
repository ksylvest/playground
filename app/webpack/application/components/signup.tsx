import * as classnames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';

import { Field } from './field';

import { User } from '../resources';
import { sentence } from '../utilities';

import { Types } from '../store/actions';

const DEFAULT_EXCEPTION = { base: ['an unknown error occurred while trying to signup'] };

interface ISignupProps {
  onAuthenticate(): void;
}

interface ISignupState {
  name?: string;
  email?: string;
  password?: string;
  errors?: { [key: string]: string[] };
  syncing?: Date;
}

class Signup extends React.Component<ISignupProps, ISignupState> {
  constructor(props: ISignupProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const { onSubmit, onChange } = this;
    const { name, email, password, syncing, errors } = this.state;
    return (
      <form onSubmit={onSubmit}>
        {errors && errors.base && <div className="notification is-danger">{sentence(errors.base)}</div>}
        <Field
          icon="info"
          type="text"
          field="name"
          value={name || ''}
          label="Name"
          placeholder="Name"
          errors={errors}
          onChange={onChange}
        />
        <Field
          icon="envelope"
          type="email"
          field="email"
          value={email || ''}
          label="Email"
          placeholder="Email"
          errors={errors}
          onChange={onChange}
        />
        <Field
          icon="lock"
          type="password"
          field="password"
          value={password || ''}
          label="Password"
          placeholder="Password"
          errors={errors}
          onChange={onChange}
        />
        <div className="field">
          <div className="control">
            <button
              className={classnames('button', 'is-primary', { 'is-loading': !!syncing })}
              disabled={!!syncing}
            >
              Signup
            </button>
          </div>
        </div>
      </form>
    );
  }

  private save = async () => {
    if (this.state.syncing) { return; }
    this.setState({ syncing: new Date() });

    const { name, email, password } = this.state;

    const user = new User(name, email, password);
    try {
      await user.save();
      this.props.onAuthenticate();
    } catch (exception) {
      this.setState({
        syncing: undefined,
        errors: exception.response ? exception.response.data : DEFAULT_EXCEPTION,
      });
    }
  }

  private onChange = (field: string, value: string) => {
    this.setState({ [field]: value });
  }

  private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    this.save();
  }
}

const ConnectedSignup = connect(
  undefined,
  (dispatch) => {
    return {
      onAuthenticate: () => {
        dispatch({ type: Types.AUTH_RESET });
      },
    };
  },
)(Signup);

export { ConnectedSignup as Signup };
