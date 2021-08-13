import React from 'react';
// @ts-ignore
import SpaceStyles from './Space.module.css';

interface Props {
  direction: 'horizontal' | 'vertical';
  size: number;
  className: any;
  block: boolean;
  style: CSSStyleRule;
  minus: boolean;
  children: React.ReactNode;
}

function Space({
  direction,
  size = 2,
  className,
  block,
  style,
  minus,
  children,
}: any) {
  const classes = [];
  classes.push(direction === 'vertical' ? 'fui-space-col' : 'fui-space-row');
  classes.push(
    SpaceStyles[
      'fui-' +
        (minus ? 'minus-' : '') +
        'space-' +
        (direction === 'vertical' ? 'y' : 'x') +
        '-' +
        size
    ]
  );
  if (block) {
    classes.push(SpaceStyles['fui-space--block']);
  }
  if (className) {
    classes.push(className);
  }

  return (
    <div className={classes.join(' ')} style={style}>
      {children}
    </div>
  );
}

export default Space;
