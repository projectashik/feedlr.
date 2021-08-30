import { Card, Typography, Button } from 'components/ui';
import Tippy from '@tippyjs/react';
import Image from 'next/image';
import { MdComputer } from 'react-icons/md';
import { FiClock, FiMail, FiTrash } from 'react-icons/fi';
import { Response } from '@prisma/client';
import { useUserAgent } from 'next-useragent';
import TimeAgo from 'react-timeago';
import { DeleteResponseModal } from './DeleteResponseModal';
import { useState } from 'react';

export const ResponseCard = ({ response }: { response: Response }) => {
  const ua = useUserAgent(response.ua);
  const [visible, setVisible] = useState(false);
  const responseDevice = ua.isDesktop
    ? 'Desktop'
    : ua.isMobile
    ? 'Mobile'
    : ua.isTablet
    ? 'Tablet'
    : 'Desktop';
  const createdDate = new Date(response.createdAt);
  function toggle() {
    setVisible(!visible);
  }
  return (
    <>
      <Card hoverable className='relative card flex flex-col gap-4'>
        <div className='flex gap-4'>
          {response && response.emoji && (
            <div>
              <Tippy content={response.emoji}>
                <button>
                  <Image
                    src={'/widget/emojis/' + response.emoji + '.gif'}
                    width={40}
                    height={40}
                    alt='Emoji'
                  />
                </button>
              </Tippy>
            </div>
          )}
          <div className='flex flex-col'>
            {response && response.url && (
              <Typography.Text strong className='uppercase text-sm'>
                From{' '}
                <Typography.Link
                  href={response ? response.url : '/dashboard'}
                  className='normal-case font-normal'
                >
                  {response.url}
                </Typography.Link>
              </Typography.Text>
            )}
            <Typography.Text>{response.feedback}</Typography.Text>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          {response.email && (
            <div>
              <Tippy content='Email'>
                <button className='flex items-center gap-3'>
                  <FiMail />
                  <Typography.Text>{response.email}</Typography.Text>
                </button>
              </Tippy>
            </div>
          )}
          <div>
            <Tippy content='Device Info'>
              <button className='flex items-center gap-3'>
                <MdComputer />
                <Typography.Text>
                  {ua.browser} {ua.browserVersion} on {ua.os}(
                  <span className='text-capitalize'>{responseDevice}</span>)
                  {ua.isBot && '(Bot)'}
                </Typography.Text>
              </button>
            </Tippy>
          </div>
          <div>
            <Tippy content={createdDate.toString()}>
              <button className='flex items-center gap-3'>
                <FiClock />
                <Typography.Text>
                  <TimeAgo date={createdDate} />
                </Typography.Text>
              </button>
            </Tippy>
          </div>
        </div>
        <div className='actions absolute right-4'>
          <Button onClick={toggle} danger>
            <FiTrash />
          </Button>
        </div>
      </Card>
      <DeleteResponseModal
        visible={visible}
        setVisible={setVisible}
        response={response}
      />
    </>
  );
};
