import React from 'react';
// @ts-ignore
import { FiAlertCircle } from 'react-icons/fi';
// @ts-ignore
import InputErrorIconStyles from './InputErrorIcon.module.css';

interface Props {
  style?: React.CSSProperties;
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
}

export default function InputErrorIcon({ style, size }: Props) {
  return (
    <div className={InputErrorIconStyles['fui-input-error-icon']} style={style}>
      <FiAlertCircle strokeWidth={2} stroke={'#f56565'} className='' />
    </div>
  );
}
