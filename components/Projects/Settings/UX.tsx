import Image from 'next/image';
import {
  Typography,
  Card,
  Button,
  Input,
  Divider,
  Select,
} from 'components/ui';
import { useState } from 'react';

export const UXSettingsComponent = () => {
  const [feedbackType, setFeedbackType] = useState('emoji');
  return (
    <section id='UX'>
      <Typography.Title level={4} className='font-bold'>
        Widget
      </Typography.Title>
      <Card className='mt-4'>
        <form action=''>
          <div className='flex gap-4'>
            <div className='flex-1'>
              <Typography.Text strong>Feedback Type</Typography.Text>
              <div className='flex gap-4 mt-4'>
                <button
                  type='button'
                  onClick={() => setFeedbackType('emoji')}
                  className={
                    'border-2 flex dark:border-gray-650 flex-col items-center  focus:border-brand-300 p-2 rounded justify-end ' +
                    (feedbackType === 'emoji'
                      ? ' border-brand-400 dark:border-brand-400 justify-between'
                      : '')
                  }
                >
                  {feedbackType === 'emoji' && (
                    <p className='text-center font-bold mb-2 text-brand-600'>
                      Current
                    </p>
                  )}
                  <Image
                    src='/fd-types/emoji.png'
                    width={200}
                    height={145}
                    alt='Emoji'
                  />
                </button>
                <button
                  type='button'
                  onClick={() => setFeedbackType('category')}
                  className={
                    'border-2 dark:border-gray-650 flex flex-col items-center  focus:border-brand-300 p-2 rounded justify-end ' +
                    (feedbackType === 'category'
                      ? ' border-brand-400 dark:border-brand-400 justify-between'
                      : '')
                  }
                >
                  {feedbackType === 'category' && (
                    <p className='text-center font-bold mb-2 text-brand-600'>
                      Current
                    </p>
                  )}
                  <Image
                    src='/fd-types/category.png'
                    width={200}
                    height={145}
                    alt='category'
                  />
                </button>
              </div>
            </div>
          </div>
          <Divider light className='my-4' />
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Typography.Text strong>Question?</Typography.Text>
              <Input defaultValue='What do you think about Feedlr?' />
            </div>
            <div>
              <Typography.Text strong>Thank you message</Typography.Text>
              <Input defaultValue='Thanks for your feedback.' />
            </div>
          </div>
          <Divider light className='my-4' />
          <div>
            <Typography.Text strong>Cool Down</Typography.Text>
            <div className='grid grid-cols-2 gap-4 mt-3'>
              <div>
                <Typography.Text>After Response</Typography.Text>
                <Select>
                  <Select.Option value='no'>Don&apos;t Cool</Select.Option>
                  <Select.Option value='day'>1 day</Select.Option>
                  <Select.Option value='week'>1 week</Select.Option>
                  <Select.Option value='month'>1 month</Select.Option>
                </Select>
              </div>
              <div>
                <Typography.Text>After Cancel</Typography.Text>
                <Select>
                  <Select.Option value='no'>Don&apos;t Cool</Select.Option>
                  <Select.Option value='day'>1 day</Select.Option>
                  <Select.Option value='week'>1 week</Select.Option>
                  <Select.Option value='month'>1 month</Select.Option>
                </Select>
              </div>
            </div>
          </div>
          <div className='mt-4 flex justify-end'>
            <Button type='primary'>Save</Button>
          </div>
        </form>
      </Card>
    </section>
  );
};
