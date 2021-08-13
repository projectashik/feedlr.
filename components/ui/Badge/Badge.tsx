import React from 'react';
// @ts-ignore
import BadgeStyles from './Badge.module.css';

interface Props {
  color?:
    | 'gray'
    | 'red'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'indigo'
    | 'purple'
    | 'pink';
  children: string;
  size?: 'large' | 'small';
  dot?: boolean;
}

function Badge({ color, children, size, dot }: Props) {
  let classes = [BadgeStyles['fui-badge']];
  if (color) {
    classes.push(BadgeStyles[`fui-badge--${color}`]);
  }
  if (size === 'large') {
    classes.push(BadgeStyles['fui-badge--large']);
  }

  return (
    <span className={classes.join(' ')}>
      {dot && (
        <svg
          className={`${BadgeStyles[`fui-badge-dot`]} ${
            BadgeStyles[`fui-badge--${color}`]
          }`}
          fill='currentColor'
          viewBox='0 0 8 8'
        >
          <circle cx='4' cy='4' r='3' />
        </svg>
      )}

      {children}
    </span>
  );
}
export default Badge;
