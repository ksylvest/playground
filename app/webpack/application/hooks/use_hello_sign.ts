import HelloSign from "hellosign-embedded";
import { useEffect } from "react";

const CLIENT_ID = "29d9aa25a382b01226e4b3c7ced3219f";

export const useHelloSign = (url?: string) => {
  useEffect(() => {
    if (!url) {
      return;
    }
    const client = new HelloSign();
    client.open(url, {
      allowCancel: false,
      clientId: CLIENT_ID,
      skipDomainVerification: true,
    });
    client.on("sign", (data) => {
      console.log("signed", data);
    });
  }, [url]);
};
