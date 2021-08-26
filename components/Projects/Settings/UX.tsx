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
import { BaseSyntheticEvent } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

export const UXSettingsComponent = ({ project }: { project: any }) => {
  console.log(project);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [questionError, setQuestionError] = useState('');
  const [thankYouMessageError, setThankYouMessageError] = useState('');

  const [feedbackType, setFeedbackType] = useState(
    project?.setting ? project?.setting.type : 'emoji'
  );
  const [question, setQuestion] = useState(
    project?.setting
      ? project?.setting.question
      : 'What do you think about %name%?'
  );

  const [thankYouMessage, setThankYouMessage] = useState(
    project?.setting
      ? project?.setting.thankYouMessage
      : 'Thanks for your feedback.'
  );

  const [coolDownResponse, setCoolDownResponse] = useState(
    project?.setting ? project?.setting.coolDownResponse : 0
  );
  console.log(coolDownResponse);

  const saveSetting = async () => {
    return await axios.post('/api/projects/settings/widget', {
      type: feedbackType,
      question,
      thankYouMessage,
      coolDownResponse,
      projectId: project.id,
    });
  };

  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    if (thankYouMessage.length < 1) {
      setThankYouMessageError('Thank you message is required');
      setLoading(false);
      return false;
    }
    if (question < 1) {
      setQuestion('What do you think about %name%?');
      setLoading(false);
      return false;
    }
    setLoading(false);
    toast.promise(saveSetting(), {
      loading: 'Saving...',
      success: <b>Settings saved!</b>,
      error: <b>Could not save.</b>,
    });
  };

  return (
    <section id='UX'>
      <Typography.Title level={4} className='font-bold'>
        Widget
      </Typography.Title>
      <Card className='mt-4'>
        <form onSubmit={onSubmit}>
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
                  disabled
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
                  <p className='text-center font-bold mb-2 text-brand-600'>
                    Being built
                  </p>
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
              <Input
                error={questionError}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                defaultValue='What do you think about %name%?'
              />
            </div>
            <div>
              <Typography.Text strong>Thank you message</Typography.Text>
              <Input
                error={thankYouMessageError}
                value={thankYouMessage}
                onChange={(e) => setThankYouMessage(e.target.value)}
                defaultValue='Thanks for your feedback.'
              />
            </div>
          </div>
          <Divider light className='my-4' />
          <div>
            <Typography.Text strong>Cool Down</Typography.Text>
            <div className='grid grid-cols-2 gap-4 mt-3'>
              <div>
                <Typography.Text>After Response (Days)</Typography.Text>
                <Input
                  type='number'
                  value={coolDownResponse}
                  onChange={(e) => setCoolDownResponse(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='mt-4 flex justify-end'>
            <Button htmlType='submit' type='primary' loading={loading}>
              Save
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
};
