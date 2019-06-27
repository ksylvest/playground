import {
  useEffect,
  useState,
} from "react";

export const useFileReader = (file?: File) => {
  const [result, setResult] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!file) { return; }
    const reader = new FileReader();

    reader.onload = () => {
      setResult(reader.result as string);
    };

    reader.readAsDataURL(file);

    return () => {
      reader.onload = null;
      reader.abort();
    };
  }, [file]);

  return result;
};
