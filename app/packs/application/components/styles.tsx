import { Global, css } from "@emotion/react";

export const STYLES = css`
  .StripeElement {
    border-radius: 4px;
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    height: 36px;
    padding: 8px;
    border-color: #dbdbdb;
    box-shadow: inset 0 1px 2px rgba(54, 54, 54, 0.1);
  }

  .StripeElement--empty {
    color: rgba(54, 54, 54, 0.3);
  }

  .StripeElement--focus {
    border-color: #3273dc;
    box-shadow: 0 0 0 0.125rem rgba(50, 115, 220, 0.25);
  }

  .StripeElement--invalid {
    border-color: #ff3860;
  }

  .StripeElement--invalid.StripeElement--focus {
    box-shadow: 0 0 0 0.125rem rgba(255, 56, 96, 0.25);
  }

  .StripeElement--complete {
    border-color: #23d160;
  }

  .StripeElement--complete.StripeElement--focus {
    box-shadow: 0 0 0 0.125rem rgba(35, 209, 96, 0.25);
  }
`;

export const Styles: React.FC = () => <Global styles={STYLES} />;
