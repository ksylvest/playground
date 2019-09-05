import { DirectUpload } from "@rails/activestorage";
import { useEffect, useState } from "react";

const URL = "/rails/active_storage/direct_uploads";

type Callback = (params: { blob?: any; error?: Error }) => void;

export const useActiveStorageDirectUpload = (file?: File, callback?: Callback) => {
  const [result, setResult] = useState<any | undefined>(undefined);

  useEffect(() => {
    if (!file) {
      return;
    }
    const uploader = new DirectUpload(file, URL);
    setResult(uploader);

    uploader.create((error: any, blob: any) => {
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

  return result;
};
