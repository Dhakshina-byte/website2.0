

const techLogos = [
  { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Tailwind CSS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'C#', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: 'Java', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Azure', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
  { name: 'AWS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
];

const LogoLoop = () => {
  return (
    <div className="w-full overflow-hidden flex flex-col items-center justify-center pointer-events-auto">
      {/* Inline styles for the animation to keep it self-contained */}
      <style>
        {`
          @keyframes loopMarquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-loop-marquee {
            animation: loopMarquee 30s linear infinite;
          }
          .animate-loop-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Label and Bouncing Arrow */}
      <div className="text-white/40 text-[10px] sm:text-xs tracking-[0.2em] uppercase mb-4 flex flex-col items-center">
        <span className="text-white">Things I know</span>
        <svg 
          className="w-4 h-4 mt-2 animate-bounce" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      <div 
        className="relative w-full max-w-5xl mx-auto flex overflow-hidden group"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        <div className="flex animate-loop-marquee whitespace-nowrap min-w-max">
          {/* Duplicated array for seamless infinite looping */}
          {[...techLogos, ...techLogos].map((logo, index) => (
            <div key={index} className="flex items-center justify-center w-24 sm:w-32 mx-4 sm:mx-8">
              <img src={logo.url} alt={logo.name} className="max-w-full h-10 sm:h-12 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoLoop;