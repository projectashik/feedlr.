import { useState } from 'react';
import { Modal, Radio, Typography, Input, Divider } from 'components/ui';
import { EmojiSelect } from 'components';
import { Response } from '@prisma/client';
import { useEffect } from 'react';
import { useUserAgent } from 'next-useragent';
export const FilterResponseModal = ({
  filterModalVisible,
  toggleFilterModal,
  responses,
  onFilter,
}: any) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [emoji, setEmoji] = useState('');
  const [browser, setBrowser] = useState('');
  const [currentUa, setCurrentUa] = useState('');
  const [currentUserAgent, setCurrentUserAgent] = useState('');
  const [device, setDevice] = useState('');
  const [os, setOs] = useState('');
  useEffect(() => {
    setEmoji('');
  }, []);

  const onConfirm = () => {
    console.log({ fromDate, toDate });
    const browserOptions = ['chrome', 'opera', 'firefox', 'safari'];
    const deviceOptions = ['mobile', 'tablet', 'desktop'];
    let filteredResponses = responses.filter((response: Response) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const ua = useUserAgent(response.ua);
      let isBrowserTrue = true;
      let isDeviceTrue = true;
      let isDateTrue = true;
      let isEmojiTrue = true;
      let isOSTrue = true;
      const responseDevice = ua.isDesktop
        ? 'desktop'
        : ua.isMobile
        ? 'mobile'
        : ua.isTablet
        ? 'tablet'
        : 'desktop';
      console.log(ua.os.toLowerCase());
      if (fromDate && toDate) {
        const createdDate = new Date(response.createdAt);
        const fromDateNew = new Date(fromDate);
        const toDateNew = new Date(toDate);

        if (createdDate >= fromDateNew && createdDate <= toDateNew) {
          isDateTrue = true;
        } else {
          isDateTrue = false;
        }
      }
      if (emoji) {
        isEmojiTrue = response.emoji === emoji;
      }
      if (browser) {
        if (browser === 'all') {
          isBrowserTrue = true;
        } else if (browserOptions.includes(browser)) {
          isBrowserTrue = ua.browser.toLowerCase() === browser;
        } else if (browser === 'other') {
          if (browserOptions.includes(ua.browser.toLowerCase())) {
            isBrowserTrue = false;
          } else {
            isBrowserTrue = true;
          }
        } else {
          isBrowserTrue = false;
        }
      }
      if (device) {
        if (device === 'all') {
          isDeviceTrue = true;
        } else if (deviceOptions.includes(device)) {
          isDeviceTrue = responseDevice === device;
        } else {
          isDeviceTrue = false;
        }
      }
      if (os) {
        if (os === 'all') {
          isOSTrue = true;
        } else {
          isOSTrue = os === ua.os.toLowerCase().replaceAll(' ', '');
        }
      }
      return (
        isDateTrue && isEmojiTrue && isBrowserTrue && isDeviceTrue && isOSTrue
      );
    });
    onFilter(filteredResponses);
    toggleFilterModal();
  };

  return (
    <Modal
      closable
      title='Filter Responses'
      visible={filterModalVisible}
      onCancel={toggleFilterModal}
      onConfirm={onConfirm}
    >
      <div>
        <Typography.Text>By Date:</Typography.Text>
        <div className='flex  flex-col md:flex-row gap-2 mt-3'>
          <Input
            onChange={(e) => setFromDate(e.target.value)}
            type='date'
            className='flex-1'
            label='From'
            value={fromDate}
          />
          <Input
            onChange={(e) => setToDate(e.target.value)}
            type='date'
            className='flex-1'
            label='To'
            value={toDate}
          />
        </div>
      </div>

      <Divider />
      <div>
        <Typography.Text>By Reaction:</Typography.Text>
        <EmojiSelect selectedEmoji={emoji} setSelectedEmoji={setEmoji} />
      </div>

      <Divider />
      <div>
        <Typography.Text>By Browser:</Typography.Text>
        <Radio.Group
          type='cards'
          onChange={(e) => setBrowser(e.target.value)}
          className='mt-2'
          value={browser}
        >
          <Radio value='all' name='browser' label='All' />
          <Radio value='chrome' name='browser' label='Chrome' />
          <Radio value='firefox' name='browser' label='Firefox' />
          <Radio value='opera' name='browser' label='Opera' />
          <Radio value='safari' name='browser' label='Safari' />
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
          value={device}
        >
          <Radio value='all' name='device' label='All' />
          <Radio value='mobile' name='device' label='Mobile' />
          <Radio value='desktop' name='device' label='Desktop' />
          <Radio value='tablet' name='device' label='Tablet' />
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
          value={os}
        >
          <Radio value='all' name='os' label='All' />
          <Radio value='linux' name='os' label='Linux' />
          <Radio value='windows' name='os' label='Windows' />
          <Radio value='macos' name='os' label='MacOS' />
          <Radio value='android' name='os' label='Android' />
          <Radio value='ios' name='os' label='iOS' />
        </Radio.Group>
      </div>
    </Modal>
  );
};
