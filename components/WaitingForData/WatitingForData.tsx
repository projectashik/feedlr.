import { Card, Typography, Input } from 'components/ui';
export const WaitingForData = () => {
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
          value='&lt;script async
          src="https://feedlr.so/init.js"&gt;&lt;/script&gt;'
        />
      </Card>
    </div>
  );
};
