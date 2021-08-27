import axios from 'axios';
import { Typography, Card, Button, Modal, Space, Input } from 'components/ui';
import { BaseSyntheticEvent } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const UrlsSettingsComponent = ({ project }: any) => {
  const [includeUrls, setIncludeUrls] = useState(
    project?.setting ? project?.setting.includeUrls : ''
  );
  const [excludeUrls, setExcludeUrls] = useState(
    project?.setting ? project?.setting.excludeUrls : ''
  );

  const saveSetting = async () => {
    return await axios.post('/api/projects/settings/urls', {
      includeUrls,
      excludeUrls,
      projectId: project.id,
    });
  };

  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    toast.promise(saveSetting(), {
      loading: 'Saving...',
      success: <b>Settings saved!</b>,
      error: <b>Could not save.</b>,
    });
  };
  return (
    <section id='Urls' className='mt-4'>
      <Typography.Title level={4} className='font-bold'>
        Urls
      </Typography.Title>
      <Card className='mt-4'>
        <form onSubmit={onSubmit} className=''>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Typography.Text>
                Include Urls (Seperate values by comma)
              </Typography.Text>
              <Input.TextArea
                onChange={(e) => setIncludeUrls(e.target.value)}
                className='mt-4'
                placeholder='eg: /blog, /auth'
                value={includeUrls ? includeUrls : ''}
              ></Input.TextArea>
            </div>
            <div>
              <Typography.Text>
                Exclude Urls (Seperate values by comma)
              </Typography.Text>
              <Input.TextArea
                value={excludeUrls ? excludeUrls : ''}
                onChange={(e) => setExcludeUrls(e.target.value)}
                placeholder='eg: /blog, /auth'
                className='mt-4'
              />
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
