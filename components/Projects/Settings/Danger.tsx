import axios from 'axios';
import {
  Typography,
  Card,
  Button,
  Modal,
  Space,
  Input,
  Switch,
} from 'components/ui';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FiAlertCircle, FiTrash } from 'react-icons/fi';
import { DeleteProjectModal } from '../DeleteProjectModal';

interface Props {
  project: any;
}

export const DangerSettingsComponent = ({ project }: Props) => {
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(
    project?.setting ? project?.setting.localhostEnabled : false
  );
  const [projectUrl, setProjectUrl] = useState('');

  async function changeLocalhost() {
    setEnabled(!enabled);
    const res = await axios.post('/api/projects/settings/localhost', {
      localhostEnabled: !enabled,
      projectId: project.id,
    });
    if (res.data.success) {
      toast.success('Settings updated');
    } else {
      console.log(res);
      setEnabled(false);
      toast.error('Something went wrong');
    }
  }

  function toggle() {
    setVisible(!visible);
  }

  return (
    <section id='Danger' className='mt-4'>
      <Typography.Title level={4} className='font-bold'>
        Danger Zone
      </Typography.Title>
      <Card className='mt-4 flex justify-between items-center'>
        <Typography.Text strong>Enable Localhost?</Typography.Text>
        <Switch enabled={enabled} onChange={changeLocalhost}>
          Enable Localhost
        </Switch>
      </Card>
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
