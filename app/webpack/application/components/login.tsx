import * as classnames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';

import { Field } from './field';

import { Auth } from '../resources';
import { sentence } from '../utilities';

import { Types } from '../store/actions';

const DEFAULT_EXCEPTION = { base: ['an unknown error occurred while trying to login'] };

interface ILoginProps {
  onAuthenticate(): void;
}

interface ILoginState {
  email?: string;
  password?: string;
  errors?: { [key: string]: string[] };
  syncing?: Date;
}

class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: ILoginProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const { onSubmit, onChange } = this;
    const { email, password, syncing, errors } = this.state;
    return (
      <form onSubmit={onSubmit}>
        {errors && errors.base && <div className="notification is-danger">{sentence(errors.base)}</div>}
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
              Login
            </button>
          </div>
        </div>
      </form>
    );
  }

  private save = async () => {
    if (this.state.syncing) { return; }
    this.setState({ syncing: new Date() });

    const { email, password } = this.state;

    const auth = new Auth(email, password);
    try {
      await auth.save();
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

const ConnectedLogin = connect(
  undefined,
  (dispatch) => {
    return {
      onAuthenticate: () => {
        dispatch({ type: Types.AUTH_RESET });
      },
    };
  },
)(Login);

export { ConnectedLogin as Login };
