import { Card, Typography, Input } from 'components/ui';
import { useState } from 'react';
import { useEffect } from 'react';

export const WaitingForData = ({ project }: any) => {
  const [loaded, setLoaded] = useState(false);
  const [exHtml, setExHtml] = useState('');

  useEffect(() => {
    setLoaded(true);
    fetch('https://' + project?.url)
      .then((res) => res.text())
      .then((html) => setExHtml(html))
      .catch((error) => {
        console.error(error);
      });

    console.log(setExHtml);
  }, [project]);
  if (!loaded) return <>Loading...</>;
  return (
    <div className='waiting-for-verification'>
      <Card className='mt-2'>
        <p>
          <Typography.Text strong>Waiting for Data</Typography.Text>
        </p>
        <Typography.Text>
          Add the following script to your head tag. Then, visit your website.
          You may need to refresh this page once done.
        </Typography.Text>
        <Input
          disabled
          className='mt-3 '
          inputClass='py-3 dark:bg-gray-800'
          copy
          value={`<script src="${window.location.origin}/init.js"></script>`}
        />
      </Card>
    </div>
  );
};
