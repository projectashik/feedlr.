import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import { ProjectLayout } from 'layouts';
import {
  Card,
  Typography,
  Button,
  Modal,
  Input,
  Divider,
  Radio,
  Badge,
} from 'components/ui';
import { FiClock, FiFilter } from 'react-icons/fi';
import { useState } from 'react';
import { EmojiSelect } from 'components';
import { MdComputer } from 'react-icons/md';
import Tippy from '@tippyjs/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ResponseCard } from 'components/Projects/ResponseCard';
import useSWR from 'swr';
import fetcher from 'libs/fetcher';
import { Response } from '@prisma/client';
import { FilterResponseModal } from 'components/Projects/FilterResponseModal';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { ResponseCardSkeleton } from 'components/Projects/ResponseCardSkeleton';
import { ResponseSearch } from 'components/Projects/ResponseSearch';

function ProjectIndexPage() {
  const router = useRouter();
  const { id } = router.query;
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [responses, setResponses] = useState([]);

  function toggleFilterModal() {
    setFilterModalVisible(!filterModalVisible);
  }

  let { data: fetchedResonses, error: projectsError } = useSWR(
    `/api/responses/getAll?projectId=${id}`,
    fetcher
  );
  useEffect(() => {
    setResponses(fetchedResonses);
  }, [fetchedResonses]);
  const onFilter = (filteredResponse: any) => {
    setResponses(filteredResponse);
  };

  return (
    <ProjectLayout id={id}>
      <Typography.Text>
        Total Responses: {responses ? responses.length : '0'}
      </Typography.Text>

      <div className='mt-4'>
        <div className='flex justify-between items-center'>
          <Typography.Title level={3}>Responses</Typography.Title>
          <Button type='text' onClick={toggleFilterModal} icon={<FiFilter />}>
            Filter
          </Button>
        </div>
      </div>
      <ResponseSearch />
      <div className='flex flex-col gap-4 mt-4'>
        {responses ? (
          responses.map((response: any) => (
            <ResponseCard key={response.id} response={response}></ResponseCard>
          ))
        ) : (
          <>
            <ResponseCardSkeleton />
            <ResponseCardSkeleton />
            <ResponseCardSkeleton />
            <ResponseCardSkeleton />
            <ResponseCardSkeleton />
            <ResponseCardSkeleton />
          </>
        )}
      </div>
      <FilterResponseModal
        filterModalVisible={filterModalVisible}
        toggleFilterModal={toggleFilterModal}
        responses={fetchedResonses}
        onFilter={onFilter}
      ></FilterResponseModal>
    </ProjectLayout>
  );
}

export default withPageAuthRequired(ProjectIndexPage);
