import { useEffect, useRef, useState } from "react";

const URL = "/rails/active_storage/direct_uploads";

type Blob = {
  signed_id: string;
};

type Callback = (params: { blob?: Blob; error?: Error }) => void;

declare class DirectUpload {
  constructor();
  create(callback: (error?: Error, blob?: Blob) => void): void;
}

export const useActiveStorageDirectUpload = (file?: File, callback?: Callback): { uploading: boolean } => {
  const [result, setResult] = useState<DirectUpload | undefined>(undefined);
  const ref = useRef<Callback | undefined>(callback);

  useEffect(() => {
    if (!file) {
      return;
    }

    const { DirectUpload } = require("@rails/activestorage");
    const uploader: DirectUpload = new DirectUpload(file, URL);
    setResult(uploader);

    uploader.create((error?: Error, blob?: Blob) => {
      setResult(undefined);
      if (ref.current) {
        ref.current({
          blob,
          error,
        });
      }
    });
  }, [file]);

  return { uploading: !!result };
};
