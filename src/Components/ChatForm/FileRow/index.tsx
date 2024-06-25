import Image from './Image';

export interface ExtendedFile {
  file?: File;
  file_id: string;
  temp_file_id?: string;
  type?: string;
  filepath?: string;
  filename?: string;
  width?: number;
  height?: number;
  size: number;
  preview?: string;
  progress: number;
  source?: any;
  attached?: boolean;
  embedded?: boolean;
}

const FileRow = ({files, setFiles, Wrapper}: any) => {
    const renderFiles = () => {
        return (
          <>
            {files
              .reduce(
                (acc, current) => {
                  if (!acc.map.has(current.file_id)) {
                    acc.map.set(current.file_id, true);
                    acc.uniqueFiles.push(current);
                  }
                  return acc;
                },
                { map: new Map(), uniqueFiles: [] },
              )
              .uniqueFiles.map((file: ExtendedFile, index: number) => {
                // const handleDelete = () => deleteFile({ file, setFiles });
                const handleDelete = () => {}

                // if (file.type?.startsWith('image')) {
                  return (
                    <Image
                      key={index}
                      url={file.preview || file.filepath}
                      onDelete={handleDelete}
                      progress={file.progress}
                      source={file.source}
                    />
                  );
                // }
    
                // return <FileContainer key={index} file={file} onDelete={handleDelete} />;
              })}
          </>
        );
      };
    
      if (Wrapper) {
        return <Wrapper>{renderFiles()}</Wrapper>;
      }
    
      return renderFiles()
}

export default FileRow