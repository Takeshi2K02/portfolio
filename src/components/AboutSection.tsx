'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import jkhLogo from '@/assets/jkh_trp_logo.jpeg';
import orelLogo from '@/assets/orel_group_logo.jpeg';

interface TimelineItem {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  logo: StaticImageData;
}

const EXPERIENCE_TIMELINE: TimelineItem[] = [
  {
    role: "Research And Development Intern",
    company: "John Keells Group Transportation Sector",
    period: "Dec 2025 - Present",
    bullets: [
      "Researched and implemented a computer vision pipeline using OpenCV and Tesseract 5 to extract structured data from Proof of Delivery (POD) documents for John Keells Logistics.",
      "Developed a fully functional prototype using React and Python to validate complex business requirements for Lanka Marine Services (LMS), creating a direct stakeholder feedback loop."
    ],
    logo: jkhLogo
  },
  {
    role: "Data Scientist Intern",
    company: "OREL Group",
    period: "Jan 2025 - Nov 2025",
    bullets: [
      "Built and deployed a time series forecasting model to predict sales trends from historical data, supporting strategic inventory planning.",
      "Designed and optimized SQL-based data pipelines to transform multi-source datasets (SAP, LN, Zoho) into analysis-ready formats.",
      "Developed interactive dashboards with dynamic filters and executive visualizations (Targets vs Achievements) for data-driven storytelling."
    ],
    logo: orelLogo
  }
];

const SKILL_STYLE_MAP: Record<string, string> = {
  // AI ARCHITECTURE & AGENTS
  "LLMs (Gemini / OpenAI)": "text-indigo-400 border-indigo-900/50 bg-indigo-950/20 hover:border-indigo-400/30",
  "Agentic AI (LangChain / Tree of Thought)": "text-indigo-400 border-indigo-900/50 bg-indigo-950/20 hover:border-indigo-400/30",
  "RAG Pipelines (ChromaDB)": "text-indigo-400 border-indigo-900/50 bg-indigo-950/20 hover:border-indigo-400/30",
  "Prompt Engineering": "text-indigo-400 border-indigo-900/50 bg-indigo-950/20 hover:border-indigo-400/30",
  // COMPUTER VISION & INTELLIGENCE
  "OpenCV": "text-blue-400 border-blue-900/50 bg-blue-950/20 hover:border-blue-400/30",
  "Tesseract 5": "text-zinc-300 border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700/50",
  "Image Processing": "text-blue-400 border-blue-900/50 bg-blue-950/20 hover:border-blue-400/30",
  // DATA & CLOUD PLATFORMS
  "SQL": "text-zinc-300 border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700/50",
  "MongoDB": "text-emerald-400 border-emerald-900/50 bg-emerald-950/20 hover:border-emerald-400/30",
  "AWS": "text-amber-500 border-amber-950/50 bg-amber-950/20 hover:border-amber-500/30",
  "Azure": "text-cyan-400 border-cyan-900/50 bg-cyan-950/20 hover:border-cyan-400/30",
  // FULL-STACK ARCHITECTURE
  "Python (FastAPI / Flask)": "text-blue-400 border-blue-900/50 bg-blue-950/20 hover:border-blue-400/30",
  "Node.js": "text-emerald-400 border-emerald-900/50 bg-emerald-950/20 hover:border-emerald-400/30",
  "React.js": "text-cyan-400 border-cyan-900/50 bg-cyan-950/20 hover:border-cyan-400/30",
  "JavaScript (ES6+)": "text-zinc-300 border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700/50",
  "API Integration": "text-zinc-300 border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700/50"
};

interface SkillCategory {
  category: string;
  skills: string[];
}

const SKILL_MATRIX: SkillCategory[] = [
  {
    category: "AI ARCHITECTURE & AGENTS",
    skills: ["LLMs (Gemini / OpenAI)", "Agentic AI (LangChain / Tree of Thought)", "RAG Pipelines (ChromaDB)", "Prompt Engineering"]
  },
  {
    category: "COMPUTER VISION & INTELLIGENCE",
    skills: ["OpenCV", "Tesseract 5", "Image Processing"]
  },
  {
    category: "DATA & CLOUD PLATFORMS",
    skills: ["SQL", "MongoDB", "AWS", "Azure"]
  },
  {
    category: "FULL-STACK ARCHITECTURE",
    skills: ["Python (FastAPI / Flask)", "Node.js", "React.js", "JavaScript (ES6+)", "API Integration"]
  }
];

