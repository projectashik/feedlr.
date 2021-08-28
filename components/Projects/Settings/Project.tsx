import axios from 'axios';
import { Typography, Card, Button, Modal, Space, Input } from 'components/ui';
import { BaseSyntheticEvent } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const ProjectSettingsComponent = ({ project }: any) => {
  const [name, setName] = useState(project ? project.name : '');
  const [url, setUrl] = useState(project ? project.url : '');

  const saveSetting = async () => {
    return await axios.post('/api/projects/update', {
      name,
      url,
      id: project.id,
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
    <section id='project' className='mb-4'>
      <Typography.Title level={4} className='font-bold'>
        Project
      </Typography.Title>
      <Card className='mt-4'>
        <form onSubmit={onSubmit} className=''>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Typography.Text>Name</Typography.Text>
              <Input
                onChange={(e) => setName(e.target.value)}
                className='mt-4'
                placeholder='Name'
                value={name ? name : ''}
              ></Input>
            </div>
            <div>
              <Typography.Text>Project URL</Typography.Text>
              <Input
                value={url ? url : ''}
                onChange={(e) => setUrl(e.target.value)}
                placeholder='URL'
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
