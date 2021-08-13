import { useState } from 'react';
import Image from 'next/image';
import { Emoji } from './Emoji';

function EmojiSelect({ onSelect }: any) {
  const emojis = ['disappointed', 'hate', 'natural', 'good', 'excellent'];
  const [selectedEmoji, setSelectedEmoji] = useState('');
  return (
    <div>
      {emojis.map((emoji) => {
        return (
          <Emoji
            onClick={() => {
              setSelectedEmoji(emoji);
              onSelect(emoji);
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
