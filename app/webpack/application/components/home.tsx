import * as React from "react";
import { Helmet } from "react-helmet";

export const Home: React.FC = () => (
  <>
    <Helmet>
      <title>Home | Playground</title>
    </Helmet>

    <div className="title">Welcome!</div>
  </>
);
