import { Billing__Source } from "@root/app_schema";

export const BillingSourceExpiration: React.FC<{
  source: Billing__Source;
}> = ({ source }) => {
  const [year, month] = source.exp.split("-").map(Number);
  const expiration = new Date(year, month);
  const now = new Date();
  return (
    <>
      {expiration > now ? "expires" : "expired"} {month}/{year}
    </>
  );
};
