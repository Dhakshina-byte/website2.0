import React, { lazy, Suspense, useEffect, useState } from 'react'
import './App.css'
import GooeyNav from './components/GooeyNav'
import GlassSurface from './components/GlassSurface'
import BorderGlow from './components/BorderGlow'
import profileImage from './assets/img/WhatsApp Image 2026-05-27 at 4.27.27 PM.jpeg'
import BlurText from './components/BlurText'
import DecryptedText from './components/DecryptedText'
import WithCard from './components/Edu_card'

const Antigravity = lazy(() => import('./components/Antigravity'));

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);

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
    <main className="bg-[#000000] text-white w-full h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory max-w-[100vw]">
      
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
            <GlassSurface width="min(90vw, 450px)" height={250} borderRadius={32} opacity={0.8} blur={15}>
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
      <GooeyNav items={navItems} activeIndex={activeIndex} />

      {/* About Section */}
      <section id="about" className="snap-start min-h-screen flex flex-col items-center justify-center relative z-10 pointer-events-none py-24">
        <div className="w-full max-w-[90vw] md:max-w-4xl text-white/20 text-sm tracking-[0.3em] uppercase pointer-events-auto">
          <BorderGlow colors={["#f4f12c"]} borderRadius={24}>
            <div className="p-6 md:p-12 flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12 rounded-[24px] bg-black/40 backdrop-blur-sm border border-white/5 w-full">
              <div className="flex flex-col gap-4 text-center md:text-left flex-1">
                <p className="text-xs text-white/50 tracking-widest leading-relaxed">
                  Hi, I'm Dhakshina Perera. I am a Software Engineering undergraduate and Full-Stack Developer who loves bridging the gap between complex backend logic and engaging user experiences. I am driven by a passion to build software that is highly functional, scalable, and structurally sound.
                </p>
                <p className="text-xs text-white/50 tracking-widest leading-relaxed">
                  My technical playground is diverse—ranging from architecting robust desktop applications in C# and Java, like comprehensive point-of-sale and vehicle management systems, to building interactive 3D web experiences using React and Three.js. Whether I am writing clean object-oriented code, stepping outside the browser to tinker with Arduino for IoT projects, or engaging with the tech community as a Student Ambassador, I am always looking for the next technical challenge.
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
        <div className="text-white/20 text-sm tracking-[0.3em] uppercase pointer-events-auto">
          Projects Section
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="snap-start min-h-screen flex flex-col items-center justify-center relative z-10 pointer-events-none py-24">
        <div className="text-white/20 text-sm tracking-[0.3em] uppercase pointer-events-auto">
          Contact Section
        </div>
      </section>

    </main>
  );
}
