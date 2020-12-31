import { faSpinner, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { useRef, useState } from "react";

import { Form } from "tights";

import { useActiveStorageDirectUpload, useFiles } from "@application/hooks";

export const Uploader: React.FC<{
  accept?: string;
  name: string;
  onSelect(id: string): void;
}> = ({ accept, name, onSelect }) => {
  const { files, onChange, onReset } = useFiles();
  const [file] = files;
  const { uploading } = useActiveStorageDirectUpload(file, ({ blob }) => {
    if (blob) {
      onReset();
      onSelect(blob.signed_id);
    }
  });

  return (
    <Form>
      <Form.File boxed fullwidth alignment="centered" name={file ? file.name : undefined}>
        <Form.File.Label>
          <Form.File.Input accept={accept} name={name} onChange={onChange} disabled={!!file} />
          <Form.File.CTA>
            <Form.File.Icon>
              <FontAwesomeIcon icon={uploading ? faSpinner : faUpload} spin={uploading} />
            </Form.File.Icon>
            Choose
          </Form.File.CTA>
          {file && <Form.File.Name>{file.name}</Form.File.Name>}
        </Form.File.Label>
      </Form.File>
    </Form>
  );
};
