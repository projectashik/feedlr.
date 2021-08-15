import { Navbar } from 'components';
import { Modal, Input } from 'components/ui';
import { useAtom } from 'jotai';
import { createProjectVisibleAtom } from 'state';
import { CreateProjectModal } from 'components/Projects/CreateProjectModal';

export const AuthLayout = ({ children }: any) => {
  const [visible, setVisible] = useAtom(createProjectVisibleAtom);
  function toggleCreateProjectModal() {
    setVisible(!visible);
  }
  return (
    <>
      <Navbar />
      <main className='container mx-auto px-5 md:px-8 my-4'>{children}</main>
      <CreateProjectModal
        visible={visible}
        onCancel={toggleCreateProjectModal}
      />
    </>
  );
};
