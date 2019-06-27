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

// interface IUploaderProps {
//   file: File;
//   uploadURL?: string;
//   onUpload(signedID: string): void;
// }
//
// interface IUploaderState {
//   loaded?: number;
//   total?: number;
// }

// export class Uploader extends React.Component<IUploaderProps> {
//   public state: IUploaderState = {
//     loaded: undefined,
//     total: undefined,
//   };
//
//   public constructor(props: IUploaderProps) {
//     super(props);
//     const { file, uploadURL = DEFAULT_UPLOAD_URL } = props;
//     this.process(file, uploadURL);
//   }
//
//   public render() {
//     const { file } = this.props;
//     const {
//       loaded,
//       total,
//     } = this.state;
//     return (
//       <div className="row">
//         <div className="col col-lg-2 col-md-3 col-sm-4">
//           <Text wrapping="truncate" tag="div">{file.name}</Text>
//         </div>
//         <div className="col">
//           <Progress>
//             {loaded !== undefined && total !== undefined &&
//               <Progress.Bar loaded={loaded} total={total} />
//             }
//           </Progress>
//         </div>
//       </div>
//     );
//   }
//
//   private process = (file: File, uploadURL: string) => {
//     const upload = new DirectUpload(file, uploadURL, {
//       directUploadWillStoreFileWithXHR: (request) => {
//         request.upload.addEventListener('progress', this.onProgress);
//       },
//     });
//     upload.create((error, blob) => {
//       if (error) { throw error; }
//       this.props.onUpload(blob.signed_id);
//     });
//   }
//
//   private onProgress = (event: ProgressEvent) => {
//     this.setState({
//       loaded: event.loaded,
//       total: event.total,
//     });
//   }
// }
