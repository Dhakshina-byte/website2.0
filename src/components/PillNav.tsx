import React from 'react';

interface NavItem {
  label: string;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export interface PillNavProps {
  items: NavItem[];
  activeIndex?: number;
}

const PillNav: React.FC<PillNavProps> = ({ items, activeIndex = 0 }) => {
  return (
    <div className="fixed bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <nav className="flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 bg-[#120F17]/80 backdrop-blur-md border border-white/10 rounded-full shadow-2xl">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <a
              key={index}
              href={item.href}
              onClick={item.onClick}
              className={`relative px-3 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-300 rounded-full whitespace-nowrap ${
                isActive 
                  ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default PillNav;