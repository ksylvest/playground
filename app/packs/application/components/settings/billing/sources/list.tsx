import React from "react";

import { Button, Buttons, Table } from "tights";

import { Billing__Source } from "@root/app_schema";

import { BillingSourceBrandIcon } from "@application/components/helpers/billing_source_brand_icon";
import { BillingSourceBrandName } from "@application/components/helpers/billing_source_brand_name";
import { BillingSourceExpiration } from "@application/components/helpers/billing_source_expiration";
import { BillingSourceNumber } from "@application/components/helpers/billing_source_number";

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
            <BillingSourceBrandIcon source={source} />
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
