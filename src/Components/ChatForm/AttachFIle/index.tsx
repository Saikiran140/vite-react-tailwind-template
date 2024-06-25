import React from 'react';
import { useRef } from 'react';
import { useChatFormContext } from '~/Providers/ChatFormContext';
import AttachmentIcon from '~/Components/Svg/AttachmentIcon';


const AttachFile = ({
    endpoint,
    endpointType,
    disabled = false,
}: {
    endpoint: EModelEndpoint | '';
    endpointType?: EModelEndpoint;
    disabled?: boolean | null;
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { setFiles } : any = useChatFormContext()

    const handleFileChange = (e) => {
        const fileURL = URL.createObjectURL(e.target.files[0])

        setFiles((prevFiles : any) => {
            const sampleFile = { ...prevFiles[0] }
            sampleFile["file_id"] = Math.random() * 100000 + 100
            sampleFile["preview"] = fileURL
            return [...prevFiles, sampleFile]
        })
    }

    const handleButtonClick = () => {

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        fileInputRef.current?.click();
    };

    return (
        <div className="absolute bottom-[0.25rem] left-2 md:bottom-3 md:left-4">
            <div onClick={handleButtonClick} style={{ cursor: 'pointer' }} className={''}>
                <button
                    disabled={!!disabled}
                    type="button"
                    className="btn relative p-0 text-black dark:text-white"
                    aria-label="Attach files"
                    style={{ padding: 0 }}
                >
                    <div className="flex w-full items-center justify-center gap-2">
                        <AttachmentIcon />
                    </div>
                </button>
                <input
                    ref={fileInputRef}
                    multiple
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
};

export default React.memo(AttachFile);
