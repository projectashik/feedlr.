import React from 'react';
// @ts-ignore
import InputIconContainerStyles from './InputIconContainer.module.css';

export default function InputIconContainer({ icon }: any) {
  return (
    <div className={InputIconContainerStyles['fui-input-icon-container']}>
      {icon}
    </div>
  );
}
