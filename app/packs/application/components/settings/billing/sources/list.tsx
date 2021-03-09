import * as React from "react";

import { Billing__Source } from "@root/app_schema";

import {
  BillingSourceBrand,
  BillingSourceExpiration,
  BillingSourceIcon,
  BillingSourceNumber,
} from "@application/components/helpers";

import { Button, Buttons, Table } from "tights";

export const List: React.FC<{
  sources: readonly Billing__Source[];
  onDestroy(source: Billing__Source): void;
  onDefault(source: Billing__Source): void;
}> = ({ sources, onDestroy, onDefault }) => (
  <Table fullwidth hoverable striped>
    <tbody>
      {sources.map((source) => (
        <tr key={source.id}>
          <td>
            <BillingSourceIcon source={source} />
          </td>
          <td>
            <BillingSourceNumber source={source} />
          </td>
          <td>
            <BillingSourceBrand source={source} />
          </td>
          <td>
            <BillingSourceExpiration source={source} />
          </td>
          <td>
            <Buttons alignment="right">
              <Button outlined color="danger" onClick={(): void => onDestroy(source)}>
                Remove
              </Button>
              <Button outlined color="info" onClick={(): void => onDefault(source)} disabled={source.default}>
                Default
              </Button>
            </Buttons>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);
