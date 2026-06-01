'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Lock, 
  Plus, 
  Check, 
  LogOut, 
  Terminal,
  Loader2,
  Upload
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPortal() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Auth Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Project Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [liveLink, setLiveLink] = useState('');
  const [techStack, setTechStack] = useState('');
  const [keyFeatures, setKeyFeatures] = useState('');
  
  // STAR Fields
  const [situation, setSituation] = useState('');
  const [task, setTask] = useState('');
  const [action, setAction] = useState('');
  const [result, setResult] = useState('');

  const [formLoading, setFormLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Auth Monitoring
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Authentication failed. Please verify credentials.';
      setAuthError(errorMsg);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    setFormError(null);
    
    try {
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `project-covers/${fileName}`;

      // Upload file to 'portfolio' storage bucket
      const { error: uploadError } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'File upload failed. Ensure the storage bucket "portfolio" exists.';
      setFormError(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      setFormError('Authentication required to submit projects.');
      return;
    }

    setFormLoading(true);
    setFormSuccess(false);
    setFormError(null);

    const techArray = techStack
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    
    const featuresArray = keyFeatures
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const imagesArray = imageUrl.trim() ? [imageUrl.trim()] : [];

    const projectData = {
      title: title.trim(),
      description: description.trim(),
      images: imagesArray,
      github_link: githubLink.trim() || null,
      live_link: liveLink.trim() || null,
      tech_stack: techArray,
      key_features: featuresArray,
      star_situation: situation.trim() || null,
      star_task: task.trim() || null,
      star_action: action.trim() || null,
      star_result: result.trim() || null
    };

    try {
      const { error } = await supabase.from('projects').insert([projectData]);
      if (error) throw error;

      setFormSuccess(true);
      
      // Clear Form Fields
      setTitle('');
      setDescription('');
      setImageUrl('');
      setGithubLink('');
      setLiveLink('');
      setTechStack('');
      setKeyFeatures('');
      setSituation('');
      setTask('');
      setAction('');
      setResult('');

      setTimeout(() => setFormSuccess(false), 5000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Database transaction failed.';
      setFormError(errorMsg);
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e0e10] flex items-center justify-center text-zinc-400 font-mono text-xs">
        <Loader2 className="w-4 h-4 animate-spin text-blue-500 mr-2" />
        <span>Initializing auth session state...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e10] text-zinc-100 px-4 py-12 relative flex flex-col justify-center items-center">
      {/* Grid Overlay background lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-45 pointer-events-none -z-20" />
      
      {/* Subtle surrounding glow / shadow background layer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Floating Header */}
      <div className="absolute top-8 left-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Site</span>
        </Link>
      </div>

      <AnimatePresence mode="wait">
        {!session ? (
          /* LOGIN PANEL */
          <motion.div
            key="login-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md p-8 rounded-xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md space-y-6 shadow-2xl"
          >
            <div className="space-y-2 text-center">
              <div className="mx-auto h-10 w-10 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Lock className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold uppercase tracking-wider font-sans mt-3">Admin Authority Access</h1>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Authenticate using database user credentials to authorize project modifications.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 font-sans">
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">Database Admin Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded border border-zinc-800 bg-zinc-900/50 focus:border-blue-500 text-xs text-zinc-200 outline-none transition-colors"
                  placeholder="admin@example.com"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">Secure Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded border border-zinc-800 bg-zinc-900/50 focus:border-blue-500 text-xs text-zinc-200 outline-none transition-colors"
                  placeholder="••••••••••••"
                />
              </div>

              {authError && (
                <div className="p-3.5 rounded border border-red-500/20 bg-red-500/5 text-xs text-red-400 leading-relaxed text-left font-sans">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 rounded bg-blue-600 hover:bg-blue-500 text-white font-mono text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {authLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>Verifying Session...</span>
                  </>
                ) : (
                  <span>Authenticate Access</span>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          /* PROJECT CREATION FORM */
          <motion.div
            key="dashboard-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl p-8 rounded-xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md space-y-6 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Terminal className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <h1 className="text-base font-bold uppercase tracking-wider">Project Deployer Console</h1>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block">{"// Auth Profile: "}{session?.user?.email}</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-zinc-800 hover:border-zinc-700 bg-zinc-900/40 text-[9px] font-mono tracking-wider font-semibold uppercase text-zinc-400 hover:text-white transition-colors"
              >
                <span>Sign Out</span>
                <LogOut className="w-3 h-3" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-6 font-sans text-left">
              {/* Grid 1: Basic info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">Project Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded border border-zinc-800 bg-zinc-900/50 focus:border-blue-500 text-xs text-zinc-200 outline-none transition-all"
                    placeholder="e.g. Intelligent System Pipeline"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">Image Asset URL</label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded border border-zinc-800 bg-zinc-900/50 focus:border-blue-500 text-xs text-zinc-200 outline-none transition-all"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>
              </div>

              {/* Upload and File Picker Row */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">Or Upload Graphic Asset</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-4 py-2.5 rounded border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-850 text-xs text-zinc-300 hover:text-white cursor-pointer transition-colors outline-none">
                    {uploading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                    ) : (
                      <Upload className="w-3.5 h-3.5" />
                    )}
                    <span>{uploading ? 'Uploading File...' : 'Choose File Asset'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[10px] font-mono text-zinc-500 truncate max-w-xs sm:max-w-md">
                    {imageUrl ? `Selected: ${imageUrl}` : '// No file chosen'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">Detailed Description</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded border border-zinc-800 bg-zinc-900/50 focus:border-blue-500 text-xs text-zinc-200 outline-none transition-all resize-none"
                  placeholder="Summarize the core functionality and scope of the build..."
                />
              </div>

              {/* Links & Tech Stack */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">GitHub Repository Link</label>
                  <input
                    type="text"
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                    className="w-full px-4 py-2.5 rounded border border-zinc-800 bg-zinc-900/50 focus:border-blue-500 text-xs text-zinc-200 outline-none transition-all"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">Live Project Link</label>
                  <input
                    type="text"
                    value={liveLink}
                    onChange={(e) => setLiveLink(e.target.value)}
                    className="w-full px-4 py-2.5 rounded border border-zinc-800 bg-zinc-900/50 focus:border-blue-500 text-xs text-zinc-200 outline-none transition-all"
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">Tech Stack (comma-separated)</label>
                  <input
                    type="text"
                    required
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                    className="w-full px-4 py-2.5 rounded border border-zinc-800 bg-zinc-900/50 focus:border-blue-500 text-xs text-zinc-200 outline-none transition-all"
                    placeholder="Python, Flask, React"
                  />
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase">Key Features (comma-separated)</label>
                <input
                  type="text"
                  required
                  value={keyFeatures}
                  onChange={(e) => setKeyFeatures(e.target.value)}
                  className="w-full px-4 py-2.5 rounded border border-zinc-800 bg-zinc-900/50 focus:border-blue-500 text-xs text-zinc-200 outline-none transition-all"
                  placeholder="Automated data parsing pipeline, Real-time execution monitor"
                />
              </div>

              {/* STAR Layout */}
              <div className="border-t border-zinc-800/60 pt-5 space-y-4">
                <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase block">{"// STAR Context System Parameters"}</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase flex items-center gap-1.5">
                      <span className="h-4.5 w-4.5 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[9px] font-bold text-blue-400">S</span>
                      <span>Situation Context</span>
                    </label>
                    <textarea
                      rows={2}
                      value={situation}
                      onChange={(e) => setSituation(e.target.value)}
                      className="w-full px-4 py-2.5 rounded border border-zinc-800 bg-zinc-900/50 focus:border-blue-500 text-xs text-zinc-200 outline-none transition-all resize-none"
                      placeholder="Outline the initial business case or bottleneck..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase flex items-center gap-1.5">
                      <span className="h-4.5 w-4.5 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[9px] font-bold text-indigo-400">T</span>
                      <span>Task Definition</span>
                    </label>
                    <textarea
                      rows={2}
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                      className="w-full px-4 py-2.5 rounded border border-zinc-800 bg-zinc-900/50 focus:border-blue-500 text-xs text-zinc-200 outline-none transition-all resize-none"
                      placeholder="Describe the structural objective..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase flex items-center gap-1.5">
                      <span className="h-4.5 w-4.5 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[9px] font-bold text-blue-400">A</span>
                      <span>Action Steps Taken</span>
                    </label>
                    <textarea
                      rows={2}
                      value={action}
                      onChange={(e) => setAction(e.target.value)}
                      className="w-full px-4 py-2.5 rounded border border-zinc-800 bg-zinc-900/50 focus:border-blue-500 text-xs text-zinc-200 outline-none transition-all resize-none"
                      placeholder="Detail the implementation workflows and code steps..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase flex items-center gap-1.5">
                      <span className="h-4.5 w-4.5 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[9px] font-bold text-indigo-400">R</span>
                      <span>Measurable Result</span>
                    </label>
                    <textarea
                      rows={2}
                      value={result}
                      onChange={(e) => setResult(e.target.value)}
                      className="w-full px-4 py-2.5 rounded border border-zinc-800 bg-zinc-900/50 focus:border-blue-500 text-xs text-zinc-200 outline-none transition-all resize-none"
                      placeholder="State the quantitative metrics and outcome values..."
                    />
                  </div>
                </div>
              </div>

              {/* Feedbacks */}
              {formError && (
                <div className="p-3.5 rounded border border-red-500/20 bg-red-500/5 text-xs text-red-400 leading-relaxed font-sans">
                  {formError}
                </div>
              )}

              {formSuccess && (
                <div className="p-3.5 rounded border border-emerald-500/20 bg-emerald-500/5 text-xs text-emerald-400 leading-relaxed flex items-center gap-2 font-sans">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Success: Project details successfully inserted into Supabase database record arrays.</span>
                </div>
              )}

              {/* Submit Buttons */}
              <button
                type="submit"
                disabled={formLoading}
                className="w-full py-3.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-mono text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {formLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                ) : (
                  <Plus className="w-3.5 h-3.5 text-white" />
                )}
                <span>{formLoading ? 'Executing Data Insert...' : 'Create Project Record'}</span>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
