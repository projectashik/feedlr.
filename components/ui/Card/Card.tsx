import React from 'react';
import { PropsWithChildren } from 'react';
import Typography from '../Typography';

interface Props {
  children: React.ReactNode;
  hoverable?: boolean;
  className?: any;
}

function Card({ children, hoverable, className, ...props }: Props) {
  return (
    <div
      {...props}
      className={
        ' p-4 border rounded bg-gray-50 dark:bg-gray-900 dark:border-gray-600 ' +
        className +
        (hoverable ? ' dark:hover:border-gray-500 hover:border-gray-200' : '')
      }
    >
      {children}
    </div>
  );
}
export default Card;
