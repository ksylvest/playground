import { useRef, useState } from "react";

const reset = (form: React.RefObject<HTMLFormElement>): void => {
  if (form.current !== null) {
    form.current.reset();
  }
};

const select = (event: React.ChangeEvent<HTMLInputElement>): Array<File> => {
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

export const useFiles = (): {
  files: File[];
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  onReset(): void;
} => {
  const form = useRef<HTMLFormElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFiles([...files, ...select(event)]);
  };

  return {
    files,
    onChange,
    onReset: (): void => {
      reset(form);
      setFiles([]);
    },
  };
};
