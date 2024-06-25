import React, { memo, useMemo } from 'react';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import supersub from 'remark-supersub';
import rehypeKatex from 'rehype-katex';
import { useRecoilValue } from 'recoil';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { cn, langSubset, validateIframe, processLaTeX } from '~/utils';
import CodeBlock from './CodeBlock';
// import { useChatContext, useToastContext } from '~/Providers';
import {message} from 'antd'
// import { useFileDownload } from '~/data-provider';
// import useLocalize from '~/hooks/useLocalize';
// import store from '~/store';


type TCodeProps = {
  inline: boolean;
  className?: string;
  children: React.ReactNode;
};

type TContentProps = {
  content: string;
  message: any;
  showCursor?: boolean;
};

export const code = memo(({ inline, className, children }: TCodeProps) => {
  const match = /language-(\w+)/.exec(className || '');
  const lang = match && match[1];

  if (inline) {
    return <code className={className}>{children}</code>;
  } else {
    return <CodeBlock lang={lang || 'text'} codeChildren={children} />;
  }
});

export const a = memo(({ href, children }: { href: string; children: React.ReactNode }) => {
  // const user = useRecoilValue(store.user);
  const user  = {
    id: '4379f052-ae9a-4d4b-b369-fec4148a931a'
  }

  // const { showToast } = useToastContext();
  // const localize = useLocalize();

  const { file_id, filename, filepath } = useMemo(() => {
    const pattern = new RegExp(`(?:files|outputs)/${user?.id}/([^\\s]+)`);
    const match = href.match(pattern);
    if (match && match[0]) {
      const path = match[0];
      const parts = path.split('/');
      const name = parts.pop();
      const file_id = parts.pop();
      return { file_id, filename: name, filepath: path };
    }
    return { file_id: '', filename: '', filepath: '' };
  }, [user?.id, href]);

  // const { refetch: downloadFile } = useFileDownload(user?.id ?? '', file_id);
  const props: { target?: string; onClick?: React.MouseEventHandler } = { target: '_new' };

  if (!file_id || !filename) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  const handleDownload = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    try {
      message.info("Download feature needs to be implemented")
      // const stream = await downloadFile();
      // if (!stream.data) {
      //   console.error('Error downloading file: No data found');
      //   showToast({
      //     status: 'error',
      //     message: <span>UI Download Error</span>,
      //   });
      //   return;
      // }
      // const link = document.createElement('a');
      // link.href = stream.data;
      // link.setAttribute('download', filename);
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      // window.URL.revokeObjectURL(stream.data);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  props.onClick = handleDownload;
  props.target = '_blank';

  return (
    <a
      href={filepath.startsWith('files/') ? `/api/${filepath}` : `/api/files/${filepath}`}
      {...props}
    >
      {children}
    </a>
  );
});

export const p = memo(({ children }: { children: React.ReactNode }) => {
  return <p className="mb-2 whitespace-pre-wrap">{children}</p>;
});

const cursor = ' ';
const Markdown = memo(({ content, message, showCursor }: TContentProps) => {
  // const { isSubmitting, latestMessage } = useChatContext();
  const isSubmitting = false
  const LaTeXParsing = false //useRecoilValue<boolean>(store.LaTeXParsing);

  const isInitializing = content === '';

  const { isEdited, messageId } = message ?? {};
  const isLatestMessage = true // messageId === latestMessage?.messageId;

  let currentContent = content;
  if (!isInitializing) {
    currentContent = currentContent?.replace('z-index: 1;', '') ?? '';
    currentContent = LaTeXParsing ? processLaTeX(currentContent) : currentContent;
  }

  const rehypePlugins: any = [
    [rehypeKatex, { output: 'mathml' }],
    [
      rehypeHighlight,
      {
        detect: true,
        ignoreMissing: true,
        subset: langSubset,
      },
    ],
    [rehypeRaw],
  ];

  if (isInitializing) {
    rehypePlugins.pop();
    return (
      <div className="absolute">
        <p className="relative">
          <span className={cn(isSubmitting ? 'result-thinking' : '')} />
        </p>
      </div>
    );
  }

  let isValidIframe: string | boolean | null = false;
  if (!isEdited) {
    isValidIframe = validateIframe(currentContent);
  }

  if (isEdited || ((!isInitializing || !isLatestMessage) && !isValidIframe)) {
    rehypePlugins.pop();
  }

  return (
    <ReactMarkdown
      remarkPlugins={[supersub, remarkGfm, [remarkMath, { singleDollarTextMath: true }]]}
      rehypePlugins={rehypePlugins}
      linkTarget="_new"
      components={
        {
          code,
          a,
          p,
        } as {
          [nodeType: string]: React.ElementType;
        }
      }
    >
      {isLatestMessage && isSubmitting && !isInitializing && showCursor
        ? currentContent + cursor
        : currentContent}
    </ReactMarkdown>
  );
});

export default Markdown;
