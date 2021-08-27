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

function ProjectIndexPage() {
  const router = useRouter();
  const { id } = router.query;
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  function toggleFilterModal() {
    setFilterModalVisible(!filterModalVisible);
  }

  let { data: responses, error: projectsError } = useSWR(
    `/api/responses/getAll?projectId=${id}`,
    fetcher
  );

  let filteredResponses = responses;

  const FilterModal = () => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [emoji, setEmoji] = useState('');
    const [browser, setBrowser] = useState('');
    const [device, setDevice] = useState('');
    const [os, setOs] = useState('');

    const onEmojiSelect = (emoji: any) => {
      setEmoji(emoji);
    };

    const filterResponses = () => {
      console.log({ fromDate, toDate, emoji, browser, device, os });
      filteredResponses = filteredResponses.filter((response: Response) => {
        if (fromDate && toDate) {
          const createdDate = new Date(response.createdAt);
          const fromDateNew = new Date(fromDate);
          const toDateNew = new Date(toDate);
          console.log({ createdDate, fromDateNew, toDateNew });

          if (createdDate > fromDateNew && createdDate < toDateNew) {
            return true;
          }
        }
        if (emoji) {
          return response.emoji === emoji;
        }
        // return response;
      });
      console.log('From MOdal', responses);
      toggleFilterModal();
      console.log('From MOdal 2', responses);
    };

    return (
      <Modal
        closable
        title='Filter Responses'
        visible={filterModalVisible}
        onCancel={toggleFilterModal}
        onConfirm={filterResponses}
      >
        <div>
          <Typography.Text>By Date:</Typography.Text>
          <div className='flex  flex-col md:flex-row gap-2 mt-3'>
            <Input
              onChange={(e) => setFromDate(e.target.value)}
              type='date'
              className='flex-1'
              label='From'
            />
            <Input
              onChange={(e) => setToDate(e.target.value)}
              type='date'
              className='flex-1'
              label='To'
            />
          </div>
        </div>

        <Divider />
        <div>
          <Typography.Text>By Reaction:</Typography.Text>
          <EmojiSelect onSelect={onEmojiSelect} />
        </div>

        <Divider />
        <div>
          <Typography.Text>By Browser:</Typography.Text>
          <Radio.Group
            type='cards'
            onChange={(e) => setBrowser(e.target.value)}
            className='mt-2'
          >
            <Radio value='all' name='browser' label='All' />
            <Radio value='chrome' name='browser' label='Chrome' />
            <Radio value='firefox' name='browser' label='Firefox' />
            <Radio value='opera' name='browser' label='Opera' />
            <Radio value='other' name='browser' label='Other' />
          </Radio.Group>
        </div>

        <Divider />
        <div>
          <Typography.Text>By Device:</Typography.Text>
          <Radio.Group
            type='cards'
            onChange={(e) => {
              setDevice(e.target.value);
            }}
            className='mt-2'
          >
            <Radio value='all' name='device' label='All' />
            <Radio value='Mobile' name='device' label='Mobile' />
            <Radio value='Desktop' name='device' label='Desktop' />
          </Radio.Group>
        </div>

        <Divider />
        <div>
          <Typography.Text>By OS:</Typography.Text>
          <Radio.Group
            type='cards'
            onChange={(e) => {
              setOs(e.target.value);
            }}
            className='mt-2'
          >
            <Radio value='all' name='all' label='All' />
            <Radio value='Linux' name='os' label='Linux' />
            <Radio value='Windows' name='os' label='Windows' />
            <Radio value='Mac OS' name='os' label='Mac' />
            <Radio value='Android' name='os' label='Android' />
            <Radio value='iOS' name='ios' label='ios' />
          </Radio.Group>
        </div>
      </Modal>
    );
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
      <div className='flex flex-col gap-4 mt-4'>
        {filteredResponses &&
          filteredResponses.map((response: any) => (
            <ResponseCard key={response.id} response={response}></ResponseCard>
          ))}
      </div>
      <FilterModal />
    </ProjectLayout>
  );
}

export default withPageAuthRequired(ProjectIndexPage);
