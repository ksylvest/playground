import {
  useEffect,
  useState,
} from "react";

const URL = "/rails/active_storage/direct_uploads";

type Callback = (params: {
  blob?: ActiveStorage.Blob;
  error?: Error;
}) => void;

export const useActiveStorageDirectUpload = (() => {
  if (typeof(window) === "undefined") {
    return () => { /* noop */ };
  }

  const ActiveStorage = require("activestorage");

  return (file?: File, callback?: Callback) => {
    const [result, setResult] = useState<ActiveStorage.DirectUpload | undefined>(undefined);

    useEffect(() => {
      if (!file) { return; }
      const uploader: ActiveStorage.DirectUpload = new ActiveStorage.DirectUpload(file, URL);
      setResult(uploader);

      uploader.create((error: Error, blob: ActiveStorage.Blob) => {
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
})();
