import {
  Typography,
  Button,
  Dropdown,
  Divider,
  Card,
  Input,
} from 'components/ui';
import { AuthLayout } from 'layouts';
import { FiEye, FiArrowLeft, FiMenu } from 'react-icons/fi';
import router from 'next/router';
import { WaitingForData } from 'components';
import { useEffect } from 'react';

export const ProjectLayout = ({ children }: any) => {
  const goBack = () => {
    router.back();
  };

  const goToResponses = () => {
    router.push('/project/random-id/');
  };

  const goToSettings = () => {
    router.push('/project/random-id/settings');
  };

  const goToInstallations = () => {
    router.push('/project/random-id/installations');
  };

  const Menu = () => {
    return (
      <Dropdown
        className='block md:hidden'
        align='end'
        side='bottom'
        overlay={[
          <Dropdown.Item onClick={goToResponses} key={Math.random()}>
            <Typography.Text>Responses</Typography.Text>
          </Dropdown.Item>,
          <Dropdown.Item onClick={goToSettings} key={Math.random()}>
            <Typography.Text>Settings</Typography.Text>
          </Dropdown.Item>,
          <Dropdown.Item onClick={goToInstallations} key={Math.random()}>
            <Typography.Text>Installations</Typography.Text>
          </Dropdown.Item>,
          <Dropdown.Item key={Math.random()}>
            <Typography.Text>Integration</Typography.Text>
          </Dropdown.Item>,
        ]}
      >
        <Button className='block md:hidden' icon={<FiMenu />}></Button>
      </Dropdown>
    );
  };
  return (
    <AuthLayout>
      <div className='page-header flex items-center justify-between z-30 bg-white dark:bg-gray-900 dark:border-gray-600 sticky top-14 border-b py-3'>
        <div className='flex items-center gap-4'>
          <span className='hidden md:flex'>
            <Button
              className=''
              onClick={goBack}
              tooltip='Go back'
              icon={<FiArrowLeft />}
            ></Button>
          </span>
          <Menu></Menu>
          <Typography.Text>Project Name</Typography.Text>
        </div>
        <nav>
          <ul className='md:flex gap-2 hidden'>
            <li>
              <Button
                type={
                  router.pathname === '/project/[id]' ? 'primary' : 'default'
                }
                onClick={goToResponses}
              >
                Responses
              </Button>
            </li>
            <li>
              <Button
                type={
                  router.pathname === '/project/[id]/settings'
                    ? 'primary'
                    : 'default'
                }
                onClick={goToSettings}
              >
                Settings
              </Button>
            </li>
            <li>
              <Button
                onClick={goToInstallations}
                type={
                  router.pathname === '/project/[id]/installations'
                    ? 'primary'
                    : 'default'
                }
              >
                Installations
              </Button>
            </li>
            <li>
              <Button
                type={
                  router.pathname === '/project/[id]/integration'
                    ? 'primary'
                    : 'default'
                }
              >
                Integration
              </Button>
            </li>
          </ul>
        </nav>

        <div className='flex items-center gap-4'>
          <Button icon={<FiEye />} tooltip='Preview Widget' />
        </div>
      </div>
      <WaitingForData />
      <div className='main-content mt-5'>{children}</div>
    </AuthLayout>
  );
};
