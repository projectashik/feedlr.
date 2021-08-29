import axios from 'axios';
import { Modal, Typography, Input, Space, Button, Badge } from 'components/ui';
import router from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiTrash } from 'react-icons/fi';
export const DeleteResponseModal = ({ visible, setVisible, response }: any) => {
  const [loading, setLoading] = useState(false);
  const projectId = response.projectId;

  function toggle() {
    setVisible(!visible);
  }

  async function onSubmit() {
    setLoading(true);

    const res = await axios.delete('/api/responses/delete', {
      data: {
        id: response.id,
      },
    });

    if (res.data.success) {
      toggle();
      // router.prefetch(`/project/${projectId}`);
      router.reload();
      toast.success('Response removed');
    } else {
      toast.error('Error Occured');
      console.log('error');
    }
  }
  return (
    <Modal
      visible={visible}
      layout='vertical'
      title='Delete Response'
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
        <br />
        <Typography.Text>
          Do you want to delete <strong>{response.feedback}</strong>?
        </Typography.Text>
      </p>
    </Modal>
  );
};
