import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import { DangerSettingsComponent } from 'components/Projects/Settings/Danger';
import { UISettingsComponent } from 'components/Projects/Settings/UI';
import { UXSettingsComponent } from 'components/Projects/Settings/UX';
import { ProjectLayout } from 'layouts';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import { Input, Modal, Typography, Button, Card } from 'components/ui';
import { UrlsSettingsComponent } from 'components/Projects/Settings/Urls';
import { Project } from '@prisma/client';

function SettingsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: project, error: projectError } = useSWR<Project>(
    `/api/projects/get?id=${id}`
  );

  !project && null;

  return (
    <ProjectLayout id={id}>
      <UXSettingsComponent project={project} />
      <UISettingsComponent project={project} />
      <UrlsSettingsComponent project={project} />
      <DangerSettingsComponent project={project} />
    </ProjectLayout>
  );
}

export default withPageAuthRequired(SettingsPage);
