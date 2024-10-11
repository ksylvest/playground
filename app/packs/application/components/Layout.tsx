import { Outlet } from "react-router";

import { Container, Section } from "tights";

import { Alerts } from "./alerts";
import { Footer } from "./app/footer";
import { Header } from "./app/header";
import { Auth } from "./auth";
import { Styles } from "./styles";

export const Layout: React.FC = () => (
  <>
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
