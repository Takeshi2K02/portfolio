'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code2, Terminal, Cpu, X, ExternalLink, Check } from 'lucide-react';
import { Project } from '@/types/project';
import { supabase } from '@/lib/supabaseClient';

// Realistic fallback projects matching the SQL seed data
const FALLBACK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Intelligent Supply Chain & Fleet Optimization Engine',
    description: 'An AI-powered forecasting and optimization system engineered to predict multi-modal transit bottlenecks and streamline fleet distribution algorithms for high-volume logistics.',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519003722824-192d992a6020?auto=format&fit=crop&w=800&q=80'
    ],
    live_link: 'https://logistics-optimization.example.com',
    github_link: 'https://github.com/example/logistics-optimization',
    tech_stack: ['Python', 'FastAPI', 'Scikit-Learn', 'LightGBM', 'Supabase', 'PostgreSQL'],
    key_features: [
      'Real-time route bottleneck alerting',
      'Predictive transit delay mapping',
      'Automated fleet relocation recommendations'
    ],
    star_situation: 'A massive multi-modal logistics operation faced structural delivery variances and increased operational costs due to unforeseen transit bottlenecks and inefficient vehicle positioning.',
    star_task: 'Build an end-to-end predictive analytics engine to anticipate congestion periods and optimize vehicle allocation metrics across regional hubs.',
    star_action: 'Engineered robust feature sets from extensive historical GPS transit logs, trained a highly tuned LightGBM regressor to forecast delivery delays, and exposed predictions via a secure, modular FastAPI routing structure.',
    star_result: 'Successfully reduced delivery arrival variance by 14%, optimized asset allocation efficiency, and dramatically mitigated redundant transit run-times.',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Agentic Code Review & Optimization Assistant',
    description: 'A production-ready LLM-powered development workflow agent that automatically reviews git patch sets, flags optimization vulnerabilities, and submits refactoring suggestions.',
    images: [
      'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80'
    ],
    live_link: 'https://agentic-reviewer.example.com',
    github_link: 'https://github.com/example/agentic-reviewer',
    tech_stack: ['Next.js', 'TypeScript', 'Gemini API', 'Supabase RLS', 'Vector Embeddings'],
    key_features: [
      'Automated code style/security analysis',
      'Context-aware semantic patch checks',
      'Contextual embedding search over codebase structures'
    ],
    star_situation: 'Development speed in fast-moving engineering teams was constrained by manual, repetitive merge request reviews and static code analysis noise.',
    star_task: 'Architect a reliable, context-aware LLM pipeline capable of acting as an autonomous peer reviewer to flag critical logic flaws prior to main branch integration.',
    star_action: 'Built an asynchronous processing pipeline utilizing the Gemini API to parse diff fragments, built a vector retrieval system over regional coding standards, and structured strict JSON schemas for precise parsing.',
    star_result: 'Accelerated continuous integration code validation cycles by 35% and captured critical edge-case structural exceptions prior to production deployment.',
    created_at: new Date().toISOString()
  }
];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

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

    fetchProjects();
  }, []);

  // Framer Motion Variants for Grid Fade-In
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 15 
      } 
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-grid-pattern px-4 sm:px-6 lg:px-8">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-72 w-72 rounded-full bg-brand-accent/15 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-72 w-72 rounded-full bg-brand-teal/10 blur-3xl" />

      {/* Hero Section */}
      <section id="home" className="max-w-4xl w-full text-center space-y-8 py-20">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-card border border-brand-border/60 text-xs font-medium text-brand-teal">
          <span className="h-2 w-2 rounded-full bg-brand-teal animate-pulse" />
          Available for new opportunities
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-none">
          Hi, I am a <br className="sm:hidden" />
          <span className="text-gradient-indigo-teal">Full-Stack AI Engineer</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-brand-text-secondary leading-relaxed">
          I design, build, and deploy autonomous agent systems, high-performance web applications, and intelligent database architectures.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white font-medium transition-all duration-200"
          >
            Explore Projects
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-card hover:bg-brand-border/60 border border-brand-border/80 text-white font-medium transition-all duration-200"
          >
            Get In Touch
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-5xl w-full border-t border-brand-border/60 py-20 my-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-brand-card/45 border border-brand-border/40 backdrop-blur-sm space-y-4">
            <div className="h-10 w-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Frontend Architecture</h3>
            <p className="text-sm text-brand-text-secondary">
              Crafting fluid, accessible user interfaces using Next.js, React, Tailwind CSS, and Framer Motion.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-brand-card/45 border border-brand-border/40 backdrop-blur-sm space-y-4">
            <div className="h-10 w-10 rounded-xl bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-brand-teal">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">AI & Agentic Systems</h3>
            <p className="text-sm text-brand-text-secondary">
              Integrating LLM inference, embedding pipelines, retrieval systems, and autonomous worker agents.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-brand-card/45 border border-brand-border/40 backdrop-blur-sm space-y-4">
            <div className="h-10 w-10 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-white">Robust Backends</h3>
            <p className="text-sm text-brand-text-secondary">
              Designing scalable relational database structures, enabling strict Row Level Security, and structuring modular API services.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-5xl w-full border-t border-brand-border/60 py-20 my-10 text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
          <p className="text-brand-text-secondary max-w-lg mx-auto">
            A showcase of recent work pulling dynamically from Supabase database tables. Click a card to view STAR detail breakdown.
          </p>
        </div>
        
        {/* Animated Grid */}
        <motion.div 
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -6, boxShadow: "0px 20px 40px rgba(99,102,241,0.15)" }}
              onClick={() => setSelectedProject(project)}
              className="group rounded-2xl bg-brand-card/45 border border-brand-border/40 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-brand-accent/50 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video w-full relative overflow-hidden bg-brand-border/40">
                  {project.images && project.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={project.images[0]} 
                      alt={project.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-brand-text-muted text-sm font-mono">
                      [Project Image Space]
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-transparent to-transparent opacity-60" />
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.slice(0, 3).map((tech) => (
                      <span 
                        key={tech}
                        className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-card border border-brand-border text-brand-teal"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech_stack.length > 3 && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-card border border-brand-border text-brand-text-secondary">
                        +{project.tech_stack.length - 3} more
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-brand-accent transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-sm text-brand-text-secondary line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
              
              <div className="p-6 pt-0 flex justify-between items-center text-xs text-brand-accent font-medium group-hover:underline">
                View Project Details
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* STAR Detail Modal / Overlay using AnimatePresence */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-brand-card border border-brand-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-brand-bg/80 border border-brand-border text-brand-text-secondary hover:text-white hover:bg-brand-card transition-all duration-200"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable Container */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
                {/* Header Information */}
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white pr-10">
                    {selectedProject.title}
                  </h2>
                  
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-bg border border-brand-border text-brand-teal"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* External Links */}
                <div className="flex flex-wrap gap-4 border-b border-brand-border/60 pb-6">
                  {selectedProject.github_link && (
                    <a
                      href={selectedProject.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-bg border border-brand-border text-sm font-medium hover:text-white hover:border-brand-accent transition-all duration-200"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                      GitHub Repo
                      <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                    </a>
                  )}
                  {selectedProject.live_link && (
                    <a
                      href={selectedProject.live_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white text-sm font-medium transition-all duration-200"
                    >
                      Live Demo
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Main Body Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column: Description & Key Features */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-text-muted">Project Overview</h3>
                      <p className="text-brand-text-secondary text-sm sm:text-base leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-text-muted">Key Features</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-brand-text-secondary">
                        {selectedProject.key_features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 bg-brand-bg/50 border border-brand-border/40 p-3 rounded-xl">
                            <span className="h-5 w-5 shrink-0 rounded-full bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-brand-teal">
                              <Check className="w-3 h-3" />
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Hero Banner Image */}
                  <div className="hidden lg:block rounded-xl overflow-hidden border border-brand-border/60 aspect-square relative bg-brand-bg">
                    {selectedProject.images && selectedProject.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={selectedProject.images[0]}
                        alt={selectedProject.title}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-brand-text-muted text-xs font-mono">
                        [Banner Space]
                      </div>
                    )}
                  </div>
                </div>

                {/* STAR Method Section */}
                <div className="space-y-4 border-t border-brand-border/60 pt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-text-muted">STAR Method Case Study</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Situation */}
                    <div className="p-5 rounded-2xl bg-brand-bg border border-brand-border/60 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-xs font-bold text-brand-accent">S</span>
                        <h4 className="text-sm font-semibold text-white">Situation</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                        {selectedProject.star_situation || 'N/A'}
                      </p>
                    </div>

                    {/* Task */}
                    <div className="p-5 rounded-2xl bg-brand-bg border border-brand-border/60 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-xs font-bold text-brand-teal">T</span>
                        <h4 className="text-sm font-semibold text-white">Task</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                        {selectedProject.star_task || 'N/A'}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="p-5 rounded-2xl bg-brand-bg border border-brand-border/60 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-xs font-bold text-brand-accent">A</span>
                        <h4 className="text-sm font-semibold text-white">Action</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                        {selectedProject.star_action || 'N/A'}
                      </p>
                    </div>

                    {/* Result */}
                    <div className="p-5 rounded-2xl bg-brand-bg border border-brand-border/60 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-brand-teal/10 border border-brand-teal/20 flex items-center justify-center text-xs font-bold text-brand-teal">R</span>
                        <h4 className="text-sm font-semibold text-white">Result</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-brand-text-secondary leading-relaxed">
                        {selectedProject.star_result || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Section */}
      <section id="contact" className="max-w-3xl w-full border-t border-brand-border/60 py-20 my-10 text-center space-y-8">
        <h2 className="text-3xl font-bold text-white">Let&apos;s Build Something Together</h2>
        <p className="text-brand-text-secondary max-w-md mx-auto">
          Interested in collaborating or hiring me for a project? Drop a message or check out my profiles.
        </p>
        <div className="inline-flex gap-4">
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-white font-medium transition-all duration-200"
          >
            Send Email
          </a>
        </div>
      </section>
    </div>
  );
}
