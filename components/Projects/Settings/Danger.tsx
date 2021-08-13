import { Typography, Card, Button, Modal, Space, Input } from 'components/ui';
import { useState } from 'react';
import { FiAlertCircle, FiTrash } from 'react-icons/fi';
export const DangerSettingsComponent = () => {
  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible(!visible);
  }
  const DeleteModal = () => {
    return (
      <Modal
        visible={visible}
        layout='vertical'
        title='Delete Project'
        onCancel={toggle}
        closable
        customFooter={[
          <Space key={Math.random()}>
            <Button type='outline' onClick={toggle}>
              Cancel
            </Button>
            <Button danger onClick={toggle} icon={<FiTrash />}>
              Delete
            </Button>
          </Space>,
        ]}
      >
        <p>
          <Typography.Text>This action is irreversible</Typography.Text>
        </p>
        <Typography.Text>
          Type <strong>feedlr.tk</strong> to confirm
        </Typography.Text>
        <Input placeholder='Project URL' />
      </Modal>
    );
  };
  return (
    <section id='Danger' className='mt-4'>
      <Typography.Title level={4} className='font-bold'>
        Danger Zone
      </Typography.Title>
      <Card className='mt-4 flex justify-between items-center'>
        <Typography.Text strong>Delete Project?</Typography.Text>
        <Button danger type='primary' onClick={toggle}>
          Delete Project
        </Button>
      </Card>
      <DeleteModal />
    </section>
  );
};
