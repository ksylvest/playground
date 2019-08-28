import * as React from "react";
import {
  useContext,
  useState,
} from "react";

import {
  Button,
  Delete,
  Modal,
  Tabs,
} from "tights";

import { Context as LoginContext } from "@application/components/login/context";
import { Fields as LoginFields } from "@application/components/login/fields";
import { Form as LoginForm } from "@application/components/login/form";
import { Submit as LoginSubmit } from "@application/components/login/submit";
import { Context as SignupContext } from "@application/components/signup/context";
import { Fields as SignupFields } from "@application/components/signup/fields";
import { Form as SignupForm } from "@application/components/signup/form";
import { Submit as SignupSubmit } from "@application/components/signup/submit";

import { Context } from "@application/components/context";

const Login = {
  Context: LoginContext,
  Fields: LoginFields,
  Form: LoginForm,
  Submit: LoginSubmit,
};

const Signup = {
  Context: SignupContext,
  Fields: SignupFields,
  Form: SignupForm,
  Submit: SignupSubmit,
};

enum Mode {
  Login = "Login",
  Signup = "Signup",
}

const DEFAULT_MODE = Mode.Signup;

export const Dialog: React.FC<{
  onCancel(): void;
  onAuth(): void;
}> = ({
  onCancel,
  onAuth,
}) => {
  const { auth } = useContext(Context);
  const [mode, setMode] = useState<Mode>(DEFAULT_MODE);
  const Auth = (() => {
    switch (mode) {
      case Mode.Login: return Login;
      case Mode.Signup: return Signup;
    }
  })();

  return (
    <Modal>
      <Modal.Background onClick={onCancel} />
      <Modal.Content>
        <Auth.Form
          onAuth={(session) => {
            auth(session);
            onAuth();
          }}
        >
          <Modal.Card>
            <Modal.Card.Head>
              <Modal.Card.Title>{mode}</Modal.Card.Title>
              <Delete onClick={onCancel} />
            </Modal.Card.Head>
            <Modal.Card.Body>
              <Tabs fullwidth>
                <Tabs.List>
                  <Tabs.Item active={mode === Mode.Login}>
                    <a onClick={() => setMode(Mode.Login)}>Login</a>
                  </Tabs.Item>
                  <Tabs.Item active={mode === Mode.Signup}>
                    <a onClick={() => setMode(Mode.Signup)}>Signup</a>
                  </Tabs.Item>
                </Tabs.List>
              </Tabs>
              <Auth.Fields />
            </Modal.Card.Body>
            <Modal.Card.Foot>
              <Auth.Context.Consumer
                children={({ loading }) => (
                  <>
                    <Button type="submit" loading={loading} disabled={loading} color="primary">{mode}</Button>
                    <Button type="button" disabled={loading} onClick={onCancel}>Close</Button>
                  </>
                )}
              />
            </Modal.Card.Foot>
          </Modal.Card>
        </Auth.Form>
      </Modal.Content>
    </Modal>
  );
};
