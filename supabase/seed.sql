-- Seed data for projects table
INSERT INTO projects (
    title,
    description,
    images,
    live_link,
    github_link,
    tech_stack,
    key_features,
    star_situation,
    star_task,
    star_action,
    star_result
) VALUES 
(
    'Autonomous Code Review Agent',
    'An AI-driven developer tool that automatically reviews git pull requests, checks for lint/security issues, and comments with recommended code edits directly on GitHub commits.',
    ARRAY[
        'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
    ],
    'https://code-reviewer-agent.example.com',
    'https://github.com/example/code-reviewer-agent',
    ARRAY['Next.js', 'TypeScript', 'Node.js', 'OpenAI API', 'GitHub REST API', 'Supabase', 'Tailwind CSS'],
    ARRAY[
        'Real-time webhook integration with GitHub repositories',
        'Deep AST analysis combined with GPT-4 for high-confidence refactoring suggestions',
        'Interactive code diff generation inside review comments',
        'Extensible plugin system for custom team guidelines'
    ],
    'Large software engineering teams often lose significant velocity waiting for peer code reviews. Minor bugs, style issues, and security vulnerabilities frequently slip through because reviews are rushed.',
    'Build a fully automated code reviewer assistant that triggers on Pull Requests, performs analysis, and provides contextual inline feedback directly on GitHub within 2 minutes of submission.',
    'Leveraged Node.js to spin up an event-driven server handling GitHub webhooks. Parsed incoming git diffs and context. Fed sections of the codebase to GPT-4 via prompt-engineered LLM pipelines with strict system guidelines. Stored PR analysis records in Supabase and displayed live dashboard stats via Next.js and Tailwind CSS.',
    'Decreased average PR merge time by 32% across 5 active test teams. Caught 14 high-severity security vulnerabilities (API leaks, SQL injection paths) before they reached staging, while eliminating trivial style comments from human code review rounds.'
),
(
    'Real-time Collaborative Whiteboard',
    'A high-performance interactive whiteboarding tool that enables teams to draw, add sticky notes, and collaborate in real-time with zero-latency synchronization.',
    ARRAY[
        'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80'
    ],
    'https://draw-sync.example.com',
    'https://github.com/example/draw-sync',
    ARRAY['React', 'Vite', 'TypeScript', 'Socket.io', 'Node.js', 'Canvas API', 'Framer Motion'],
    ARRAY[
        'Multi-user live cursor and drawing tracking with custom colors',
        'Vector-based shape resizing, drawing, and text manipulation',
        'Infinite canvas workspace with panning and zoom controls',
        'Export options for PNG, SVG, and high-fidelity PDF format'
    ],
    'During remote planning sessions, traditional screensharing tools fell short of allowing true interactive brainstorming, leaving team members passive listeners rather than active visual contributors.',
    'Develop an interactive, scalable web whiteboard application that supports up to 100 concurrent drawing sessions per board, keeping latency under 50ms for smooth real-time rendering.',
    'Implemented the frontend canvas using raw HTML5 Canvas API and customized hook logic for shape math. Orchestrated backend synchronization utilizing WebSockets (Socket.io) backed by Redis adapter for message distribution. Used Framer Motion to animate UI panels, modal drawers, and tools menus, preserving a clean workspace.',
    'Achieved sub-20ms rendering lag, offering a buttery-smooth drawing feel. Built modular room state persistence, enabling users to return to boards exactly as they left them. Used successfully by 3 department teams for retrospective sessions.'
);
