import { useRef, useState } from "react";

const reset = (form: React.RefObject<HTMLFormElement>) => {
  if (form.current !== null) {
    form.current.reset();
  }
};

const select = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = [];

  if (!event.target.files) {
    return [];
  }

  for (let index = 0; index < event.target.files.length; index++) {
    const selection = event.target.files.item(index);
    if (selection) {
      files.push(selection);
    }
  }

  return files;
};

export const useFiles = () => {
  const form = useRef<HTMLFormElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles([...files, ...select(event)]);
  };

  return {
    files,
    onChange,
    onReset: () => {
      reset(form);
      setFiles([]);
    },
  };
};
