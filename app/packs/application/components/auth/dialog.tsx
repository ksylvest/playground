import React from "react";
import { useContext, useState } from "react";

import {
  Button,
  Delete,
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardBody,
  ModalCardFoot,
  ModalCardHead,
  ModalCardTitle,
  ModalContent,
  Tabs,
  TabsItem,
  TabsList,
} from "tights";

import { World } from "@application/contexts/world";

import { Context as LoginContext } from "@application/components/login/context";
import { Fields as LoginFields } from "@application/components/login/fields";
import { Form as LoginForm } from "@application/components/login/form";
import { Submit as LoginSubmit } from "@application/components/login/submit";
import { Context as SignupContext } from "@application/components/signup/context";
import { Fields as SignupFields } from "@application/components/signup/fields";
import { Form as SignupForm } from "@application/components/signup/form";
import { Submit as SignupSubmit } from "@application/components/signup/submit";

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

const DEFAULT_MODE = Mode.Login;

const AUTHS = {
  [Mode.Login]: Login,
  [Mode.Signup]: Signup,
};

export const Dialog: React.FC<{
  onCancel(): void;
  onAuth(): void;
}> = ({ onCancel, onAuth }) => {
  const [mode, setMode] = useState<Mode>(DEFAULT_MODE);
  const Auth = AUTHS[mode];

  return (
    <Modal>
      <ModalBackground onClick={onCancel} />
      <ModalContent>
        <Auth.Form onAuth={onAuth}>
          <ModalCard>
            <ModalCardHead>
              <ModalCardTitle>{mode}</ModalCardTitle>
              <Delete onClick={onCancel} />
            </ModalCardHead>
            <ModalCardBody>
              <Tabs fullwidth>
                <TabsList>
                  <TabsItem active={mode === Mode.Login}>
                    <a
                      href="#"
                      onClick={(event): void => {
                        event.preventDefault();
                        event.stopPropagation();
                        setMode(Mode.Login);
                      }}
                    >
                      Login
                    </a>
                  </TabsItem>
                  <TabsItem active={mode === Mode.Signup}>
                    <a
                      href="#"
                      onClick={(event): void => {
                        event.preventDefault();
                        event.stopPropagation();
                        setMode(Mode.Signup);
                      }}
                    >
                      Signup
                    </a>
                  </TabsItem>
                </TabsList>
              </Tabs>
              <Auth.Fields />
            </ModalCardBody>
            <ModalCardFoot>
              <Auth.Context.Consumer
                children={({ loading }): React.ReactNode => (
                  <>
                    <Button type="submit" loading={loading} disabled={loading} color="primary">
                      {mode}
                    </Button>
                    <Button type="button" disabled={loading} onClick={onCancel}>
                      Close
                    </Button>
                  </>
                )}
              />
            </ModalCardFoot>
          </ModalCard>
        </Auth.Form>
      </ModalContent>
    </Modal>
  );
};
