import React, { useEffect, useState } from 'react';

interface BlurTextProps {
  text: string;
  className?: string;
}

const BlurText: React.FC<BlurTextProps> = ({ text, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Start the animation shortly after the component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`${className} transition-all duration-1000 ease-out`}
      style={{ 
        filter: isLoaded ? 'blur(0px)' : 'blur(10px)',
        opacity: isLoaded ? 1 : 0 
      }}
    >
      {text}
    </div>
  );
};

export default BlurText;