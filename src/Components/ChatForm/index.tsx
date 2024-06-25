import { memo, useRef, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useChatFormContext } from '~/Providers/ChatFormContext';

import { useTextArea } from '~/hooks /useTextArea';
import { TextareaAutosize } from './TextareaAutoResize';
// import { useGetFileConfig } from '~/data-provider';
import { cn, removeFocusRings } from '~/utils';
import AttachFile from './AttachFIle';
import FileRow from './FileRow';
// import AudioRecorder from './AudioRecorder';
// import { mainTextareaId } from '~/common';
// import StreamAudio from './StreamAudio';
import StopButton from './StopButton';
import SendButton from './SendButton';
// import FileRow from './Files/FileRow';
// import Mention from './Mention';
// import store from '~/store';
const mainTextareaId = 'prompt-textarea';

const ChatForm = ({ index = 0 }) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  // const SpeechToText = useRecoilValue(store.SpeechToText);
  // const TextToSpeech = useRecoilValue(store.TextToSpeech);
  // const automaticPlayback = useRecoilValue(store.automaticPlayback);
  // const [showStopButton, setShowStopButton] = useRecoilState(store.showStopButtonByIndex(index));
  // const [showMentionPopover, setShowMentionPopover] = useRecoilState(
  //   store.showMentionPopoverFamily(index),
  // );
  // const { requiresKey } = useRequiresKey();

  const { handlePaste, handleKeyDown, handleKeyUp, handleCompositionStart, handleCompositionEnd } =
    useTextArea({
      textAreaRef,
      submitButtonRef,
      disabled: false,
    });

  // const {
  //   files,
  //   setFiles,
  //   // conversation,
  //   isSubmitting,
  //   filesLoading,
  //   setFilesLoading,
  //   handleStopGenerating,
  // } = useChatContext();
  const { chat, setChat, files, setFiles,...methods } = useChatFormContext();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const clearDraft = () => { };

  // const { clearDraft } = useAutoSave({
  //   conversationId: useMemo(() => conversation?.conversationId, [conversation]),
  //   textAreaRef,
  //   files,
  //   setFiles,
  // });
  const conversation = {
    'conversationId': '4379f052-ae9a-4d4b-b369-fec4148a931a',
    'title': 'New Chat',
    'endpoint': 'google',
    'endpointType': null,
    '_id': '6678fbee44fe589949162b82',
    'user': '6678fa8839110b66a4d58893',
    '__v': 0,
    'createdAt': '',
    'isArchived': false,
    'maxOutputTokens': 8192,
    'messages': [
      '6678fbee44fe589949162b5d',
      '6678fbf044fe589949162c91',
      '6678fc0444fe589949163846',
      '6678fc0544fe589949163931',
      '6678fc2e44fe589949164d6d',
      '6678feed44fe58994917e41b',
      '6678fef244fe58994917e68e',
      '6679091144fe5899491dc464',
    ],
    'model': 'gemini-pro-vision',
    'modelLabel': null,
    'promptPrefix': null,
    'stop': [
      '||>',
      '\nUser:',
      '<|diff_marker|>',
    ],
    'temperature': 1,
    'topK': 40,
    'topP': 0.95,
    'updatedAt': '',
    'examples': [
      {
        'input': {
          'content': '',
        },
        'output': {
          'content': '',
        },
      },
    ],
    'tools': [],
  };

  const fileConfig = {
    'endpoints': {
      'assistants': {
        'fileLimit': 10,
        'fileSizeLimit': 536870912,
        'totalSizeLimit': 536870912,
        'supportedMimeTypes': [
          {},
          {},
          {},
          {},
        ],
        'disabled': false,
      },
      'azureAssistants': {
        'fileLimit': 10,
        'fileSizeLimit': 536870912,
        'totalSizeLimit': 536870912,
        'supportedMimeTypes': [
          {},
          {},
          {},
          {},
        ],
        'disabled': false,
      },
      'default': {
        'fileLimit': 10,
        'fileSizeLimit': 536870912,
        'totalSizeLimit': 536870912,
        'supportedMimeTypes': [
          {},
          {},
          {},
          {},
        ],
        'disabled': false,
      },
    },
    'serverFileSizeLimit': 536870912,
    'avatarSizeLimit': 2097152,
  };

  // const assistantMap = {};
  // const { submitMessage } = useSubmitMessage({ clearDraft });
  const submitMessage = (data) => {
    //sample logic 
    let userChat = { ...chat[0], ...data }
    const aiChat = {...chat[1], sender:'Sivi' }
    
    if(files && files.length){
      console.log(files, userChat)
      userChat = {...userChat,files}
    }
    
    setChat([...chat, userChat])
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setChat((prevChat) => [...prevChat, aiChat])
    }, [2000])
  }

  const { endpoint: _endpoint, endpointType = null } = conversation ?? { endpoint: null };
  const endpoint = endpointType ?? _endpoint;
  // const endpoint = 'google';

  // const { data: fileConfig = defaultFileConfig } = useGetFileConfig({
  //   select: (data) => mergeFileConfig(data),
  // });

  // const endpointFileConfig = fileConfig.endpoints[endpoint ?? ''];
  // const invalidAssistant = useMemo(
  //   () =>
  //     isAssistantsEndpoint(conversation?.endpoint) &&
  //     (!conversation?.assistant_id ||
  //       !assistantMap?.[conversation?.endpoint ?? '']?.[conversation?.assistant_id ?? '']),
  //   [conversation?.assistant_id, conversation?.endpoint, assistantMap],
  // );
  // const disableInputs = useMemo(
  //   () => !!(requiresKey || invalidAssistant),
  //   [requiresKey, invalidAssistant],
  // );

  const { ref, ...registerProps } = methods.register('text', {
    required: true,
    onChange: (e) => {
      methods.setValue('text', e.target.value, { shouldValidate: true });
    },
  });

  return (
    <div className="px-5 w-full flex justify-center items-center">
    <form
      onSubmit={methods.handleSubmit((data) => {
        submitMessage(data);
      })}
      className="stretch mx-2 flex flex-row gap-3 w-full  last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl  xl:max-w-3xl"
    >
      <div className="relative flex h-full flex-1 items-stretch md:flex-col">
        <div className="flex w-full items-center">

          <div className="bg-token-main-surface-primary relative flex w-full flex-grow flex-col overflow-hidden rounded-2xl border dark:border-gray-600 dark:text-white [&:has(textarea:focus)]:border-gray-300 [&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] dark:[&:has(textarea:focus)]:border-gray-500">
            {files?.length ? <FileRow
              files={files}
              setFiles={setFiles}
              // setFilesLoading={setFilesLoading}
              Wrapper={({ children }) => (
                <div className="mx-2 mt-2 flex flex-wrap gap-2 px-2.5 md:pl-0 md:pr-4">
                  {children}
                </div>
              )}
            />: null}
            {endpoint && (
              <TextareaAutosize
                {...registerProps}
                autoFocus
                ref={(e) => {
                  ref(e);
                  textAreaRef.current = e;
                }}
                disabled={false}
                onPaste={() => { }}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                id={mainTextareaId}
                tabIndex={0}
                data-testid="text-input"
                style={{ height: 44, overflowY: 'auto' }}
                rows={1}
                className={cn(
                  // true && supportsFiles[endpointType ?? endpoint ?? ''] && !endpointFileConfig?.disabled
                  'pl-10 md:pl-[55px]',
                  //   : 'pl-3 md:pl-4',
                  'm-0 w-full resize-none border-0 bg-transparent py-[10px] placeholder-black/50 focus:ring-0 focus-visible:ring-0 dark:bg-transparent dark:placeholder-white/50 md:py-3.5  ',
                  // SpeechToText ? 'pr-20 md:pr-[85px]' : 'pr-10 md:pr-12',
                  'max-h-[65vh] md:max-h-[75vh]',
                  removeFocusRings,
                )}
              />
            )}
            <AttachFile
              endpoint={_endpoint ?? ''}
              // endpointType={endpointType}
              disabled={false}
            />
            {isSubmitting ? (
              <StopButton stop={() => { }} setShowStopButton={() => { }} />
            ) : (
              endpoint && (
                <SendButton
                  ref={submitButtonRef}
                  control={methods.control}
                  disabled={false}
                />
              )
            )}
            {/* {SpeechToText && (
              <AudioRecorder
                disabled={!!disableInputs}
                textAreaRef={textAreaRef}
                ask={submitMessage}
                methods={methods}
              />
            )}
            {TextToSpeech && automaticPlayback && <StreamAudio index={index} />} */}
          </div>
        </div>
      </div>
    </form>
    </div>
  );
};

export default memo(ChatForm);
