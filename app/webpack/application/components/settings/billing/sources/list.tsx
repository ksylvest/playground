import * as React from "react";

import { IBillingSource } from "@application/types";

import {
  BillingSourceBrand,
  BillingSourceExpiration,
  BillingSourceIcon,
  BillingSourceNumber,
} from "@application/components/helpers";

import {
  Button,
  Buttons,
  Table,
} from "tights";

export const List: React.FC<{
  sources: IBillingSource[];
  onDestroy(source: IBillingSource): void;
  onDefault(source: IBillingSource): void;
}> = ({
  sources,
  onDestroy,
  onDefault,
}) => (
  <Table fullwidth hoverable striped>
    <tbody>
      {sources.map((source) => (
        <tr key={source.id}>
          <td><BillingSourceIcon source={source} /></td>
          <td><BillingSourceNumber source={source} /></td>
          <td><BillingSourceBrand source={source} /></td>
          <td><BillingSourceExpiration source={source} /></td>
          <td>
            <Buttons alignment="right">
              <Button outlined color="danger" onClick={() => onDestroy(source)}>
                Remove
              </Button>
              <Button outlined color="info" onClick={() => onDefault(source)} disabled={source.default}>
                Default
              </Button>
            </Buttons>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);
