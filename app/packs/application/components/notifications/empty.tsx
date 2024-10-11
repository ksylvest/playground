import { Hero, HeroBody, Subtitle, Title } from "tights";

export const Empty: React.FC = () => (
  <Hero color="light">
    <HeroBody>
      <Title tag="h1">Nothing to See</Title>
      <Subtitle tag="h2">Your Are All Caught up for Notifications</Subtitle>
    </HeroBody>
  </Hero>
);
