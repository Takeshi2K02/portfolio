'use client';

import React, { useState, useEffect } from 'react';
import { Project } from '@/types/project';
import { supabase } from '@/lib/supabaseClient';

// Modular Components
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import ProjectDetailsDrawer from '@/components/ProjectDetailsDrawer';
import Footer from '@/components/Footer';

// Realistic fallback projects matching the SQL seed data
const FALLBACK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Multi-Modal AI Tutoring System',
    description: 'A GenAI-powered tutoring system using Agentic AI and Vector Embeddings for context-aware, goal-driven learning.',
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
    ],
    live_link: null,
    github_link: 'https://github.com/Takeshi2K02/ai-tutoring-system',
    tech_stack: ['LangChain', 'Tree of Thought', 'ReAct', 'Vector Embeddings', 'LLMs', 'Python', 'OpenCV'],
    key_features: [
      'Dynamic instructional flow planning',
      'RL-based teaching optimization',
      'CV-based attention tracking modules'
    ],
    star_situation: 'Online tutoring frameworks lacked context-aware, adaptive pacing, leading to significant learning gaps and low user attention retention.',
    star_task: 'Develop a personalized, goal-driven tutoring service that dynamically steers educational content and tracks student engagement in real-time.',
    star_action: 'Engineered a cognitive agentic structure using LangChain and a custom Tree of Thought/ReAct loop, integrating an OpenCV module for visual attention monitoring.',
    star_result: 'Successfully bridged instructional gaps by tailoring content streams based on student interaction histories and physical engagement metrics.',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'AI-Powered Learning Platform',
    description: 'Full-stack platform enabling automated course generation and adaptive quiz evaluation.',
    images: [
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80'
    ],
    live_link: null,
    github_link: 'https://github.com/Takeshi2K02/ai-learning-platform',
    tech_stack: ['MERN Stack', 'Gemini API', 'Python', 'YouTube Data API', 'React.js', 'Node.js', 'MongoDB'],
    key_features: [
      'LLM-driven course syllabus generation',
      'Dynamic YouTube video recommendations',
      'Module engagement scoring pipelines'
    ],
    star_situation: 'Manually curating educational materials and designing personalized quiz evaluations is highly time-consuming for content creators and teachers.',
    star_task: 'Design an end-to-end full-stack web platform that automates high-quality course generation and dynamically tracks student progress.',
    star_action: 'Integrated the Gemini API for structured module generation, wrote Python workers to process documents, and utilized the YouTube Data API to fetch supplementary tutorials.',
    star_result: 'Delivered a responsive learning dashboard offering immediate automated course creation, module progress scores, and adaptive quizzes.',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'E-commerce Recommendation System',
    description: 'Personalized recommendation engine using collaborative, content-based, and hybrid filtering.',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80'
    ],
    live_link: null,
    github_link: 'https://github.com/Takeshi2K02/ecommerce-recommendation',
    tech_stack: ['Python', 'Flask', 'PhpMyAdmin', 'Jupyter Notebook', 'MySQL'],
    key_features: [
      'Collaborative filtering product recommendations',
      'Content-based similarity vectors',
      'Hybrid user recommendation pipeline'
    ],
    star_situation: 'Online retail storefronts struggle with low click-through rates and high basket abandonment rates due to generic, static product discovery interfaces.',
    star_task: 'Build a modular, low-latency recommendation engine that dynamically targets product listings to match historical user preferences.',
    star_action: 'Developed and optimized collaborative and content-based recommendation algorithms in Jupyter Notebook, exposing inference endpoints via a Flask API connected to PhpMyAdmin.',
    star_result: 'Generated accurate recommendation arrays that map user profiles to relevant products, boosting click-through performance.',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Accident Severity Prediction System',
    description: 'Machine learning injury risk assessment system evaluating five separate model architectures.',
    images: [
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=800&q=80'
    ],
    live_link: null,
    github_link: 'https://github.com/Takeshi2K02/accident-severity-prediction',
    tech_stack: ['Python', 'Flask', 'JavaScript', 'Jupyter Notebook', 'Scikit-Learn'],
    key_features: [
      'Injury risk assessment scores',
      '5 model architecture comparisons',
      'Environmental telemetry evaluation'
    ],
    star_situation: 'Transit authorities lacked granular data models to analyze structural road hazards and anticipate severity indicators in motor vehicle accidents.',
    star_task: 'Construct a machine learning pipeline to estimate injury risks by evaluating weather, spatial-temporal features, and road conditions.',
    star_action: 'Trained and compared five distinct classification architectures using Scikit-Learn, wrapping the top-performing estimator in a Flask service with an interactive UI.',
    star_result: 'Achieved high prediction precision, providing planners with an analytical system to model traffic hazards and dispatch response resources.',
    created_at: new Date().toISOString()
  }
];

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

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-transparent text-zinc-100 px-4 sm:px-6 lg:px-8">
      {/* Grid Overlay background lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-45 pointer-events-none -z-20" />

      <HeroSection />

      <AboutSection />

      <ProjectsSection 
        projects={projects}
        loading={loading}
        setSelectedProject={setSelectedProject}
      />

      <ContactSection />

      <ProjectDetailsDrawer 
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        copiedLink={copiedLink}
        handleCopyToClipboard={handleCopyToClipboard}
      />

      <Footer />
    </div>
  );
}
