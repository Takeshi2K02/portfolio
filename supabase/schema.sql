-- Enable the uuid-ossp extension for UUID generation if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    images TEXT[] NOT NULL DEFAULT '{}',
    live_link TEXT,
    github_link TEXT,
    tech_stack TEXT[] NOT NULL DEFAULT '{}',
    key_features TEXT[] NOT NULL DEFAULT '{}',
    star_situation TEXT,
    star_task TEXT,
    star_action TEXT,
    star_result TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on projects table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 1. Policy: Allow Public Read Access (SELECT)
CREATE POLICY "Allow public read access" ON projects
    FOR SELECT
    USING (true);

-- 2. Policy: Restrict Write Access (INSERT/UPDATE/DELETE) to authenticated users (admin)
CREATE POLICY "Allow authenticated insert" ON projects
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON projects
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Allow authenticated delete" ON projects
    FOR DELETE
    TO authenticated
    USING (true);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_name TEXT NOT NULL,       -- e.g., 'AI ARCHITECTURE & AGENTS'
    skill_name TEXT NOT NULL,          -- e.g., 'LLMs (Gemini / OpenAI)'
    brand_color_theme TEXT NOT NULL,   -- e.g., 'indigo', 'blue', 'emerald', 'amber', 'cyan'
    display_order INT NOT NULL,        -- For sorting columns/items smoothly
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Create public read policy
CREATE POLICY "Allow public read access to skills" 
ON skills FOR SELECT USING (true);
