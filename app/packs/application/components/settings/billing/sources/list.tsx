import * as React from "react";

import { Billing__PaymentMethod } from "@root/app_schema";

import {
  BillingSourceBrandName,
  BillingSourceExpiration,
  BillingPaymentMethodBrandIcon,
  BillingSourceNumber,
} from "@application/components/helpers";

import { Button, Buttons, Table } from "tights";

export const List: React.FC<{
  sources: readonly Billing__PaymentMethod[];
  onDestroy(source: Billing__PaymentMethod): void;
  onDefault(source: Billing__PaymentMethod): void;
}> = ({ sources, onDestroy, onDefault }) => (
  <Table fullwidth hoverable striped>
    <tbody>
      {sources.map((source) => (
        <tr key={source.id}>
          <td>
            <BillingPaymentMethodBrandIcon source={source} />
          </td>
          <td>
            <BillingSourceNumber source={source} />
          </td>
          <td>
            <BillingSourceBrandName source={source} />
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
