'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-4xl w-full mx-auto py-28 md:py-40 flex flex-col items-center justify-center text-center space-y-8"
    >

      {/* Main headline */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] font-sans">
        Engineering Scalable{' '}
        <span className="text-blue-500">AI &amp; Data Systems.</span>
      </h1>

      {/* Sub-headline */}
      <p className="text-base md:text-lg lg:text-xl font-medium tracking-wide text-zinc-400 max-w-2xl text-center mx-auto mb-8">
        Designing robust automation, agentic workflows, and production-grade data pipelines.
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 font-sans font-semibold text-sm w-full sm:w-auto">
        <a
          href="#projects"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded border border-zinc-700 bg-blue-600 hover:bg-blue-500 text-white tracking-wide transition-all duration-200 shadow-lg shadow-blue-500/10"
        >
          View Projects
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
        <a
          href="#contact"
          className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded border border-zinc-700 bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 hover:text-white tracking-wide transition-all duration-200"
        >
          Get In Touch
        </a>
      </div>

      {/* Social links */}
      <div className="flex items-center justify-center gap-7 pt-2 text-zinc-400 font-mono text-xs">
        <a
          href="https://github.com/Takeshi2K02"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
          </svg>
          <span>GitHub</span>
        </a>
        <a
          href="https://linkedin.com/in/takeshi-dilshan-a54981249/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          <span>LinkedIn</span>
        </a>
        <a
          href="mailto:takeshidilshan10@gmail.com"
          className="hover:text-blue-400 transition-colors flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span>Email</span>
        </a>
      </div>
    </motion.section>
  );
}
