import { useEffect, useState } from "react";

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

  useEffect(() => {
    const { DirectUpload } = require("@rails/activestorage");

    if (!file) {
      return;
    }
    const uploader: DirectUpload = new DirectUpload(file, URL);
    setResult(uploader);

    uploader.create((error?: Error, blob?: Blob) => {
      setResult(undefined);
      if (!callback) {
        return;
      }
      callback({
        blob,
        error,
      });
    });
  }, [file]);

  return { uploading: !!result };
};
