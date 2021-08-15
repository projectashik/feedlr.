import { useEffect } from 'react';

export const Widget = () => {
  useEffect(() => {});
  return (
    <div className='fixed right-3 bottom-3'>
      <iframe
        id='widget'
        className='drop-shadow rounded'
        height='441px'
        src='http://localhost:3001'
      />
    </div>
  );
};
