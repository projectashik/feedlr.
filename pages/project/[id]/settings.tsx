import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import { projects } from '@prisma/client';
import { DangerSettingsComponent } from 'components/Projects/Settings/Danger';
import { UISettingsComponent } from 'components/Projects/Settings/UI';
import { UXSettingsComponent } from 'components/Projects/Settings/UX';
import { ProjectLayout } from 'layouts';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import { Input, Modal, Typography, Button, Card } from 'components/ui';

function SettingsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: project, error: projectError } = useSWR<projects>(
    `/api/projects/get?id=${id}`
  );

  return (
    <ProjectLayout id={id}>
      <UXSettingsComponent />
      <UISettingsComponent />
      <DangerSettingsComponent project={project} />
    </ProjectLayout>
  );
}

export default withPageAuthRequired(SettingsPage);
