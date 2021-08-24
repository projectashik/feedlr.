import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import { Button, Typography, Space, Modal, Input } from 'components/ui';
import Card from 'components/ui/Card/Card';
import { AuthLayout } from 'layouts';
import { FiPlus, FiTrash } from 'react-icons/fi';
import React from 'react';
import { useAtom } from 'jotai';
import { createProjectVisibleAtom } from 'state';
import useSWR from 'swr';
import fetcher from 'libs/fetcher';
import { ProjectCard } from 'components/Projects/ProjectCard';
import Skeleton from 'react-loading-skeleton';
import { Project } from '@prisma/client';

function DashboardIndex() {
  const [visible, setVisible] = useAtom(createProjectVisibleAtom);
  function toggleCreateProjectModal() {
    setVisible(!visible);
  }
  const { data: projects, error: projectsError } = useSWR(
    '/api/projects/getAll',
    fetcher
  );

  return (
    <AuthLayout>
      <Typography.Title level={3}>Your Projects</Typography.Title>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-5'>
        <div className='order-2 md:order-1 col-span-2 grid grid-col-1 gap-4'>
          {projects &&
            projects.map((project: Project) => {
              return (
                <ProjectCard key={project.id} project={project}></ProjectCard>
              );
            })}

          {!projects && (
            <Card hoverable>
              <Typography.Title level={4}>
                <Skeleton></Skeleton>
              </Typography.Title>
              <Typography.Text className='text-sm dark:text-gray-300 text-gray-600'>
                <Skeleton></Skeleton>
              </Typography.Text>
            </Card>
          )}

          {/* @ts-ignore */}
          {projects?.length < 1 && 'No Projects Found'}
        </div>
        <div className='order-1 md:order-2'>
          <div>
            <Button
              type='primary'
              icon={<FiPlus />}
              onClick={toggleCreateProjectModal}
            >
              Create New Project
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

export default withPageAuthRequired(DashboardIndex);
