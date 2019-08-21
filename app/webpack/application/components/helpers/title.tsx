import * as React from "react";
import { useEffect } from "react";

export const Title: React.FC<{
  children: string;
}> = ({
  children,
}) => {
  useEffect(() => {
    document.title = children;
  }, [children]);

  return null;
};
