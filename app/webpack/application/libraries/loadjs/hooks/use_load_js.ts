import * as loadjs from "loadjs";
import { useEffect, useState } from "react";

export const useLoadJS = (id: string) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let aborted = false;

    loadjs.ready(id, () => {
      if (!aborted) {
        setLoaded(true);
      }
    });

    return () => {
      aborted = true;
    };
  }, [id]);

  return loaded;
};
