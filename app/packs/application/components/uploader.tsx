import { faSpinner, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { File, FileCTA, FileIcon, FileInput, FileLabel, FileName } from "tights";

import { useActiveStorage } from "react-activestorage";
import { useFiles } from "@application/hooks/use_files";

export const Uploader: React.FC<{
  accept?: string;
  name: string;
  onSelect(id: string): void;
}> = ({ accept, name, onSelect }) => {
  const { files, onChange, onReset } = useFiles();
  const [file] = files;
  const { uploading } = useActiveStorage(file, ({ blob }) => {
    if (blob) {
      onReset();
      onSelect(blob.signed_id);
    }
  });

  return (
    <form>
      <File boxed fullwidth alignment="centered" name={file ? file.name : undefined}>
        <FileLabel>
          <FileInput accept={accept} name={name} onChange={onChange} disabled={!!file} />
          <FileCTA>
            <FileIcon>
              <FontAwesomeIcon icon={uploading ? faSpinner : faUpload} spin={uploading} />
            </FileIcon>
            Choose
          </FileCTA>
          {file && <FileName>{file.name}</FileName>}
        </FileLabel>
      </File>
    </form>
  );
};
