'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Terminal, 
  Cpu, 
  X, 
  Check, 
  Database, 
  Copy,
  Layers,
  ArrowDown
} from 'lucide-react';
import { Project } from '@/types/project';
import { supabase } from '@/lib/supabaseClient';

// Realistic fallback projects matching the SQL seed data
const FALLBACK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Intelligent Supply Chain & Fleet Optimization Engine',
    description: 'An AI-powered forecasting and optimization system engineered to predict multi-modal transit bottlenecks and streamline fleet distribution algorithms for high-volume logistics.',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
    ],
    live_link: 'https://logistics-optimization.example.com',
    github_link: 'https://github.com/example/logistics-optimization',
    tech_stack: ['Python', 'FastAPI', 'Scikit-Learn', 'LightGBM', 'Supabase', 'PostgreSQL'],
    key_features: [
      'Real-time route bottleneck alerting via stream processor',
      'Predictive transit delay mapping using LightGBM regressor',
      'Automated fleet relocation heuristics for optimal distribution'
    ],
    star_situation: 'A massive multi-modal logistics operation faced structural delivery variances and increased operational costs due to unforeseen transit bottlenecks and inefficient vehicle positioning.',
    star_task: 'Architect a predictive model to forecast congestion points and build an optimization algorithm to relocate assets to highest-probability demand hubs.',
    star_action: 'Engineered spatial-temporal features from raw telemetry logs, trained a LightGBM regressor for time-to-destination prediction, and wrapped the pipeline in a multi-threaded FastAPI service.',
    star_result: 'Successfully reduced delivery arrival variance by 14%, optimized asset allocation efficiency, and dramatically mitigated redundant transit run-times.',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Agentic Code Review & Optimization Assistant',
    description: 'A production-ready LLM-powered development workflow agent that automatically reviews git patch sets, flags optimization vulnerabilities, and submits refactoring suggestions.',
    images: [
      'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80'
    ],
    live_link: 'https://agentic-reviewer.example.com',
    github_link: 'https://github.com/example/agentic-reviewer',
    tech_stack: ['Next.js', 'TypeScript', 'Gemini API', 'Supabase RLS', 'Vector Embeddings'],
    key_features: [
      'Context-aware patch analysis using structured LLM schemas',
      'Codebase semantic search using high-dimensional embeddings',
      'Automated security vulnerability checks on modified files'
    ],
    star_situation: 'Development speed in fast-moving engineering teams was constrained by manual, repetitive merge request reviews and static code analysis noise.',
    star_task: 'Build a contextual reviewer assistant that checks diff sets against security principles and semantic definitions in real-time.',
    star_action: 'Built an asynchronous processing pipeline utilizing the Gemini API to parse diff fragments, built a vector retrieval system over regional coding standards, and structured strict JSON schemas for precise parsing.',
    star_result: 'Accelerated continuous integration code validation cycles by 35% and captured critical edge-case structural exceptions prior to production deployment.',
    created_at: new Date().toISOString()
  }
];

// Stat metric values mapped per project ID
const DRAWER_STATS: Record<string, { label: string; value: string; desc: string }[]> = {
  '1': [
    { label: 'VARIANCE_REDUX', value: '14%', desc: 'Arrival variance decrease' },
    { label: 'GEO_FEATURES', value: '256+', desc: 'Spatial-temporal signals' },
    { label: 'DISPATCH_LATENCY', value: '0.45ms', desc: 'FastAPI routing speed' },
  ],
  '2': [
    { label: 'VALIDATION_ACCEL', value: '35%', desc: 'CI/CD pipeline speedup' },
    { label: 'VECTOR_INDEX', value: '10K', desc: 'Semantic search tokens' },
    { label: 'PARSING_STABILITY', value: '99.4%', desc: 'Structured JSON output' },
  ]
};

