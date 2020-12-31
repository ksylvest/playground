import * as React from "react";
import { useState } from "react";

import { Button, Buttons } from "tights";

import { Build } from "./sources/build";
import { Default } from "./sources/default";
import { Destroy } from "./sources/destroy";
import { List } from "./sources/list";

import { Billing__Source } from "@root/app_schema";

const DEFAULT_BUILDING = false;

export const Sources: React.FC<{
  sources: Billing__Source[];
}> = ({ sources }) => {
  const [building, setBuilding] = useState<boolean>(DEFAULT_BUILDING);
  const [destroying, setDestroying] = useState<Billing__Source | undefined>();
  const [defaulting, setDefaulting] = useState<Billing__Source | undefined>();

  const onClose = (): void => {
    setBuilding(DEFAULT_BUILDING);
    setDestroying(undefined);
    setDefaulting(undefined);
  };

  return (
    <>
      <List sources={sources} onDestroy={setDestroying} onDefault={setDefaulting} />
      <Buttons>
        <Button fullwidth color="primary" onClick={(): void => setBuilding(!building)}>
          Add a Card
        </Button>
      </Buttons>
      {destroying && <Destroy source={destroying} onClose={onClose} />}
      {defaulting && <Default source={defaulting} onClose={onClose} />}
      {building && <Build onClose={onClose} />}
    </>
  );
};
