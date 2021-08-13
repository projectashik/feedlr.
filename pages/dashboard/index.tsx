import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import { Button, Typography, Space, Modal, Input } from 'components/ui';
import Card from 'components/ui/Card/Card';
import { AuthLayout } from 'layouts';
import Link from 'next/link';
import { FiPlus, FiTrash } from 'react-icons/fi';
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { createProjectVisibleAtom } from 'state';

function DashboardIndex() {
  const [visible, setVisible] = useAtom(createProjectVisibleAtom);
  function toggleCreateProjectModal() {
    setVisible(!visible);
  }

  return (
    <AuthLayout>
      <Typography.Title level={3}>Your Projects</Typography.Title>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-5'>
        <div className='order-2 md:order-1 col-span-2 grid grid-col-1 gap-4'>
          <Link href='/project/random-id/'>
            <a>
              <Card hoverable>
                <Typography.Title level={4}>Project Name</Typography.Title>
                <Typography.Text className='text-sm dark:text-gray-300 text-gray-600'>
                  Created At: 2078-06-09
                </Typography.Text>
              </Card>
            </a>
          </Link>
          <Link href='/'>
            <a>
              <Card hoverable>
                <Typography.Title level={4}>Project Name</Typography.Title>
                <Typography.Text className='text-sm text-gray-600 dark:text-gray-300'>
                  Created At: 2078-06-09
                </Typography.Text>
              </Card>
            </a>
          </Link>
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
