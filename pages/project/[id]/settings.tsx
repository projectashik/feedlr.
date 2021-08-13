import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import { DangerSettingsComponent } from 'components/Projects/Settings/Danger';
import { UISettingsComponent } from 'components/Projects/Settings/UI';
import { UXSettingsComponent } from 'components/Projects/Settings/UX';
import {
  Card,
  Radio,
  Typography,
  Divider,
  Input,
  Select,
  Button,
} from 'components/ui';
import { ProjectLayout } from 'layouts';
import Image from 'next/image';
import { useState } from 'react';

function SettingsPage() {
  return (
    <ProjectLayout>
      <UXSettingsComponent />
      <UISettingsComponent />
      <DangerSettingsComponent />
    </ProjectLayout>
  );
}

export default withPageAuthRequired(SettingsPage);
