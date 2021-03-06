import { useState } from 'react';
import Image from 'next/image';
import { Emoji } from './Emoji';

function EmojiSelect({ selectedEmoji, setSelectedEmoji }: any) {
  const emojis = ['disappointed', 'hate', 'natural', 'good', 'excellent'];
  return (
    <div className='flex justify-between mt-4'>
      {emojis.map((emoji) => {
        return (
          <Emoji
            onClick={() => {
              setSelectedEmoji(emoji);
            }}
            key={emoji}
            selected={selectedEmoji === emoji}
            emoji={emoji}
          />
        );
      })}
    </div>
  );
}

export default EmojiSelect;
