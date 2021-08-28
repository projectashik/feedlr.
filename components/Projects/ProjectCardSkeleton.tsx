import { Card, Typography } from 'components/ui';
import Skeleton from 'react-loading-skeleton';
export const ProjectCardSkeleton = () => {
  return (
    <Card hoverable>
      <Typography.Title level={4}>
        <Skeleton></Skeleton>
      </Typography.Title>
      <Typography.Text className='text-sm dark:text-gray-300 text-gray-600'>
        <Skeleton></Skeleton>
      </Typography.Text>
    </Card>
  );
};
