import { useEffect, useRef, useState } from "react";

import { DirectUpload } from "@rails/activestorage";

const URL = "/rails/active_storage/direct_uploads";

type Blob = {
  signed_id: string;
};

type Callback = (params: { blob?: Blob; error?: Error }) => void;

export const useActiveStorageDirectUpload = (file?: File, callback?: Callback): { uploading: boolean } => {
  const [result, setResult] = useState<DirectUpload | undefined>(undefined);
  const ref = useRef<Callback | undefined>(callback);

  useEffect(() => {
    if (!file) {
      return;
    }

    // NOTE: fixes a type issue w/ DirectUpload
    const uploader = new (DirectUpload as any)(file, URL);
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
