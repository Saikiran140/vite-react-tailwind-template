import Files from './Files';

const Container = ({ children, message }: { children: React.ReactNode; message: any }) => (
  <div className="text-message flex min-h-[20px] flex-col items-start gap-3 overflow-x-auto [.text-message+&]:mt-5">
    {message.isCreatedByUser && <Files message={message} />}
    {children}
  </div>
);

export default Container;
