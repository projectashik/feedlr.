import React from 'react';
// @ts-ignore
import LinkStyles from './Link.module.css';
import Link from 'next/link';
import { UrlObject } from 'url';
declare type Url = string | UrlObject;
interface Props {
  children?: React.ReactNode;
  target?: '_blank' | '_self' | '_parent' | '_top' | 'framename';
  href: Url;
  className?: string;
  style?: React.CSSProperties;
}

function CustomLink({
  children,
  target = '_blank',
  href,
  className,
  style,
}: Props) {
  let classes = [
    LinkStyles['fui-typography'],
    LinkStyles['fui-typography-link'],
  ];
  if (className) {
    classes.push(className);
  }

  return (
    <Link href={href}>
      <a
        className={classes.join(' ')}
        target={target}
        rel='noopener noreferrer'
        style={style}
      >
        {children}
      </a>
    </Link>
  );
}

export default CustomLink;
