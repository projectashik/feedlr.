import { Navbar } from 'components';
import { Modal, Input } from 'components/ui';
import { useAtom } from 'jotai';
import { createProjectVisibleAtom } from 'state';

export const AuthLayout = ({ children }: any) => {
  const [visible, setVisible] = useAtom(createProjectVisibleAtom);
  function toggleCreateProjectModal() {
    setVisible(!visible);
  }
  const CreateProjectModal = () => {
    return (
      <Modal
        closable
        visible={visible}
        confirmText='Create Project'
        title='Create a new project'
        onCancel={toggleCreateProjectModal}
      >
        <form action=''>
          <Input
            label='Project Name'
            placeholder='Enter amazing name of your project'
          />
          <div className='my-6'></div>
          <Input
            label='Project URL'
            placeholder='Enter Project url'
            icon='https://'
            inputClass='pl-20'
          />
        </form>
      </Modal>
    );
  };
  return (
    <>
      <Navbar />
      <main className='container mx-auto px-5 md:px-8 my-4'>{children}</main>
      <CreateProjectModal />
    </>
  );
};
