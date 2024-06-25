import { createFormContext } from '../CustomFormContext';

const { CustomFormProvider, useCustomFormContext } = createFormContext<any>();

export { CustomFormProvider as ChatFormProvider, useCustomFormContext as useChatFormContext };