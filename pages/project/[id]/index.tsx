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

function ProjectIndexPage() {
  const router = useRouter();
  const { id } = router.query;
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  function toggleFilterModal() {
    setFilterModalVisible(!filterModalVisible);
  }

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
        <Card hoverable className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <div>
              <Badge>Idea</Badge>
            </div>
            <div className='flex flex-col'>
              <Typography.Text strong className='uppercase text-sm'>
                From{' '}
                <Typography.Link
                  href='https://feedlr.co/ashik'
                  className='normal-case font-normal'
                >
                  https://feedlr.co/ashik
                </Typography.Link>
              </Typography.Text>
              <Typography.Text>This is the feedback</Typography.Text>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <div>
              <Tippy content='Device Info'>
                <button className='flex items-center gap-3'>
                  <MdComputer />
                  <Typography.Text>
                    Chrome Dev 92.0.4515.131 on Linux (desktop)
                  </Typography.Text>
                </button>
              </Tippy>
            </div>
            <div>
              <Tippy content='11 August 2017 15:00:65'>
                <button className='flex items-center gap-3'>
                  <FiClock />
                  <Typography.Text>5 sec ago</Typography.Text>
                </button>
              </Tippy>
            </div>
          </div>
        </Card>

        <Card hoverable className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <div>
              <Tippy content='Excellent'>
                <button>
                  <Image
                    src='/emojis/excellent.gif'
                    width={40}
                    height={40}
                    alt='Emoji'
                  />
                </button>
              </Tippy>
            </div>
            <div className='flex flex-col'>
              <Typography.Text strong className='uppercase text-sm'>
                From{' '}
                <Typography.Link
                  href='https://feedlr.co/ashik'
                  className='normal-case font-normal'
                >
                  https://feedlr.co/ashik
                </Typography.Link>
              </Typography.Text>
              <Typography.Text>This is the feedback</Typography.Text>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <div>
              <Tippy content='Device Info'>
                <button className='flex items-center gap-3'>
                  <MdComputer />
                  <Typography.Text>
                    Chrome Dev 92.0.4515.131 on Linux (desktop)
                  </Typography.Text>
                </button>
              </Tippy>
            </div>
            <div>
              <Tippy content='11 August 2017 15:00:65'>
                <button className='flex items-center gap-3'>
                  <FiClock />
                  <Typography.Text>5 sec ago</Typography.Text>
                </button>
              </Tippy>
            </div>
          </div>
        </Card>

        <Card hoverable className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <div>
              <Badge>Idea</Badge>
            </div>
            <div className='flex flex-col'>
              <Typography.Text strong className='uppercase text-sm'>
                From{' '}
                <Typography.Link
                  href='https://feedlr.co/ashik'
                  className='normal-case font-normal'
                >
                  https://feedlr.co/ashik
                </Typography.Link>
              </Typography.Text>
              <Typography.Text>This is the feedback</Typography.Text>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <div>
              <Tippy content='Device Info'>
                <button className='flex items-center gap-3'>
                  <MdComputer />
                  <Typography.Text>
                    Chrome Dev 92.0.4515.131 on Linux (desktop)
                  </Typography.Text>
                </button>
              </Tippy>
            </div>
            <div>
              <Tippy content='11 August 2017 15:00:65'>
                <button className='flex items-center gap-3'>
                  <FiClock />
                  <Typography.Text>5 sec ago</Typography.Text>
                </button>
              </Tippy>
            </div>
          </div>
        </Card>

        <Card hoverable className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <div>
              <Tippy content='Excellent'>
                <button>
                  <Image
                    src='/emojis/excellent.gif'
                    width={40}
                    height={40}
                    alt='Emoji'
                  />
                </button>
              </Tippy>
            </div>
            <div className='flex flex-col'>
              <Typography.Text strong className='uppercase text-sm'>
                From{' '}
                <Typography.Link
                  href='https://feedlr.co/ashik'
                  className='normal-case font-normal'
                >
                  https://feedlr.co/ashik
                </Typography.Link>
              </Typography.Text>
              <Typography.Text>This is the feedback</Typography.Text>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <div>
              <Tippy content='Device Info'>
                <button className='flex items-center gap-3'>
                  <MdComputer />
                  <Typography.Text>
                    Chrome Dev 92.0.4515.131 on Linux (desktop)
                  </Typography.Text>
                </button>
              </Tippy>
            </div>
            <div>
              <Tippy content='11 August 2017 15:00:65'>
                <button className='flex items-center gap-3'>
                  <FiClock />
                  <Typography.Text>5 sec ago</Typography.Text>
                </button>
              </Tippy>
            </div>
          </div>
        </Card>

        <Card hoverable className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <div>
              <Badge>Idea</Badge>
            </div>
            <div className='flex flex-col'>
              <Typography.Text strong className='uppercase text-sm'>
                From{' '}
                <Typography.Link
                  href='https://feedlr.co/ashik'
                  className='normal-case font-normal'
                >
                  https://feedlr.co/ashik
                </Typography.Link>
              </Typography.Text>
              <Typography.Text>This is the feedback</Typography.Text>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <div>
              <Tippy content='Device Info'>
                <button className='flex items-center gap-3'>
                  <MdComputer />
                  <Typography.Text>
                    Chrome Dev 92.0.4515.131 on Linux (desktop)
                  </Typography.Text>
                </button>
              </Tippy>
            </div>
            <div>
              <Tippy content='11 August 2017 15:00:65'>
                <button className='flex items-center gap-3'>
                  <FiClock />
                  <Typography.Text>5 sec ago</Typography.Text>
                </button>
              </Tippy>
            </div>
          </div>
        </Card>

        <Card hoverable className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <div>
              <Tippy content='Excellent'>
                <button>
                  <Image
                    src='/emojis/excellent.gif'
                    width={40}
                    height={40}
                    alt='Emoji'
                  />
                </button>
              </Tippy>
            </div>
            <div className='flex flex-col'>
              <Typography.Text strong className='uppercase text-sm'>
                From{' '}
                <Typography.Link
                  href='https://feedlr.co/ashik'
                  className='normal-case font-normal'
                >
                  https://feedlr.co/ashik
                </Typography.Link>
              </Typography.Text>
              <Typography.Text>This is the feedback</Typography.Text>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <div>
              <Tippy content='Device Info'>
                <button className='flex items-center gap-3'>
                  <MdComputer />
                  <Typography.Text>
                    Chrome Dev 92.0.4515.131 on Linux (desktop)
                  </Typography.Text>
                </button>
              </Tippy>
            </div>
            <div>
              <Tippy content='11 August 2017 15:00:65'>
                <button className='flex items-center gap-3'>
                  <FiClock />
                  <Typography.Text>5 sec ago</Typography.Text>
                </button>
              </Tippy>
            </div>
          </div>
        </Card>
      </div>
      <FilterModal />
    </ProjectLayout>
  );
}

export default withPageAuthRequired(ProjectIndexPage);
