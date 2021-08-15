import { projects } from '@prisma/client';
import { Card, Typography } from 'components/ui';
import Link from 'next/link';

export const ProjectCard = ({ project }: { project: projects }) => {
  const date = new Date(project.createdAt);
  const createdAt = date.toISOString().slice(0, 10);
  // const createdAt = date.toLocaleString("YYYY-mm-DD HH:ii:ss")
  return (
    <Link href={'/project/' + project.id}>
      <a>
        <Card hoverable>
          <Typography.Title level={4}>
            {project.name} ({project.url})
          </Typography.Title>
          <Typography.Text className='text-sm dark:text-gray-300 text-gray-600'>
            Created At: {project.createdAt}
          </Typography.Text>
        </Card>
      </a>
    </Link>
  );
};