export default function AboutSection() {
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

  const timelineContainerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05
      }
    }
  };

  const timelineItemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 18
      }
    }
  };

  const badgeContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const badgeItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 5 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14
      }
    }
  };

  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={sectionRevealVariants}
      className="max-w-5xl w-full border-t border-zinc-800 py-20 my-10 space-y-20"
    >
      {/* Title block + Animated greeting intro */}
      <div className="space-y-6 max-w-3xl text-left">
        {/* Section eyebrow */}
        <span className="text-[9px] font-mono tracking-widest text-blue-400 font-bold uppercase">
          Background
        </span>

        {/* Animated greeting + narrative */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-4"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-50 tracking-tight">
            Hi, I&apos;m <span className="text-blue-400">Takeshi Dilshan</span>
          </h2>

          <p className="text-base md:text-lg text-zinc-300 leading-relaxed font-sans">
            I am an AI Engineer with a strong foundation in Full-Stack Development and Generative AI.
            Currently driving R&amp;D initiatives within the Transportation Sector at John Keells Group,
            I focus on Computer Vision modeling, solution prototyping, and building robust data frameworks.
            I am highly experienced in engineering autonomous Agentic AI workflows, context-aware LLM pipelines,
            and scalable relational database architectures, with a core professional passion for leveraging
            data to solve complex, high-impact industry problems.
          </p>
        </motion.div>
      </div>

      {/* Skill Matrix Section */}
      <div className="space-y-8 text-left">
        <div className="space-y-3">
          <span className="text-[9px] font-mono tracking-widest text-blue-400 font-bold uppercase block">
            Skill Matrix
          </span>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Structured system architectures and core competencies categorized by functional domain.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {SKILL_MATRIX.map((cat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-zinc-800/40 bg-zinc-900/10 hover:border-zinc-850 hover:bg-zinc-900/20 transition-all duration-300 flex flex-col h-full justify-between space-y-4"
            >
              <div className="space-y-4 flex flex-col flex-grow">
                <h4 className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">{cat.category}</h4>
                <motion.div 
                  variants={badgeContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className="flex flex-wrap gap-1.5 flex-grow content-start"
                >
                  {cat.skills.map((skill, skIdx) => (
                    <motion.span
                      key={skIdx}
                      variants={badgeItemVariants}
                      className={`px-3 py-1.5 rounded-md border font-sans text-[10px] transition-colors duration-250 cursor-default ${
                        SKILL_STYLE_MAP[skill] || "text-zinc-300 border-zinc-800/80 bg-zinc-900/40"
                      }`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Journey (Alternating Tree Timeline) */}
      <div className="space-y-12 text-left">
        <div className="space-y-3">
          <span className="text-[9px] font-mono tracking-widest text-blue-400 font-bold uppercase block">
            Professional Journey
          </span>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Chronological record of research and development engagements in enterprise logistics and industrial automation.
          </p>
        </div>

        {/* Timeline wrapper */}
        <div className="relative w-full">
          {/* Centered Vertical Line on Desktop, Left-Aligned on Mobile */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-zinc-800/60 -translate-x-1/2" />

          {/* Timeline Items Container */}
          <motion.div
            variants={timelineContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-10 relative"
          >
            {EXPERIENCE_TIMELINE.map((item, idx) => {
              const isRightSide = idx % 2 === 1; // index 0 (JKH) is left, index 1 (Orel) is right
              return (
                <motion.div
                  key={idx}
                  variants={timelineItemVariants}
                  className={`relative flex flex-col md:flex-row w-full ${isRightSide ? 'md:justify-end' : 'md:justify-start'}`}
                >
                  {/* Pulsing indicator centered on the line */}
                  <span className="absolute left-4 md:left-1/2 top-2.5 h-3.5 w-3.5 rounded-full border border-blue-500/80 bg-[#0e0e10] flex items-center justify-center -translate-x-1/2 z-10">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-ping" />
                  </span>

                  {/* Card Container */}
                  <div className={`w-[calc(100%-2rem)] ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${isRightSide ? 'md:pl-8 text-left' : 'md:pr-8 text-left'}`}>
                    <div className="p-6 rounded-xl border border-zinc-800/40 bg-zinc-900/10 backdrop-blur-sm space-y-5 hover:border-blue-500/20 transition-all duration-300">

                      {/* Logo + Header Details block */}
                      <div className="flex gap-4 items-start text-left">
                        {/* LinkedIn-style logo */}
                        <div className="w-12 h-12 relative rounded-md overflow-hidden shrink-0">
                          <Image
                            src={item.logo}
                            alt={item.company}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>

                        {/* Job Details */}
                        <div className="space-y-0.5 text-left">
                          <span className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase block">{item.period}</span>
                          <h4 className="text-sm font-bold text-white font-sans leading-tight mt-0.5">{item.role}</h4>
                          <span className="text-[10px] font-mono text-blue-400 font-semibold block uppercase">{item.company}</span>
                        </div>
                      </div>

                      {/* Bullet points: always left-aligned */}
                      <ul className="space-y-2 text-xs text-zinc-400 font-sans leading-relaxed text-left">
                        {item.bullets.map((bullet, bulletIdx) => (
                          <li key={bulletIdx} className="flex items-start gap-2.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-zinc-700 mt-1.5 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
