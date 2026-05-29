import React, { lazy, Suspense, useEffect, useState, useRef } from 'react'
import './App.css'
import PillNav from './components/PillNav'
import GlassSurface from './components/GlassSurface'
import BorderGlow from './components/BorderGlow'
import profileImage from './assets/img/WhatsApp Image 2026-05-27 at 4.27.27 PM.jpeg'
import BlurText from './components/BlurText'
import DecryptedText from './components/DecryptedText'
import WithCard from './components/Edu_card'
import Gallery6Demo from './components/Projects'
import LogoLoop from './components/LogoLoop'

const Antigravity = lazy(() => import('./components/Antigravity'));
const ModelViewer = lazy(() => import('./components/ModelViewer'));

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const isScrollingRef = useRef(false);
  const scrollAccumulatorRef = useRef(0);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Apply global snap scrolling to the HTML element
  // This prevents the "locked scrollbar" issue when Shadcn Dialogs are opened!
  useEffect(() => {
    document.documentElement.classList.add('snap-y', 'snap-mandatory');
    document.documentElement.style.scrollBehavior = 'smooth'; // Guarantees all native jumps are smooth

    const isInsideScrollable = (el: EventTarget | null): boolean => {
      let target = el as HTMLElement | null;
      while (target && target !== document.body && target !== document.documentElement) {
        const style = window.getComputedStyle(target);
        if ((style.overflowY === 'auto' || style.overflowY === 'scroll') && target.scrollHeight > target.clientHeight) {
          return true;
        }
        target = target.parentElement;
      }
      return false;
    };

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (document.body.style.pointerEvents === 'none') return;
      if (isInsideScrollable(e.target)) return;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (document.body.style.pointerEvents === 'none') return;
      if (isInsideScrollable(e.target)) return;

      const touchEndY = e.changedTouches[0].clientY;
      const swipeDistance = touchStartY - touchEndY;

      if (isScrollingRef.current) return;

      // A small swipe distance (40px) triggers the page change
      if (Math.abs(swipeDistance) > 40) {
        const sections = ['hero', 'about', 'experience', 'projects', 'contact'];
        const currentSectionIndex = sections.findIndex(id => {
          const el = document.getElementById(id);
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          return rect.top > -window.innerHeight / 2 && rect.top < window.innerHeight / 2;
        });

        if (currentSectionIndex !== -1) {
          const nextIndex = swipeDistance > 0 
            ? Math.min(currentSectionIndex + 1, sections.length - 1) // Swiped up -> scroll down
            : Math.max(currentSectionIndex - 1, 0); // Swiped down -> scroll up

          if (nextIndex !== currentSectionIndex) {
            isScrollingRef.current = true;
            document.getElementById(sections[nextIndex])?.scrollIntoView({ behavior: 'smooth' });
            
            setTimeout(() => { isScrollingRef.current = false; }, 800);
          }
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // 1. Allow native pinch-to-zoom
      if (e.ctrlKey) return; 
      
      // 2. Ignore if a Shadcn Dialog is open (body pointer events get locked)
      if (document.body.style.pointerEvents === 'none') return;
      
      // 3. Allow native scroll inside scrollable child elements (like Dialog content)
      if (isInsideScrollable(e.target)) return;

      // 4. Take over the scrolling behavior!
      e.preventDefault(); 

      if (isScrollingRef.current) {
        scrollAccumulatorRef.current = 0; // Prevent queuing up multiple jumps while an animation is active
        return;
      }

      scrollAccumulatorRef.current += e.deltaY;

      // Threshold of 60 triggers on 1 classic mouse wheel tick or a deliberate trackpad swipe
      if (Math.abs(scrollAccumulatorRef.current) > 60) {
        const sections = ['hero', 'about', 'experience', 'projects', 'contact'];
        const currentSectionIndex = sections.findIndex(id => {
          const el = document.getElementById(id);
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          return rect.top > -window.innerHeight / 2 && rect.top < window.innerHeight / 2;
        });

        if (currentSectionIndex !== -1) {
          const nextIndex = scrollAccumulatorRef.current > 0 
            ? Math.min(currentSectionIndex + 1, sections.length - 1) // Scroll down
            : Math.max(currentSectionIndex - 1, 0); // Scroll up

          if (nextIndex !== currentSectionIndex) {
            isScrollingRef.current = true;
            document.getElementById(sections[nextIndex])?.scrollIntoView({ behavior: 'smooth' });
            
            setTimeout(() => { isScrollingRef.current = false; }, 800); // Unlock scrolling after animation completes
          }
        }
        scrollAccumulatorRef.current = 0;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.documentElement.classList.remove('snap-y', 'snap-mandatory');
      document.documentElement.style.scrollBehavior = '';
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Tracks which section is currently visible to update the navigation automatically
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'hero') setActiveIndex(0);
            if (entry.target.id === 'about') setActiveIndex(1);
            if (entry.target.id === 'experience') setActiveIndex(2);
            if (entry.target.id === 'projects') setActiveIndex(3);
            if (entry.target.id === 'contact') setActiveIndex(4);
          }
        });
      },
      { threshold: 0.5 } // Triggers when 50% of the section is inside the viewport
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navItems = [
    { 
      label: 'Home', 
      href: '#hero', 
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // Prevents the browser from changing the URL
        document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      label: 'About', 
      href: '#about',
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {label: 'Experience', 
      href: '#experience', onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' });
    }
  },
    { 
      label: 'Projects', 
      href: '#projects',
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    { 
      label: 'Contact', 
      href: '#contact',
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
  ];

  return (
    <main className="bg-[#000000] text-white w-full min-h-screen overflow-x-hidden max-w-[100vw]">
      
      {/* Global Background layer */}
      <div className="fixed inset-0 z-0">
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center h-full w-full bg-[#000000]">
                <div className="w-10 h-10 border-4 border-white/10 border-t-white/80 rounded-full animate-spin"></div>
                <p className="mt-4 text-xs tracking-[0.2em] text-white/50 uppercase animate-pulse">Loading Environment</p>
              </div>
            }
          >
            <Antigravity />
          </Suspense>
      </div>

      {/* Hero Section */}
      <section id="hero" className="snap-start relative z-10 min-h-screen overflow-hidden pointer-events-none">
        {/* Foreground layer (Welcome content) */}
        <div className="relative z-1 flex flex-col items-center justify-center min-h-screen pointer-events-none">
          <div className="pointer-events-auto">
            <GlassSurface width="min(90vw, 450px)" height={250} borderRadius={32} opacity={0.8} blur={isMobile ? 4 : 15}>
              <div className="flex flex-col items-center text-center p-8">
                <BlurText 
                  text="Welcome" 
                  className="text-4xl md:text-5xl font-light tracking-[0.2em] mb-4 uppercase text-white" 
                />
                <DecryptedText 
                  text="Scroll Down to Explore" 
                  className="text-sm md:text-base text-white/60 tracking-widest uppercase" 
                />
                <svg 
                  className="w-6 h-6 mt-6 animate-bounce text-white/50" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </GlassSurface>
          </div>
        </div>
      </section>
      
      {/* Navigation Layer (Fixed to screen) */}
      <PillNav items={navItems} activeIndex={activeIndex} />

      {/* About Section */}
      <section id="about" className="snap-start min-h-screen flex flex-col items-center justify-center relative z-10 pointer-events-none py-24">
        <div className="w-full max-w-[90vw] md:max-w-4xl text-white/20 text-sm tracking-[0.3em] uppercase pointer-events-auto -translate-y-12 md:-translate-y-20">
          <BorderGlow colors={["#f4f12c"]} borderRadius={24} animated={true}>
            <div className="p-6 md:p-12 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 rounded-[24px] bg-[#111114]/90 border border-white/5 w-full">
              <div className="flex flex-col gap-4 text-center md:text-left flex-1">
                <p className="text-xs text-white/50 tracking-widest leading-relaxed">
Hi, I'm Dhakshina Perera, a Full-Stack Developer and Software Engineering undergraduate based in Colombo. I specialize in building versatile solutions, from robust C# and Java desktop applications to interactive 3D web experiences using React and Three.js. Whether I am writing clean, object-oriented code or tinkering with Arduino IoT hardware, I am passionate about solving complex problems and engineering scalable software.                </p>
                <p className="text-xs text-white/50 tracking-widest leading-relaxed">
                </p>
              </div>
              <div className="flex-shrink-0">
                <img 
                  src={profileImage} 
                  alt="Dhakshina Perera" 
                  className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                />
              </div>
            </div>
          </BorderGlow>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="snap-start min-h-screen flex flex-col items-center justify-center relative z-10 pointer-events-none py-24">
        <div className="w-full max-w-[90vw] md:max-w-4xl pointer-events-auto -translate-y-12 md:-translate-y-20">
          <WithCard />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="snap-start min-h-screen flex flex-col items-center justify-center relative z-10 pointer-events-none py-24">
        <div className="w-full pointer-events-auto -translate-y-12 md:-translate-y-20">
          <Gallery6Demo />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="snap-start min-h-screen flex flex-col items-center justify-center relative z-10 pointer-events-none py-24">
        <div className="absolute top-4 md:top-8 w-full pointer-events-auto">
          <LogoLoop />
          
        </div>
        <div className="mt-16 md:mt-24 pointer-events-auto">
          <Suspense fallback={<div className="flex items-center justify-center h-64 text-white/50 tracking-widest uppercase text-sm">Loading Workspace...</div>}>
            <ModelViewer />
          </Suspense>
        </div>
      </section>

    </main>
  );
}
