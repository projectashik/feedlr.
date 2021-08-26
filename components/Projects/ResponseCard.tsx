import { Card, Typography } from 'components/ui';
import Tippy from '@tippyjs/react';
import Image from 'next/image';
import { MdComputer } from 'react-icons/md';
import { FiClock } from 'react-icons/fi';
import { Response } from '@prisma/client';
import { useUserAgent } from 'next-useragent';
export const ResponseCard = ({ response }: { response: Response }) => {
  const ua = useUserAgent(response.ua);
  return (
    <Card hoverable className='flex flex-col gap-4'>
      <div className='flex gap-4'>
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
        <div className='flex flex-col'>
          <Typography.Text strong className='uppercase text-sm'>
            From{' '}
            <Typography.Link
              href={response.url}
              className='normal-case font-normal'
            >
              {response.url}
            </Typography.Link>
          </Typography.Text>
          <Typography.Text>{response.feedback}</Typography.Text>
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <div>
          <Tippy content='Device Info'>
            <button className='flex items-center gap-3'>
              <MdComputer />
              <Typography.Text>
                {ua.browser} {ua.browserVersion} on {ua.os}(
                {ua.isDesktop ? 'Desktop' : 'Mobile'})
              </Typography.Text>
            </button>
          </Tippy>
        </div>
        <div>
          <Tippy content='11 August 2017 15:00:65'>
            <button className='flex items-center gap-3'>
              <FiClock />
              <Typography.Text>5 sec ago</Typography.Text>
            </button>
          </Tippy>
        </div>
      </div>
    </Card>
  );
};
