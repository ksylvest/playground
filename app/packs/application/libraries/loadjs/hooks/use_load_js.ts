import * as loadjs from "loadjs";
import { useEffect, useState } from "react";

export const useLoadJS = (id: string): boolean => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let aborted = false;

    loadjs.ready(id, () => {
      if (!aborted) {
        setLoaded(true);
      }
    });

    return (): void => {
      aborted = true;
    };
  }, [id]);

  return loaded;
};
