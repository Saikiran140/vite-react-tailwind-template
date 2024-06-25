// import useFileHandling from './useFileHandling';
import { useRef, useCallback } from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { atomWithLocalStorage } from '~/utils';

// const handleEnterToSend = () => atomWithLocalStorage('enterToSend', true)

export const useTextArea = (
    { textAreaRef,
        submitButtonRef }
) => {
    // const { handleFiles } = useFileHandling();
    // const isComposing = useRef(false);
    // const enterToSend = useRecoilValue(handleEnterToSend);

    const handleKeyDown = useCallback(
        (e: any) => {
            const isSubmitting = false
            const filesLoading = false;

            if (e.key === 'Enter' && isSubmitting) {
                return;
            }

            const isNonShiftEnter = e.key === 'Enter' && !e.shiftKey;
            const isCtrlEnter = e.key === 'Enter' && e.ctrlKey;

            if (isNonShiftEnter && filesLoading) {
                e.preventDefault();
            }

            if (isNonShiftEnter) {
                e.preventDefault();
            }

            //   if (e.key === 'Enter' && !enterToSend && !isCtrlEnter && textAreaRef.current) {
            //     e.preventDefault();
            //     insertTextAtCursor(textAreaRef.current, '\n');
            //     forceResize(textAreaRef.current);
            //     return;
            //   }

            if ((isNonShiftEnter || isCtrlEnter)) {
                // const globalAudio = document.getElementById(globalAudioId) as HTMLAudioElement;
                // if (globalAudio) {
                //   console.log('Unmuting global audio');
                //   globalAudio.muted = false;
                // }
                submitButtonRef.current?.click();
            }
        },
        [textAreaRef, submitButtonRef],
    );

    const handlePaste = () => {}
    const handleKeyUp = () => {}
    const handleCompositionStart = () => {}
    const handleCompositionEnd = () => {}

    return {handlePaste, handleKeyDown, handleKeyUp, handleCompositionStart, handleCompositionEnd}
}