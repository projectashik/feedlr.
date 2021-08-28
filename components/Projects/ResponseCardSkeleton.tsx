import { Card } from 'components/ui';
import Skeleton from 'react-loading-skeleton';
export const ResponseCardSkeleton = () => {
  return (
    <Card hoverable className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        <div>
          <Skeleton height={40} width={40}></Skeleton>
        </div>
        <div className='flex flex-col'>
          <Skeleton width={100}></Skeleton>
          <Skeleton width={100} />
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <div>
          <Skeleton />
        </div>
        <div>
          <Skeleton></Skeleton>
        </div>
        <div>
          <Skeleton />
        </div>
      </div>
    </Card>
  );
};
