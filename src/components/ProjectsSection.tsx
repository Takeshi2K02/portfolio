'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/types/project';

interface ProjectsSectionProps {
  projects: Project[];
  loading: boolean;
  setSelectedProject: (project: Project) => void;
}

function ProjectCardSkeleton() {
  return (
    <div className="rounded-xl bg-zinc-900/40 border border-zinc-800/50 flex flex-col justify-between h-[520px] overflow-hidden animate-pulse">
      {/* Top Image Slot Skeleton */}
      <div className="h-48 w-full bg-zinc-800/60" />
      
      {/* Content Skeleton */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="h-3 w-16 bg-zinc-850 rounded" />
            <div className="flex gap-1">
              <div className="h-5 w-12 bg-zinc-850 rounded" />
              <div className="h-5 w-12 bg-zinc-850 rounded" />
            </div>
          </div>
          <div className="h-6 w-3/4 bg-zinc-800 rounded mt-2" />
          <div className="h-4 w-full bg-zinc-800/60 rounded" />
          <div className="h-4 w-5/6 bg-zinc-800/60 rounded" />
          
          <div className="p-3.5 rounded-lg border border-zinc-800 bg-zinc-900/40 space-y-2 mt-2">
            <div className="h-3.5 w-full bg-zinc-800 rounded animate-pulse" />
          </div>
        </div>
        
        <div className="h-4 w-24 bg-zinc-800 rounded mt-4" />
      </div>
    </div>
  );
}

export default function ProjectsSection({ projects, loading, setSelectedProject }: ProjectsSectionProps) {
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

  const gridContainerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05
      }
    }
  };

  const cardMotionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
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

  return (
    <motion.section
      id="projects"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={sectionRevealVariants}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      ) : (
        <motion.div 
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
        >
          {projects.map((project) => {
            const classification = project.tech_stack.includes('Python') || project.tech_stack.includes('LightGBM') 
              ? 'DATA PIPELINE' 
              : 'LLM SYSTEM';
            const projectImage = project.images && project.images.length > 0 ? project.images[0] : null;

            return (
              <motion.div
                key={project.id}
                variants={cardMotionVariants}
                onClick={() => setSelectedProject(project)}
                whileHover={{
                  y: -6,
                  scale: 1.015,
                  rotateX: 2,
                  rotateY: -2,
                  boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 30px rgba(59, 130, 246, 0.08)",
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                style={{ perspective: 1000, transformStyle: "preserve-3d" }}
                className="group rounded-xl bg-zinc-900/40 border border-zinc-800/50 hover:border-blue-500/35 flex flex-col justify-between h-[520px] overflow-hidden backdrop-blur-sm cursor-pointer transition-colors duration-300"
              >
                {/* Top Image slot or placeholder */}
                <div className="h-48 w-full relative overflow-hidden bg-zinc-950 border-b border-zinc-800/50">
                  {projectImage ? (
                    <Image
                      src={projectImage}
                      alt={project.title}
                      fill
                      sizes="(max-w-768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                      <span className="text-[10px] font-mono tracking-wider text-zinc-500">{"// NO_ASSET_FOUND"}</span>
                    </div>
                  )}
                </div>

                {/* Inner Card Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Classification metadata & tech badges */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-wider text-blue-400 font-bold uppercase">
                        {classification}
                      </span>
                      
                      <div className="flex gap-1.5">
                        {project.tech_stack.slice(0, 2).map((tech) => (
                          <span 
                            key={tech}
                            className="px-2 py-0.5 rounded border border-zinc-700 bg-geminiDark font-sans text-[10px] text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Project Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-250 font-sans tracking-tight uppercase leading-snug">
                      {project.title}
                    </h3>
                    
                    {/* Project description snippet */}
                    <p className="text-sm text-zinc-300 leading-relaxed line-clamp-3 font-sans font-normal">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4">
                    {/* Key Result metric showcased directly on card face */}
                    <div className="p-3.5 rounded-lg border border-zinc-800 bg-geminiDark/60 font-sans text-sm flex items-start gap-2.5">
                      <span className="text-blue-500 font-bold shrink-0 font-mono text-xs uppercase tracking-wider">Impact:</span>
                      <span className="text-zinc-200 leading-normal line-clamp-2">{project.star_result}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-[11px] text-blue-400 font-mono uppercase tracking-wider font-semibold">
                      <span>Inspect Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.section>
  );
}
