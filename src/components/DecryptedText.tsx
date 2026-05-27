import React, { useEffect, useState } from 'react';

interface DecryptedTextProps {
  text: string;
  className?: string;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

const DecryptedText: React.FC<DecryptedTextProps> = ({ text, className = '' }) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(() => 
        text.split('').map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      
      if (iteration >= text.length) clearInterval(interval);
      
      iteration += 1 / 3; // Adjust this fraction to change the decryption speed
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <div className={className}>{displayText}</div>;
};

export default DecryptedText;