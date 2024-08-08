import React from "react";

import { Container, Content } from "tights";

export const Footer: React.FC = () => (
  <footer>
    <Container>
      <Content>
        <p className="has-text-centered">
          <span>by</span>{" "}
          <a href="https://ksylvest.com" target="_blank" rel="noopener">
            Kevin Sylvestre
          </a>
        </p>
      </Content>
    </Container>
  </footer>
);
