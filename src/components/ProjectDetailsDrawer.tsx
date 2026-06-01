'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Copy } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectDetailsDrawerProps {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  copiedLink: string | null;
  handleCopyToClipboard: (text: string, id: string) => void;
}

// Stat metric values mapped per project ID
const DRAWER_STATS: Record<string, { label: string; value: string; desc: string }[]> = {
  '1': [
    { label: 'FORECASTING_ACC', value: '94.2%', desc: 'Curriculum alignment score' },
    { label: 'AGENT_STEPS', value: '12 steps', desc: 'Max depth ReAct process' },
    { label: 'INFERENCE_LATENCY', value: '180ms', desc: 'Average model runtime' },
  ],
  '2': [
    { label: 'AUTO_SYLLABI', value: '100%', desc: 'Generative course coverage' },
    { label: 'QUIZ_LATENCY', value: '0.2s', desc: 'Evaluation delay threshold' },
    { label: 'API_THROUGHPUT', value: '1.2K/m', desc: 'Sustained Gemini requests' },
  ],
  '3': [
    { label: 'RECOMMEND_PREC', value: '88.7%', desc: 'Precision top-k target mapping' },
    { label: 'RESPONSE_TIME', value: '24ms', desc: 'Flask microservice serving' },
    { label: 'VECTOR_DIM', value: '128-D', desc: 'Feature similarity space' },
  ],
  '4': [
    { label: 'PREDICT_ACC', value: '91.3%', desc: 'Accuracy severity classification' },
    { label: 'ARCHITECTURES', value: '5 models', desc: 'Tuned regressors evaluated' },
    { label: 'PIPELINE_RUN', value: '12ms', desc: 'Telemetry processing speed' },
  ]
};

export default function ProjectDetailsDrawer({ 
  selectedProject, 
  setSelectedProject, 
  copiedLink, 
  handleCopyToClipboard 
}: ProjectDetailsDrawerProps) {
  return (
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 bg-geminiDark/85 backdrop-blur-sm z-50 flex justify-end"
        >
          {/* Slide-over Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ ease: 'easeOut', duration: 0.4 }}
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
              <div className="space-y-4 text-left">
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
              <div className="space-y-6 text-left">
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
              <div className="space-y-4 border-t border-zinc-800 pt-6 text-left">
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
                <span className="text-[8px] text-zinc-500 uppercase tracking-widest font-bold">{"// Repository Source Commands"}</span>
                
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
  );
}