function ProjectCardSkeleton() {
  return (
    <div className="rounded-xl bg-zinc-900/40 border border-zinc-800/50 p-6 flex flex-col justify-between h-[390px] animate-pulse">
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-zinc-700 rounded" />
          <div className="h-5 w-20 bg-zinc-700 rounded" />
        </div>
        <div className="h-6 w-3/4 bg-zinc-700 rounded" />
        <div className="h-4 w-full bg-zinc-700/60 rounded" />
        <div className="h-4 w-5/6 bg-zinc-700/60 rounded" />
        
        {/* Mock Result box skeleton */}
        <div className="p-3.5 rounded-lg border border-zinc-700/40 bg-zinc-900/40 space-y-2 mt-4">
          <div className="h-3 w-20 bg-zinc-700 rounded animate-pulse" />
          <div className="h-4 w-full bg-zinc-700/40 rounded animate-pulse" />
        </div>
      </div>
      <div className="h-4 w-24 bg-zinc-700 rounded mt-4 animate-pulse" />
    </div>
  );
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Monitor selectedProject to apply background body scroll lock
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          setProjects(data as Project[]);
        }
      } catch (err) {
        console.warn('Could not fetch projects from Supabase. Falling back to local data.', err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      fetchProjects();
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleCopyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  // Viewport entrance motion transitions
  const sectionVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        ease: 'easeOut'
      } 
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-transparent text-zinc-100 px-4 sm:px-6 lg:px-8">
      {/* Grid Overlay background lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-45 pointer-events-none -z-20" />

      {/* Hero Section: Centered minimalist presentation layout */}
      <motion.section
        id="home"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-4xl w-full py-24 md:py-32 flex flex-col items-center justify-center text-center space-y-8"
      >
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] font-sans">
          Engineering Scalable <br />
          <span className="text-blue-500">AI & Data Systems</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed font-sans font-normal">
          Developing high-performance data transformation loops, robust relational database structures with strict security parameters, and modern model serving endpoints.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto font-sans font-semibold text-sm">
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded border border-zinc-700 bg-blue-600 hover:bg-blue-500 text-white tracking-wide transition-all duration-200 shadow-lg shadow-blue-500/10"
          >
            View Case Studies
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded border border-zinc-700 bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 hover:text-white tracking-wide transition-all duration-200"
          >
            Get In Touch
          </a>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
        className="max-w-5xl w-full border-t border-zinc-800 py-20 my-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm space-y-4 hover:border-zinc-700/50 transition-all duration-300 terminal-glow-hover">
            <div className="h-9 w-9 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Terminal className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-sans font-bold text-zinc-100 uppercase tracking-wider">System Design & Frontend</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Developing frontends using Next.js App Router, React 19, TypeScript, and Tailwind CSS. Optimizing bundle size and page layouts.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm space-y-4 hover:border-zinc-700/50 transition-all duration-300 terminal-glow-hover">
            <div className="h-9 w-9 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-sans font-bold text-zinc-100 uppercase tracking-wider">AI & Pipeline Engineering</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Configuring feature transformation batches, pipeline automation workflows, LightGBM classifiers, and LLM orchestration schemas.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm space-y-4 hover:border-zinc-700/50 transition-all duration-300 terminal-glow-hover">
            <div className="h-9 w-9 rounded bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-sans font-bold text-zinc-100 uppercase tracking-wider">Database & Storage</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Modeling relational schemas, optimizing query indices, configuring Supabase projects, and managing strict Row Level Security (RLS) layers.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
        className="max-w-5xl w-full border-t border-zinc-800 py-20 my-10 space-y-12 text-left"
      >
        <div className="space-y-3 max-w-xl">
          <span className="text-[9px] font-mono tracking-widest text-blue-400 font-bold uppercase">Case Studies</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">Featured Deployments</h2>
          <p className="text-zinc-400 text-xs leading-relaxed font-sans">
            Structured case study summaries powered by SQL database records. Select a card to inspect Situation, Task, Action, and Result outlines.
          </p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-7">
              <ProjectCardSkeleton />
            </div>
            <div className="col-span-12 md:col-span-5">
              <ProjectCardSkeleton />
            </div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left"
          >
            {projects.map((project, index) => {
              // Asymmetric grid column allocations (7/5 grid split)
              const colSpanClass = index === 0 ? 'col-span-12 md:col-span-7' : 'col-span-12 md:col-span-5';
              const classification = project.tech_stack.includes('Python') || project.tech_stack.includes('LightGBM') 
                ? 'DATA PIPELINE' 
                : 'LLM SYSTEM';

              return (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  onClick={() => setSelectedProject(project)}
                  className={`group rounded-xl bg-zinc-900/40 border border-zinc-800/50 p-6 backdrop-blur-sm transition-all cursor-pointer flex flex-col justify-between h-[390px] terminal-glow-hover ${colSpanClass}`}
                >
                  <div className="space-y-4">
                    {/* Classification metadata & tech badges */}
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-mono tracking-wider text-blue-400 font-bold uppercase">
                        {classification}
                      </span>
                      
                      <div className="flex gap-1.5">
                        {project.tech_stack.slice(0, 2).map((tech) => (
                          <span 
                            key={tech}
                            className="px-2 py-0.5 rounded border border-zinc-700 bg-geminiDark font-sans text-[8px] text-zinc-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Project Title */}
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-250 font-sans tracking-tight uppercase leading-snug">
                      {project.title}
                    </h3>
                    
                    {/* Project description snippet */}
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 font-sans font-normal">
                      {project.description}
                    </p>
                    
                    {/* Key Result metric showcased directly on card face */}
                    <div className="p-3.5 rounded-lg border border-zinc-700 bg-geminiDark/60 font-sans text-xs flex items-start gap-2.5">
                      <span className="text-blue-500 font-bold shrink-0 font-mono text-[10px] uppercase tracking-wider">Impact:</span>
                      <span className="text-zinc-300 leading-normal">{project.star_result}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-[9px] text-blue-400 font-mono uppercase tracking-wider font-semibold pt-4">
                    <span>Inspect Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </motion.section>

      {/* Right Slide-over Details Drawer using AnimatePresence */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-geminiDark/80 backdrop-blur-sm z-50 flex justify-end"
          >
            {/* Slide-over Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ ease: 'easeOut', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#131314] border-l border-zinc-800/50 shadow-2xl flex flex-col h-screen"
            >
              {/* Sticky Top File Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-geminiSidebar font-mono text-[9px] text-zinc-400">
                <span>Record Identifier: // {selectedProject.title.toUpperCase().replace(/[\s-&]+/g, '_')}.json</span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-bold text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 bg-[#131314] hover:bg-zinc-800 rounded transition-all cursor-pointer font-sans"
                  aria-label="Close details"
                >
                  <span>CLOSE</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Scrollable details wrapper */}
              <div className="flex-grow overflow-y-auto px-6 py-8 space-y-8 scrollbar-none">
                {/* Title and badges */}
                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug uppercase">
                    {selectedProject.title}
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded border border-zinc-700 bg-geminiDark font-mono text-[9px] text-indigo-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quantitative Metric Stat Grid */}
                {DRAWER_STATS[selectedProject.id] && (
                  <div className="grid grid-cols-3 gap-3 border-y border-zinc-800 py-6">
                    {DRAWER_STATS[selectedProject.id].map((stat) => (
                      <div key={stat.label} className="bg-geminiDark/50 border border-zinc-800 p-3 rounded-lg font-mono text-left">
                        <div className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider">{stat.label}</div>
                        <div className="text-xl font-black text-zinc-100 mt-1 select-all">{stat.value}</div>
                        <div className="text-[9px] text-zinc-400 mt-1 leading-tight font-sans">{stat.desc}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Overviews & Key Features */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono tracking-widest text-zinc-500 font-bold uppercase block">Project Overview</span>
                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[9px] font-mono tracking-widest text-zinc-500 font-bold uppercase block">Key Features</span>
                    <ul className="grid grid-cols-1 gap-2 text-xs text-zinc-400">
                      {selectedProject.key_features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 bg-geminiDark/60 border border-zinc-800 p-3.5 rounded-lg font-sans">
                          <span className="h-4.5 w-4.5 shrink-0 rounded bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                            <Check className="w-3 h-3" />
                          </span>
                          <span className="text-zinc-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* STAR Context Block */}
                <div className="space-y-4 border-t border-zinc-800 pt-6">
                  <span className="text-[9px] font-mono tracking-widest text-zinc-500 font-bold uppercase block">System Execution Report (S.T.A.R.)</span>
                  
                  <div className="space-y-3 text-left">
                    {/* Situation */}
                    <div className="p-4 rounded-lg bg-geminiDark/40 border border-zinc-800 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[9px] font-mono font-bold text-blue-400">S</span>
                        <h4 className="text-[10px] font-sans font-bold uppercase text-zinc-100 tracking-wider">Situation Context</h4>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                        {selectedProject.star_situation || 'N/A'}
                      </p>
                    </div>

                    {/* Task */}
                    <div className="p-4 rounded-lg bg-geminiDark/40 border border-zinc-800 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[9px] font-mono font-bold text-indigo-400">T</span>
                        <h4 className="text-[10px] font-sans font-bold uppercase text-zinc-100 tracking-wider">Task Definition</h4>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                        {selectedProject.star_task || 'N/A'}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="p-4 rounded-lg bg-geminiDark/40 border border-zinc-800 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[9px] font-mono font-bold text-blue-400">A</span>
                        <h4 className="text-[10px] font-sans font-bold uppercase text-zinc-100 tracking-wider">Action Steps Taken</h4>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                        {selectedProject.star_action || 'N/A'}
                      </p>
                    </div>

                    {/* Result */}
                    <div className="p-4 rounded-lg bg-geminiDark/40 border border-zinc-800 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[9px] font-mono font-bold text-indigo-400">R</span>
                        <h4 className="text-[10px] font-sans font-bold uppercase text-zinc-100 tracking-wider">Measurable Result</h4>
                      </div>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                        {selectedProject.star_result || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Copyable CLI Commands for Sources */}
                <div className="border border-zinc-800 bg-geminiSidebar rounded-xl p-4 font-mono text-[10px] space-y-3 text-left">
                  <span className="text-[8px] text-zinc-500 uppercase tracking-widest font-bold">// Repository Source Commands</span>
                  
                  {selectedProject.github_link && (
                    <div className="flex items-center justify-between gap-4 bg-geminiDark border border-zinc-800/50 px-3 py-2 rounded text-zinc-300">
                      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none font-mono">
                        <span className="text-zinc-500 shrink-0">$</span>
                        <span>git clone {selectedProject.github_link}.git</span>
                      </div>
                      <button
                        onClick={() => handleCopyToClipboard(`git clone ${selectedProject.github_link}.git`, 'git')}
                        className="text-[9px] text-indigo-400 hover:text-indigo-300 border border-zinc-800 hover:border-zinc-700 px-2 py-1 rounded bg-[#0b0b0b] transition-colors cursor-pointer shrink-0"
                      >
                        {copiedLink === 'git' ? 'COPIED' : <Copy className="w-2.5 h-2.5" />}
                      </button>
                    </div>
                  )}

                  {selectedProject.live_link && (
                    <div className="flex items-center justify-between gap-4 bg-geminiDark border border-zinc-800/50 px-3 py-2 rounded text-zinc-300">
                      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none font-mono">
                        <span className="text-zinc-500 shrink-0">$</span>
                        <span>curl -I {selectedProject.live_link}</span>
                      </div>
                      <a
                        href={selectedProject.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] text-emerald-400 hover:text-emerald-300 border border-zinc-800 hover:border-zinc-700 px-2.5 py-1 rounded bg-[#0b0b0b] transition-colors shrink-0 font-bold"
                      >
                        EXECUTE
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Section with Subtle Radial Gradient Backdrop */}
      <motion.section
        id="contact"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
        variants={sectionVariants}
        className="relative max-w-3xl w-full border border-zinc-800/50 py-16 my-10 text-center space-y-8 overflow-hidden rounded-xl bg-zinc-900/40 backdrop-blur-sm px-8 sm:px-12"
      >
        {/* Radial Gradient Backdrop for smooth visual separation */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <span className="text-[9px] font-mono tracking-widest text-blue-400 font-bold uppercase block">Secure Connection</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight uppercase">Let&apos;s Connect</h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Interested in data pipelines, machine learning serving architectures, or custom backend integrations? Establish contact.
          </p>
          <div className="pt-2">
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-950 bg-white hover:bg-zinc-200 rounded transition-all duration-200"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Email Contact
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

