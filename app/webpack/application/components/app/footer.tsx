import * as React from "react";

import {
  Container,
  Content,
} from "tights";

export const Footer: React.FC = () => (
  <footer>
    <Container>
      <Content>
        <p className="has-text-centered">
          <span>by</span> {" "} <a href="https://kvn.app" target="_blank">Kevin Sylvestre</a>
        </p>
      </Content>
    </Container>
  </footer>
);
