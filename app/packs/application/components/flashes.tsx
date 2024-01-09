import React from "react";

import { Notification } from "tights";

import { sentence } from "@application/utilities/sentence";

export const Flashes: React.FC<{
  errors?: {
    messages: {
      base?: string[];
    };
  };
}> = ({ errors }) => {
  if (!errors || !errors.messages.base) {
    return null;
  }
  return <Notification color="danger">{sentence(errors.messages.base)}</Notification>;
};
