import React from 'react';
import { ArrowRight, Code2, Terminal, Cpu } from 'lucide-react';

export default function Home() {
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

      {/* About Section Placeholder */}
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

      {/* Projects Section Placeholder */}
      <section id="projects" className="max-w-5xl w-full border-t border-brand-border/60 py-20 my-10 text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
          <p className="text-brand-text-secondary max-w-lg mx-auto">
            A showcase of recent work pulling dynamically from Supabase database tables.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Project card 1 placeholder */}
          <div className="group rounded-2xl bg-brand-card/45 border border-brand-border/40 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-brand-accent/50 hover:shadow-lg hover:shadow-brand-accent/5">
            <div className="aspect-video w-full bg-brand-border/40 relative">
              <div className="absolute inset-0 flex items-center justify-center text-brand-text-muted text-sm font-mono">
                [Project Image Space]
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-accent/10 text-brand-accent border border-brand-accent/20">Next.js</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-teal/10 text-brand-teal border border-brand-teal/20">Supabase</span>
              </div>
              <h3 className="text-xl font-semibold text-white group-hover:text-brand-accent transition-colors duration-200">Autonomous Code Review Agent</h3>
              <p className="text-sm text-brand-text-secondary line-clamp-2">
                An AI-driven developer tool that automatically reviews git pull requests, checks for lint/security issues, and comments with recommended code edits directly.
              </p>
            </div>
          </div>

          {/* Project card 2 placeholder */}
          <div className="group rounded-2xl bg-brand-card/45 border border-brand-border/40 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:border-brand-teal/50 hover:shadow-lg hover:shadow-brand-teal/5">
            <div className="aspect-video w-full bg-brand-border/40 relative">
              <div className="absolute inset-0 flex items-center justify-center text-brand-text-muted text-sm font-mono">
                [Project Image Space]
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-accent/10 text-brand-accent border border-brand-accent/20">React</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-teal/10 text-brand-teal border border-brand-teal/20">WebSockets</span>
              </div>
              <h3 className="text-xl font-semibold text-white group-hover:text-brand-teal transition-colors duration-200">Real-time Collaborative Whiteboard</h3>
              <p className="text-sm text-brand-text-secondary line-clamp-2">
                A high-performance interactive whiteboarding tool that enables teams to draw, add sticky notes, and collaborate in real-time with zero-latency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section Placeholder */}
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
