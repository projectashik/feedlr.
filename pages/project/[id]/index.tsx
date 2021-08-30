import { withPageAuthRequired } from '@auth0/nextjs-auth0/dist/frontend';
import { ProjectLayout } from 'layouts';
import { Typography, Button, Input } from 'components/ui';
import { FiFilter } from 'react-icons/fi';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { ResponseCard } from 'components/Projects/ResponseCard';
import useSWR from 'swr';
import fetcher from 'libs/fetcher';
import { FilterResponseModal } from 'components/Projects/FilterResponseModal';
import { useEffect } from 'react';
import { ResponseCardSkeleton } from 'components/Projects/ResponseCardSkeleton';

function ProjectIndexPage() {
  const router = useRouter();
  const { id } = router.query;
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [responses, setResponses] = useState<any[]>([]);
  const [defaultResponses, setDefaultResponses] = useState<any[]>([]);
  const [feedbackSearch, setFeedbackSearch] = useState('');
  const [urlSearch, setUrlSearch] = useState('');

  function toggleFilterModal() {
    setFilterModalVisible(!filterModalVisible);
  }

  let { data: fetchedResponses, error: projectsError } = useSWR(
    `/api/responses/getAll?projectId=${id}`,
    fetcher
  );
  useEffect(() => {
    setResponses(fetchedResponses);
    setDefaultResponses(fetchedResponses);
  }, [fetchedResponses]);

  const onFilter = (filteredResponse: any) => {
    setResponses(filteredResponse);
  };

  const checkName = (name: string, str: string) => {
    var pattern = str
      .toLowerCase()
      .split('')
      .map((x) => {
        return `(?=.*${x})`;
      })
      .join('');
    var regex = new RegExp(`${pattern}`, 'g');
    return name.toLowerCase().match(regex);
  };

  const onFeedbackSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const fResponses = responses;

    setFeedbackSearch(e.target.value);
    if (e.target.value.length > 0) {
      const searchedResponses = defaultResponses.filter((res) => {
        return checkName(res.feedback, e.target.value);
      });
      setResponses(searchedResponses);
    } else {
      setResponses(defaultResponses);
    }
  };

  const onUrlSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setUrlSearch(e.target.value);
    if (e.target.value.length > 0) {
      const searchedResponses = defaultResponses.filter((res) => {
        return checkName(res.url, e.target.value);
      });
      setResponses(searchedResponses);
    } else {
      setResponses(defaultResponses);
    }
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
      <div className='grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 md:gap-10 mt-4'>
        <Input
          value={feedbackSearch}
          onChange={onFeedbackSearch}
          placeholder='Search By Feedback'
          className='mb-10 md:mb-0'
        />
        <Input
          value={urlSearch}
          onChange={onUrlSearch}
          placeholder='Search By URL'
          className='mb-10 md:mb-0'
        />
      </div>
      <div className='flex flex-col gap-4 mt-4'>
        {responses ? (
          responses.length > 0 ? (
            responses.map((response: any) => (
              <ResponseCard
                key={response.id || response.item.id}
                response={response.item || response}
              ></ResponseCard>
            ))
          ) : (
            <Typography.Text>No Responses Found</Typography.Text>
          )
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
        responses={fetchedResponses}
        onFilter={onFilter}
      ></FilterResponseModal>
    </ProjectLayout>
  );
}

export default withPageAuthRequired(ProjectIndexPage);
