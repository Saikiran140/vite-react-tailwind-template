import ImagePreview from './ImagePreview'
import RemoveFile from './RemoveFile';

export declare enum FileSources {
    local = "local",
    firebase = "firebase",
    azure = "azure",
    openai = "openai",
    s3 = "s3",
    vectordb = "vectordb"
}

const Image = ({
  imageBase64,
  url,
  onDelete,
  progress = 1,
  source = "local"
}: {
  imageBase64?: string;
  url?: string;
  onDelete: () => void;
  progress: number; // between 0 and 1
  source?: FileSources;
}) => {
  return (
    <div className="group relative inline-block text-sm text-black/70 dark:text-white/90">
      <div className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-600">
        <ImagePreview source={source} imageBase64={imageBase64} url={url} progress={progress} />
      </div>
      <RemoveFile onRemove={onDelete} />
    </div>
  );
};

export default Image;
