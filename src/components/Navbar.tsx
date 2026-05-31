'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('Home');
  const [scrolled, setScrolled] = useState(false);

  // Mathematical Scroll-Spy tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 20);

      // 1. Force Home active if near the top
      if (scrollPosition < 80) {
        setActiveSection('Home');
        return;
      }

      // 2. Force Contact active if at the absolute bottom
      const threshold = 60; // px tolerance from bottom
      const isBottom = window.innerHeight + scrollPosition >= document.documentElement.scrollHeight - threshold;
      if (isBottom) {
        setActiveSection('Contact');
        return;
      }

      // 3. Check offsets of sections
      const sections = ['home', 'about', 'projects', 'contact'];
      const sectionOffsets = sections.map((id) => {
        const el = document.getElementById(id);
        if (el) {
          return {
            id,
            top: el.offsetTop - 140, // offset adjustment for floating dock height & padding
            bottom: el.offsetTop + el.offsetHeight - 140,
          };
        }
        return null;
      }).filter(Boolean) as { id: string; top: number; bottom: number }[];

      for (const sec of sectionOffsets) {
        if (scrollPosition >= sec.top && scrollPosition < sec.bottom) {
          const matched = navItems.find((item) => item.href === `#${sec.id}`);
          if (matched) {
            setActiveSection(matched.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Run once on load
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
    e.preventDefault();
    setActiveSection(name);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const topOffset = (targetElement as HTMLElement).offsetTop - 100;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300">
      <div
        className={`flex items-center justify-center border rounded-full transition-all duration-550 px-10 py-4 shadow-2xl backdrop-blur-md ${
          scrolled
            ? 'bg-geminiSidebar/90 border-zinc-800/60'
            : 'bg-geminiDark/50 border-zinc-800/30'
        }`}
      >
        {/* Expanded Navigation Items */}
        <nav className="flex items-center gap-3">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href, item.name)}
              className={`relative px-6 py-2.5 text-[13px] font-mono font-bold uppercase tracking-widest rounded-full transition-colors duration-250 ${
                activeSection === item.name
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {activeSection === item.name && (
                <motion.span
                  layoutId="activeNavBackground"
                  className="absolute inset-0 bg-[#1c1c1f]/80 border border-zinc-700/30 rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 385, damping: 30 }}
                />
              )}
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}



