import {
  useEffect,
  useState,
} from "react";

import { DirectUpload } from "activestorage";

const URL = "/rails/active_storage/direct_uploads";

type Callback = (params: {
  blob?: ActiveStorage.Blob;
  error?: Error;
}) => void;

export const useActiveStorageDirectUpload = (file?: File, callback?: Callback) => {
  const [result, setResult] = useState<DirectUpload | undefined>(undefined);

  useEffect(() => {
    if (!file) { return; }
    const uploader = new DirectUpload(file, URL);
    setResult(uploader);

    uploader.create((error, blob) => {
      setResult(undefined);
      if (!callback) { return; }
      callback({
        blob,
        error,
      });
    });
  }, [file]);

  return result;
};
