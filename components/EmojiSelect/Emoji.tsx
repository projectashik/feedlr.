import Image from 'next/image';
import { useState } from 'react';
export const Emoji = ({ emoji, selected, ...props }: any) => {
  const [isHovered, setHovered] = useState(false);
  return (
    <button
      {...props}
      key={emoji}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {!isHovered && !selected && (
        <Image
          src={'/emojis/' + emoji + '_inactive.png'}
          height={40}
          width={40}
          alt={emoji}
        />
      )}
      {isHovered && (
        <Image
          src={'/emojis/' + emoji + '.gif'}
          height={40}
          width={40}
          alt={emoji}
        />
      )}
      {selected && !isHovered && (
        <Image
          src={'/emojis/' + emoji + '_active.png'}
          height={40}
          width={40}
          alt={emoji}
        />
      )}
    </button>
  );
};
