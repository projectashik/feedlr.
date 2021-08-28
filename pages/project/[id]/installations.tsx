import { ProjectLayout } from 'layouts';
import { useRouter } from 'next/router';
import { Card, Typography, Input } from 'components/ui';
import useSWR from 'swr';
import { Project } from '@prisma/client';

export default function InstallationSettingsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data: project, error: projectError } = useSWR<Project>(
    `/api/projects/get?id=${id}`
  );

  return (
    <>
      <ProjectLayout id={id}>
        Installations
        <Card className='mt-2'>
          <p>
            <Typography.Text strong>For Production</Typography.Text>
          </p>
          <Typography.Text>
            Add the following script to your head tag. Then Feedlr. will show
            widget to your site
          </Typography.Text>
          <Input
            disabled
            className='mt-3 '
            inputClass='py-3 dark:bg-gray-800'
            copy
            value={`<script src="${window.location.origin}/init.js"></script>`}
          />
        </Card>
        <Card className='mt-2'>
          <p>
            <Typography.Text strong>For localhost</Typography.Text>
          </p>
          <Typography.Text>
            Add the following script to your head tag. Then Feedlr. will show
            widget to your site
          </Typography.Text>
          <Input
            disabled
            className='mt-3 '
            inputClass='py-3 dark:bg-gray-800'
            copy
            value={`<script src="${window.location.origin}/init.js" data-feedlr-project-id="${project?.id}"></script>`}
          />
        </Card>
      </ProjectLayout>
    </>
    // <>Installation</>
  );
}
