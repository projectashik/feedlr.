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
    <section id='Urls' className='mt-4'>
    </section>
  );
};
