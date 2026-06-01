'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

export default function ContactSection() {
  const sectionRevealVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const cardsContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const cardItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const contactLinks = [
    {
      name: 'LinkedIn',
      value: 'takeshi-dilshan',
      desc: 'Professional network & career updates',
      href: 'https://linkedin.com/in/takeshi-dilshan-a54981249/',
      icon: (
        <svg className="w-8 h-8 text-zinc-400 group-hover:text-blue-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      color: 'hover:border-blue-500/30 hover:shadow-blue-500/5 hover:bg-blue-500/[0.02]',
    },
    {
      name: 'GitHub',
      value: 'Takeshi2K02',
      desc: 'Open-source repositories & research',
      href: 'https://github.com/Takeshi2K02',
      icon: (
        <svg className="w-8 h-8 text-zinc-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"/>
        </svg>
      ),
      color: 'hover:border-zinc-400/30 hover:shadow-zinc-400/5 hover:bg-zinc-400/[0.02]',
    },
    {
      name: 'Email',
      value: 'takeshidilshan10@gmail.com',
      desc: 'Direct inbox for inquires & projects',
      href: 'mailto:takeshidilshan10@gmail.com',
      icon: (
        <svg className="w-8 h-8 text-zinc-400 group-hover:text-red-400 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      color: 'hover:border-red-500/30 hover:shadow-red-500/5 hover:bg-red-500/[0.02]',
    },
    {
      name: 'WhatsApp',
      value: 'Let\'s Chat',
      desc: 'Instant messaging & quick discussion',
      href: 'https://wa.me/#',
      icon: (
        <svg className="w-8 h-8 text-zinc-400 group-hover:text-green-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.053 5.282 5.335 0 11.83 0a11.726 11.726 0 0 1 8.312 3.438A11.635 11.635 0 0 1 23.58 11.89c-.004 6.557-5.287 11.84-11.782 11.84a11.737 11.737 0 0 1-5.643-1.45L0 24zm6.49-4.272a9.774 9.774 0 0 0 5.279 1.543c5.38 0 9.75-4.34 9.753-9.674a9.585 9.585 0 0 0-2.818-6.848A9.683 9.683 0 0 0 11.83 1.944c-5.385 0-9.756 4.341-9.76 9.677a9.61 9.61 0 0 0 1.503 5.163l-.986 3.6 3.69-.96c.012-.007.012-.007.012-.007zM17.472 14.382c-.31-.156-1.843-.91-2.128-1.013-.287-.104-.496-.156-.705.157-.208.31-.806.91-.987 1.112-.182.204-.365.23-.675.075a8.508 8.508 0 0 1-2.5-1.545 9.387 9.387 0 0 1-1.732-2.15c-.183-.314-.02-.485.137-.64.14-.14.31-.363.466-.546.156-.182.208-.312.313-.52.105-.208.052-.39-.026-.547-.079-.156-.705-1.7-.965-2.327-.253-.61-.51-.527-.705-.537-.183-.01-.39-.01-.6-.01a1.147 1.147 0 0 0-.834.388c-.287.312-1.096 1.07-1.096 2.608 0 1.537 1.12 3.023 1.277 3.23.157.208 2.205 3.368 5.34 4.72.747.322 1.328.515 1.782.66.752.24 1.437.206 1.978.125.602-.09 1.843-.753 2.102-1.442.258-.69.258-1.28.182-1.404-.077-.126-.282-.204-.593-.362z"/>
        </svg>
      ),
      color: 'hover:border-green-500/30 hover:shadow-green-500/5 hover:bg-green-500/[0.02]',
    }
  ];

  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionRevealVariants}
      className="max-w-5xl w-full border-t border-zinc-800 py-24 md:py-36 my-10 flex flex-col items-center justify-center text-center space-y-12"
    >
      <div className="space-y-4 max-w-3xl">
        <span className="text-[9px] font-mono tracking-widest text-blue-400 font-bold uppercase">
          Get In Touch
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight font-sans">
          Let&apos;s Connect
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Whether you want to discuss AI integrations, system design, or have any other queries, feel free to reach out through any of these platforms.
        </p>
      </div>

      <motion.div
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            }
          }
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-4"
      >
        {contactLinks.map((link) => (
          <motion.a
            key={link.name}
            href={link.href}
            target={link.name !== 'Email' ? "_blank" : undefined}
            rel={link.name !== 'Email' ? "noopener noreferrer" : undefined}
            variants={cardItemVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            className={`group flex flex-col items-center justify-center p-8 rounded-2xl border border-zinc-800/40 bg-zinc-900/10 backdrop-blur-sm transition-all duration-300 shadow-md ${link.color}`}
          >
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/85 mb-4 transition-transform duration-300 group-hover:scale-110">
              {link.icon}
            </div>
            <h3 className="text-sm font-bold text-white font-sans">{link.name}</h3>
            <span className="text-[10px] font-mono text-blue-400 mt-1 mb-2 select-all">{link.value}</span>
            <p className="text-[11px] text-zinc-500 leading-normal max-w-[160px]">{link.desc}</p>
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
}
