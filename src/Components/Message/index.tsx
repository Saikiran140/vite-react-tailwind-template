import { cn } from '~/utils';
import { useChatFormContext } from '~/Providers/ChatFormContext';
import MessageContent from './MessageContent';
import '~/css/index.css'
const Message = () => {
  const { chat } = useChatFormContext()

  const assistantUrl = 'https://cdn.prod.website-files.com/648e04d4bbae7004f1b35f15/65c2abaa0c6e8a238718b207_sivi-icon.png'
  const userUrl = 'https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png'

  return (
    <div>
      {chat.map((message, inx) => (

        <div
          key={inx}
          className="text-token-text-primary w-full border-0 bg-transparent dark:border-0 dark:bg-transparent"
        // onWheel={handleScroll}
        // onTouchMove={handleScroll}
        >
          <div className="m-auto justify-center p-4 py-2 text-base md:gap-6 bg-white ">
            <div className="final-completion group mx-auto flex flex-1 gap-3 text-base md:max-w-3xl md:px-5 lg:max-w-[40rem] lg:px-1 xl:max-w-[48rem] xl:px-5">
              <div className="relative flex flex-shrink-0 flex-col items-end">
                <div>
                  <div className="pt-0.5">
                    <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
                      <div><img src={message.isCreatedByUser ? userUrl : assistantUrl} alt='logo not found' width="20px" height="20px" /></div>          </div>
                  </div>
                </div>
              </div>
              <div
                className={cn('relative flex w-11/12 flex-col', message.isCreatedByUser ? '' : 'agent-turn')}
              >
                <div className="select-none font-semibold">{message.sender}</div>
                <div className="flex-col gap-1 md:gap-3">
                  <div className="flex max-w-full flex-grow flex-col gap-0">
                    {/* Legacy Plugins */}
                    <MessageContent text={message['text']} message={message} />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Message


