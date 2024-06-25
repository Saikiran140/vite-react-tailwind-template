import React, { createContext, PropsWithChildren, ReactElement, useContext, useMemo } from 'react';
import { useForm, FieldValues } from 'react-hook-form'; // Import useForm here
import { conversations } from '~/store/conversations';
import {files as sampleFiles} from '~/store/Files'

function createFormContext<TFieldValues extends FieldValues>() {
  const context = createContext(undefined);

  const useCustomFormContext = () => {
    const value = useContext(context);
    if (!value) {
      throw new Error('useCustomFormContext must be used within a CustomFormProvider');
    }
    return value;
  };

  type ChatFormValues = { text: string };

  const CustomFormProvider = ({ children }: PropsWithChildren<any>): ReactElement => {
    const methods = useForm<ChatFormValues>({
      defaultValues: { text: '' },
    });

    const { register, control, getValues, setValue, handleSubmit, reset } = methods;
    const [chat, setChat] = React.useState(conversations)
    const [files, setFiles] = React.useState([])

    const value = useMemo(
      () => ({ register, control, getValues, setValue, handleSubmit, reset, chat, setChat , files, setFiles}),
      [register, control, setValue, getValues, handleSubmit, reset, chat, setChat, files, setFiles],
    );

    return <context.Provider value={value}>{children}</context.Provider>;
  };

  return { CustomFormProvider, useCustomFormContext };
}

export { createFormContext };
