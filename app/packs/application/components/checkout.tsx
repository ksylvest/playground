import * as React from "react";
import { useState } from "react";
import { useContext } from "react";
import { Button, Delete, Form, Modal } from "tights";

import { Title } from "./helpers";

type AffirmName = {
  first: string;
  last: string;
};

type AffirmAddress = {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
};

type AffirmContact = {
  name: AffirmName;
  address: AffirmAddress;
  phone_number: string;
  email: string;
};

declare let affirm: any;

type AffirmPayload = {
  checkout_token: string;
};

export const Checkout: React.FC = () => {
  const [payload, setPayload] = useState<AffirmPayload | undefined>();
  const onReset = () => setPayload(undefined);

  const [name, setName] = useState<AffirmName>({
    first: "",
    last: "",
  });

  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [address, setAddress] = useState<AffirmAddress>({
    line1: "",
    line2: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const checkout = () => {
    affirm.checkout({
      onFail: () => setPayload(undefined),
      onSuccess: (payload: AffirmPayload) => setPayload(payload),
      merchant: {
        user_confirmation_url: "https://merchantsite.com/confirm",
        user_cancel_url: "https://merchantsite.com/cancel",
        user_confirmation_url_action: "POST",
        name: "Playground",
      },
      shipping: {
        name,
        address,
        phone_number: phone,
        email,
      },
      billing: {
        name,
        address,
        phone_number: phone,
        email,
      },
      items: [
        {
          display_name: "Awesome Pants",
          sku: "ABC-123",
          unit_price: 1999,
          qty: 3,
          item_image_url: "http://merchantsite.com/images/awesome-pants.jpg",
          item_url: "http://merchantsite.com/products/awesome-pants.html",
          categories: [
            ["Home", "Bedroom"],
            ["Home", "Furniture", "Bed"],
          ],
        },
      ],
      discounts: {
        RETURN5: {
          discount_amount: 500,
          discount_display_name: "Returning customer 5% discount",
        },
        PRESDAY10: {
          discount_amount: 1000,
          discount_display_name: "President's Day 10% off",
        },
      },
      metadata: {
        mode: "modal",
      },
      order_id: "JKLMO4321",
      currency: "USD",
      financing_program: "flyus_3z6r12r",
      shipping_amount: 1000,
      tax_amount: 500,
      total: 100000,
    });

    affirm.checkout.open();
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    checkout();
  };

  return (
    <>
      <Title>Checkout | Playground</Title>

      <form onSubmit={onSubmit}>
        <Form.Label>Name:</Form.Label>

        <Form.Field>
          <Form.Input
            type="text"
            placeholder="First"
            value={name.first}
            onChange={(event) => setName((name) => ({ ...name, first: event.target.value }))}
          />
        </Form.Field>

        <Form.Field>
          <Form.Input
            type="text"
            placeholder="Last"
            value={name.last}
            onChange={(event) => setName((name) => ({ ...name, last: event.target.value }))}
          />
        </Form.Field>

        <Form.Label>Contact:</Form.Label>

        <Form.Field>
          <Form.Input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <Form.Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Field>

        <Form.Label>Address:</Form.Label>

        <Form.Field>
          <Form.Input
            type="text"
            placeholder="Line #1"
            value={address.line1}
            onChange={(event) => setAddress((address) => ({ ...address, line1: event.target.value }))}
          />
        </Form.Field>

        <Form.Field>
          <Form.Input
            type="text"
            placeholder="Line #2"
            value={address.line2}
            onChange={(event) => setAddress((address) => ({ ...address, line2: event.target.value }))}
          />
        </Form.Field>

        <Form.Field>
          <Form.Input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(event) => setAddress((address) => ({ ...address, city: event.target.value }))}
          />
        </Form.Field>

        <Form.Field>
          <Form.Input
            type="text"
            placeholder="State"
            value={address.state}
            onChange={(event) => setAddress((address) => ({ ...address, state: event.target.value }))}
          />
        </Form.Field>

        <Form.Field>
          <Form.Input
            type="text"
            placeholder="ZIP"
            value={address.zipcode}
            onChange={(event) => setAddress((address) => ({ ...address, zipcode: event.target.value }))}
          />
        </Form.Field>

        <Form.Field>
          <Form.Input
            type="text"
            placeholder="Country"
            value={address.country}
            onChange={(event) => setAddress((address) => ({ ...address, country: event.target.value }))}
          />
        </Form.Field>

        <Button type="submit">Checkout</Button>
      </form>

      {payload && (
        <Modal>
          <Modal.Background onClick={onReset} />
          <Modal.Content>
            <Modal.Card>
              <Modal.Card.Head>
                <Modal.Card.Title>Add a Card</Modal.Card.Title>
                <Delete onClick={onReset} />
              </Modal.Card.Head>
              <Modal.Card.Body>
                <p>Thanks! Your affirm checkout token is:</p>
                <p>
                  <strong>{payload.checkout_token}</strong>
                </p>
              </Modal.Card.Body>
              <Modal.Card.Foot>
                <Button type="button" onClick={onReset}>
                  Close
                </Button>
              </Modal.Card.Foot>
            </Modal.Card>
          </Modal.Content>
        </Modal>
      )}
    </>
  );
};
