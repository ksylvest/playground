import { useEffect, useRef, useState } from "react";

import { DirectUpload } from "@rails/activestorage";

import { useGenerateActiveStorageDirectUploadMutation } from "@root/app_schema";

const URL = "/rails/active_storage/direct_uploads";

type Blob = {
  signed_id: string;
};

type Callback = (params: { blob?: Blob; error?: Error }) => void;

const NAME = "upload";

export const useActiveStorageDirectUpload = (file?: File, callback?: Callback): { uploading: boolean } => {
  const [generate] = useGenerateActiveStorageDirectUploadMutation();
  const [result, setResult] = useState<DirectUpload | undefined>(undefined);
  const ref = useRef<Callback | undefined>(callback);

  useEffect(() => {
    if (!file) {
      return;
    }

    generate({ variables: { name: NAME } }).then(({ data }) => {
      const token = data?.result.token;
      if (!token) return;

      const uploader = new DirectUpload(file, URL, token, NAME);
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
    });
  }, [generate, file]);

  return { uploading: !!result };
};
