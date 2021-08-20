import { Typography, Card, Button, Modal, Space, Input } from 'components/ui';
import { useRef, useState } from 'react';
import { FiAlertCircle, FiTrash } from 'react-icons/fi';
import { DeleteProjectModal } from '../DeleteProjectModal';

interface Props {
  project: any;
}

export const DangerSettingsComponent = ({ project }: Props) => {
  const [visible, setVisible] = useState(false);
  const [projectUrl, setProjectUrl] = useState('');

  function toggle() {
    setVisible(!visible);
  }

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
      <DeleteProjectModal
        visible={visible}
        setVisible={setVisible}
        project={project}
      />
    </section>
  );
};
