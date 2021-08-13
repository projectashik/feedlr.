import React from 'react';
import ButtonStyles from './Button.module.css';

import { FiLoader } from 'react-icons/fi';
import { IconContext } from '../Icon/IconContext';
import Tippy from '@tippyjs/react';
interface Props {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: any;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
  style?: React.CSSProperties;
  block?: boolean;
  type?: 'primary' | 'default' | 'outline' | 'link' | 'text';
  disabled?: boolean;
  danger?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  tooltip?: any;
}

export default function Button({
  children,
  htmlType,
  block,
  danger,
  loading,
  disabled,
  className,
  type = 'default',
  icon,
  iconRight,
  tooltip,
  ...props
}: Props) {
  let classes = [ButtonStyles['fui-btn']];
  let iconLoaderClasses = [ButtonStyles['fui-btn--anim--spin']];

  classes.push(ButtonStyles[`fui-btn-${type}`]);

  if (block) {
    classes.push(ButtonStyles['fui-btn--w-full']);
  }

  if (className) {
    classes.push(className);
  }

  if (danger) {
    classes.push(ButtonStyles['fui-btn--danger']);
  }

  const ButtonComponent = () => {
    return (
      <button
        {...props}
        className={classes.join(' ')}
        disabled={loading || (disabled && true)}
        type={htmlType}
      >
        {loading ? (
          <FiLoader className={iconLoaderClasses.join(' ')} />
        ) : icon ? (
          <IconContext.Provider value={{ contextSize: '' }}>
            {icon}
          </IconContext.Provider>
        ) : null}
        {children ? <span>{children}</span> : null}
        {iconRight && (
          <IconContext.Provider value={{ contextSize: '' }}>
            {iconRight}
          </IconContext.Provider>
        )}
      </button>
    );
  };

  return (
    <>
      {tooltip ? (
        <Tippy content={tooltip} placement='bottom'>
          <span>
            <ButtonComponent />
          </span>
        </Tippy>
      ) : (
        <ButtonComponent />
      )}
    </>
  );
}
