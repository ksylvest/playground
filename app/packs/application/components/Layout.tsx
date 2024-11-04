import { Outlet } from "react-router";
import { ScrollRestoration } from "react-router-dom";

import { Container, Section } from "tights";

import { Alerts } from "./alerts";
import { Footer } from "./app/footer";
import { Header } from "./app/header";
import { Auth } from "./auth";
import { Styles } from "./styles";

export const Layout: React.FC = () => (
  <>
    <ScrollRestoration />
    <Styles />
    <Header />
    <Container>
      <Section>
        <Alerts />
        <Outlet />
      </Section>
    </Container>
    <Footer />
    <Auth />
  </>
);
