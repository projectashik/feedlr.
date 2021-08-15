import axios from 'axios';
import { Modal, Typography, Input, Space, Button, Badge } from 'components/ui';
import router from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiTrash } from 'react-icons/fi';
export const DeleteProjectModal = ({ visible, setVisible, project }: any) => {
  const [projectUrl, setProjectUrl] = useState('');
  const [urlError, setUrlError] = useState('');
  const [loading, setLoading] = useState(false);

  function toggle() {
    setVisible(!visible);
  }

  async function onSubmit() {
    setLoading(true);
    if (projectUrl.length < 1) {
      setUrlError('Url is required');
      setLoading(false);
      return false;
    }

    if (projectUrl !== project.url) {
      setLoading(false);
      setUrlError('Url mismatched');
      return false;
    }

    const response = await axios.delete('/api/projects/delete', {
      data: {
        id: project.id,
      },
    });

    if (response.data.success) {
      router.push('/dashboard');
      toast.success('Project removed');
    } else {
      toast.error('Error Occured');
      console.log('error');
    }
  }
  return (
    <Modal
      visible={visible}
      layout='vertical'
      title='Delete Project'
      onCancel={toggle}
      customFooter={[
        <div
          className='flex items-center gap-2 justify-center'
          key={Math.random()}
        >
          <Button type='outline' onClick={toggle}>
            Cancel
          </Button>
          <Button
            type='primary'
            onClick={onSubmit}
            disabled={projectUrl !== project?.url}
            danger
            loading={loading}
            icon={<FiTrash />}
          >
            Delete
          </Button>
        </div>,
      ]}
    >
      <p>
        <Typography.Text type='danger'>
          This action is irreversible
        </Typography.Text>
      </p>
      <Typography.Text>
        Type <strong>{project?.url}</strong> to confirm
      </Typography.Text>
      <form>
        <Input
          onChange={(e) => {
            setProjectUrl(e.target.value);
          }}
          label='Project Name'
          placeholder='Enter amazing name of your project'
        />
      </form>
    </Modal>
  );
};
