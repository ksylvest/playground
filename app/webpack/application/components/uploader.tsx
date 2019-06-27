import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import {
  useRef,
  useState,
} from "react";

import { useActiveStorageDirectUpload } from "@application/utils/hooks";

import { Form } from "@application/components/bulma";

export const Uploader: React.FC<{
  accept?: string;
  name: string;
  onSelect(id: string): void;
}> = ({
  accept,
  name,
  onSelect,
}) => {
  const form = useRef<HTMLFormElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);
  const uploader = useActiveStorageDirectUpload(file, ({ blob }) => {
    if (!blob) { return; }
    setFile(undefined);
    onSelect(blob.signed_id);
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) { return; }
    for (let index = 0; index < event.target.files.length; index++) {
      const selection = event.target.files.item(index);
      if (!selection) { continue; }
      setFile(selection);
      break;
    }

    if (form && form.current !== null) {
      form.current.reset();
    }
  };

  return (
    <Form>
      <Form.File boxed fullwidth alignment="centered" name={file ? file.name : undefined}>
        <Form.File.Label>
          <Form.File.Input accept={accept} name={name} onChange={onChange} />
          <Form.File.CTA>
            <Form.File.Icon>
              <FontAwesomeIcon icon={uploader ? "spinner" : "upload"} spin={!!uploader} />
            </Form.File.Icon>
            Choose
          </Form.File.CTA>
          {file && <Form.File.Name>{file.name}</Form.File.Name>}
        </Form.File.Label>
      </Form.File>
    </Form>
  );
};
