import Image from 'next/image';
import { useState } from 'react';
export const Emoji = ({ emoji, selected, ...props }: any) => {
  return (
    <button
      {...props}
      key={emoji}
      className={
        'hover:opacity-100 ' +
        (selected
          ? 'opacity-100 transform scale-150 transition-transform'
          : 'opacity-50 trasnform scale-100 transition-transform')
      }
    >
      <Image
        src={'/emojis/' + emoji + '.gif'}
        height={40}
        width={40}
        alt={emoji}
      />
    </button>
  );
};
