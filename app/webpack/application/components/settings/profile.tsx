import * as React from "react";

import { Fields } from "./profile/fields";

export const Profile: React.FC = () => (
  <>
    <h2 className="title">Profile</h2>
    <hr />
    <Fields loading save={() => { /* noop */ }} />
  </>
);
