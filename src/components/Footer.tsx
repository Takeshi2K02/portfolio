'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full max-w-5xl border-t border-zinc-800/60 py-12 mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-zinc-500 font-sans text-xs">
      <div>
        <p>
          <Link href="/admin" className="hover:text-zinc-400 cursor-default select-none text-zinc-600 transition-colors">
            ©
          </Link>{' '}
          {new Date().getFullYear()} Takeshi Dilshan. All rights reserved.
        </p>
        <p className="text-[10px] text-zinc-600 font-mono mt-1">{"// AI Engineer Portfolio"}</p>
      </div>

      {/* Social Media Connect Channels */}
      <div className="flex items-center gap-6">
        {/* GitHub */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
          aria-label="GitHub"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
          </svg>
        </motion.a>

        {/* LinkedIn */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
          aria-label="LinkedIn"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </motion.a>

        {/* WhatsApp */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
          aria-label="WhatsApp"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.053 5.282 5.335 0 11.83 0a11.726 11.726 0 0 1 8.312 3.438A11.635 11.635 0 0 1 23.58 11.89c-.004 6.557-5.287 11.84-11.782 11.84a11.737 11.737 0 0 1-5.643-1.45L0 24zm6.49-4.272a9.774 9.774 0 0 0 5.279 1.543c5.38 0 9.75-4.34 9.753-9.674a9.585 9.585 0 0 0-2.818-6.848A9.683 9.683 0 0 0 11.83 1.944c-5.385 0-9.756 4.341-9.76 9.677a9.61 9.61 0 0 0 1.503 5.163l-.986 3.6 3.69-.96c.012-.007.012-.007.012-.007zM17.472 14.382c-.31-.156-1.843-.91-2.128-1.013-.287-.104-.496-.156-.705.157-.208.31-.806.91-.987 1.112-.182.204-.365.23-.675.075a8.508 8.508 0 0 1-2.5-1.545 9.387 9.387 0 0 1-1.732-2.15c-.183-.314-.02-.485.137-.64.14-.14.31-.363.466-.546.156-.182.208-.312.313-.52.105-.208.052-.39-.026-.547-.079-.156-.705-1.7-.965-2.327-.253-.61-.51-.527-.705-.537-.183-.01-.39-.01-.6-.01a1.147 1.147 0 0 0-.834.388c-.287.312-1.096 1.07-1.096 2.608 0 1.537 1.12 3.023 1.277 3.23.157.208 2.205 3.368 5.34 4.72.747.322 1.328.515 1.782.66.752.24 1.437.206 1.978.125.602-.09 1.843-.753 2.102-1.442.258-.69.258-1.28.182-1.404-.077-.126-.282-.204-.593-.362z"/>
          </svg>
        </motion.a>

        {/* Instagram */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
          aria-label="Instagram"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </motion.a>

        {/* Facebook */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
          aria-label="Facebook"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </motion.a>
      </div>
    </footer>
  );
}
