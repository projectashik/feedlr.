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

function ProjectIndexPage() {
  const router = useRouter();
  const { id } = router.query;
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  function toggleFilterModal() {
    setFilterModalVisible(!filterModalVisible);
  }

  const { data: responses, error: projectsError } = useSWR(
    `/api/responses/getAll?projectId=${id}`,
    fetcher
  );

  console.log(responses);

  const FilterModal = () => {
    const onEmojiSelect = (emoji: any) => {
      console.log(emoji);
    };
    return (
      <Modal
        closable
        title='Filter Responses'
        visible={filterModalVisible}
        onCancel={toggleFilterModal}
        onConfirm={toggleFilterModal}
      >
        <div>
          <Typography.Text>By Date:</Typography.Text>
          <div className='flex  flex-col md:flex-row gap-2 mt-3'>
            <Input type='date' className='flex-1' label='From' />
            <Input type='date' className='flex-1' label='To' />
          </div>
        </div>

        <Divider />
        <div>
          <Typography.Text>By Category:</Typography.Text>
          <Radio.Group type='cards' className='mt-2'>
            <Radio value='1' label='Ideas' />
            <Radio value='2' label='Issues' />
            <Radio value='2' label='Other' />
          </Radio.Group>
        </div>

        <Divider />
        <div>
          <Typography.Text>By Reaction:</Typography.Text>
          <EmojiSelect onSelect={onEmojiSelect} />
        </div>

        <Divider />
        <div>
          <Typography.Text>By Browser:</Typography.Text>
          <Radio.Group type='cards' className='mt-2'>
            <Radio value='chrome' label='Chrome' />
            <Radio value='firefox' label='Firefox' />
            <Radio value='opera' label='Opera' />
            <Radio value='other' label='Other' />
          </Radio.Group>
        </div>
      </Modal>
    );
  };
  return (
    <ProjectLayout id={id}>
      <Typography.Text>Total Responses: 0</Typography.Text>

      <div className='mt-4'>
        <div className='flex justify-between items-center'>
          <Typography.Title level={3}>Responses</Typography.Title>
          <Button type='text' onClick={toggleFilterModal} icon={<FiFilter />}>
            Filter
          </Button>
        </div>
      </div>
      <div className='flex flex-col gap-4 mt-4'>
        {responses &&
          responses.map((response: any) => (
            <ResponseCard key={response.id} response={response}></ResponseCard>
          ))}
      </div>
      <FilterModal />
    </ProjectLayout>
  );
}

export default withPageAuthRequired(ProjectIndexPage);
