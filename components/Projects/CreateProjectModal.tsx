import axios from 'axios';
import { Modal, Input } from 'components/ui';
import router from 'next/router';
import { useState } from 'react';
interface Props {
  visible: boolean;
  onCancel: any;
}
import toast from 'react-hot-toast';

export const CreateProjectModal = ({ visible, onCancel }: Props) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [nameError, setNameError] = useState('');
  const [urlError, setUrlError] = useState('');

  const [loading, setLoading] = useState(false);

  const urlRegex = new RegExp(
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  );

  const createProject = async () => {
    setLoading(true);
    setNameError('');
    setUrlError('');
    if (!name) {
      setNameError('Project name field is required.');
      setLoading(false);
    }
    if (!url) {
      setUrlError('Project url field is required');
      setLoading(false);
    }

    if (nameError || urlError) {
      setLoading(false);
      return false;
    }

    if (!url.match(urlRegex)) {
      setUrlError('Invalid URL format');
      setLoading(false);
      return false;
    }

    const createReq = await axios.post('/api/projects/create', {
      name,
      url,
    });
    if (createReq.data.success) {
      router.push('/project/' + createReq.data.data.id + '/installations');
      setLoading(false);
      onCancel();
    } else {
      console.log(createReq.data);
      if (createReq.data.field === 'url') {
        setUrlError(createReq.data.error);
      }
      setLoading(false);
      return false;
    }
    setLoading(false);
  };

  return (
    <Modal
      closable
      visible={visible}
      confirmText='Create Project'
      title='Create a new project'
      onCancel={onCancel}
      onConfirm={createProject}
      loading={loading}
    >
      <form action=''>
        <Input
          error={nameError}
          onChange={(e) => setName(e.target.value)}
          label='Project Name'
          placeholder='Enter amazing name of your project'
        />
        <div className='my-6'></div>
        <Input
          error={urlError}
          type='url'
          onChange={(e) => setUrl(e.target.value)}
          label='Project URL'
          placeholder='Enter Project url'
          icon='https://'
          inputClass='pl-20'
        />
      </form>
    </Modal>
  );
};
