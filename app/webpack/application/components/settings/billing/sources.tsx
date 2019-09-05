import * as React from "react";
import { useState } from "react";

import { Button, Buttons } from "tights";

import { Build } from "./sources/build";
import { Default } from "./sources/default";
import { Destroy } from "./sources/destroy";
import { List } from "./sources/list";

import { IBillingSource } from "@application/types";

const DEFAULT_BUILDING = false;

export const Sources: React.FC<{
  sources: IBillingSource[];
  refetch(): void;
}> = ({ sources, refetch }) => {
  const [building, setBuilding] = useState<boolean>(DEFAULT_BUILDING);
  const [destroying, setDestroying] = useState<IBillingSource | undefined>();
  const [defaulting, setDefaulting] = useState<IBillingSource | undefined>();

  const onClose = () => {
    setBuilding(DEFAULT_BUILDING);
    setDestroying(undefined);
    setDefaulting(undefined);
    refetch();
  };

  return (
    <>
      <List sources={sources} onDestroy={setDestroying} onDefault={setDefaulting} />
      <Buttons>
        <Button fullwidth color="primary" onClick={() => setBuilding(!building)}>
          Add a Card
        </Button>
      </Buttons>
      {destroying && <Destroy source={destroying} onClose={onClose} />}
      {defaulting && <Default source={defaulting} onClose={onClose} />}
      {building && <Build onClose={onClose} />}
    </>
  );
};
