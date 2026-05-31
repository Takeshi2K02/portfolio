'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll to update active state & background opacity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active link tracker based on section position
      const sections = navItems.map(item => {
        const el = document.getElementById(item.href.replace('#', ''));
        if (el) {
          const rect = el.getBoundingClientRect();
          return {
            name: item.name,
            top: rect.top + window.scrollY - 100, // offset for navbar
            bottom: rect.bottom + window.scrollY - 100,
          };
        }
        return null;
      }).filter(Boolean);

      const scrollPos = window.scrollY;
      const current = sections.find(
        section => section && scrollPos >= section.top && scrollPos < section.bottom
      );

      if (current) {
        setActiveSection(current.name);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-brand-bg/85 border-b border-brand-border/80 py-3 backdrop-blur-md' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0">
            <a 
              href="#home" 
              onClick={() => setActiveSection('Home')}
              className="text-lg font-bold tracking-tight text-white flex items-center gap-2 group"
            >
              <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse"></span>
              <span className="group-hover:text-brand-accent transition-colors duration-200">
                Dev<span className="text-brand-teal">.Portfolio</span>
              </span>
            </a>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex space-x-1 items-center bg-brand-card/40 border border-brand-border/40 px-2 py-1.5 rounded-full backdrop-blur-sm">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveSection(item.name)}
                className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 ${
                  activeSection === item.name 
                    ? 'text-white' 
                    : 'text-brand-text-secondary hover:text-white'
                }`}
              >
                {activeSection === item.name && (
                  <motion.span
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-brand-border/80 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.name}
              </a>
            ))}
          </nav>

          {/* Social Links & Action Button (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-text-secondary hover:text-white transition-colors duration-200"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-text-secondary hover:text-white transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="#contact"
              onClick={() => setActiveSection('Contact')}
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-brand-bg bg-brand-accent hover:bg-brand-accent-hover rounded-full shadow transition-all duration-200"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-text-secondary hover:text-white hover:bg-brand-card/60 border border-transparent hover:border-brand-border/60 transition-all duration-200"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden border-b border-brand-border/60 bg-brand-bg/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setActiveSection(item.name);
                    setIsOpen(false);
                  }}
                  className={`block px-3 py-3 rounded-lg text-base font-medium transition-all duration-150 ${
                    activeSection === item.name
                      ? 'bg-brand-card text-brand-accent border-l-2 border-brand-accent'
                      : 'text-brand-text-secondary hover:text-white hover:bg-brand-card/40'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              
              <div className="pt-4 border-t border-brand-border/40 flex items-center justify-between px-3">
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-text-secondary hover:text-white transition-colors duration-200"
                    aria-label="GitHub"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-text-secondary hover:text-white transition-colors duration-200"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
                
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-brand-bg bg-brand-accent hover:bg-brand-accent-hover rounded-full transition-all duration-200"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
