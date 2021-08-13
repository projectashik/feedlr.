import Image from 'next/image';

interface Props {
  src: any;
  width?: any;
  height?: any;
  altText?: string;
}

export const Avatar = ({
  src = '',
  width = 40,
  height = 40,
  altText = 'Avatar',
  ...props
}: Props) => {
  return (
    <Image
      className='rounded-full'
      src={src ? src : '/no-avatar.png'}
      width={width}
      height={height}
      alt={altText}
      {...props}
    />
  );
};
