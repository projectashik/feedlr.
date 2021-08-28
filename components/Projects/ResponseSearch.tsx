import { Input, Button } from 'components/ui';
import { FiSearch } from 'react-icons/fi';

export const ResponseSearch = ({ responses, onSearch }: any) => {
  return (
    <>
      <div className='grid grid-cols-1 md:gap-10 md:grid-cols-2 mt-4'>
        <Input
          placeholder='Search By Feedback'
          actions={[
            <Button key={Math.random()}>
              <FiSearch />
            </Button>,
          ]}
          className='mb-10 md:mb-0'
        />
        <Input
          placeholder='Search By URL'
          actions={[
            <Button key={Math.random()}>
              <FiSearch />
            </Button>,
          ]}
          className='mb-10 md:mb-0'
        />
      </div>
    </>
  );
};
