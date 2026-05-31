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
    'Intelligent Supply Chain & Fleet Optimization Engine',
    'An AI-powered forecasting and optimization system engineered to predict multi-modal transit bottlenecks and streamline fleet distribution algorithms for high-volume logistics.',
    ARRAY[
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1519003722824-192d992a6020?auto=format&fit=crop&w=800&q=80'
    ],
    'https://logistics-optimization.example.com',
    'https://github.com/example/logistics-optimization',
    ARRAY['Python', 'FastAPI', 'Scikit-Learn', 'LightGBM', 'Supabase', 'PostgreSQL'],
    ARRAY[
        'Real-time route bottleneck alerting',
        'Predictive transit delay mapping',
        'Automated fleet relocation recommendations'
    ],
    'A massive multi-modal logistics operation faced structural delivery variances and increased operational costs due to unforeseen transit bottlenecks and inefficient vehicle positioning.',
    'Build an end-to-end predictive analytics engine to anticipate congestion periods and optimize vehicle allocation metrics across regional hubs.',
    'Engineered robust feature sets from extensive historical GPS transit logs, trained a highly tuned LightGBM regressor to forecast delivery delays, and exposed predictions via a secure, modular FastAPI routing structure.',
    'Successfully reduced delivery arrival variance by 14%, optimized asset allocation efficiency, and dramatically mitigated redundant transit run-times.'
),
(
    'Agentic Code Review & Optimization Assistant',
    'A production-ready LLM-powered development workflow agent that automatically reviews git patch sets, flags optimization vulnerabilities, and submits refactoring suggestions.',
    ARRAY[
        'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80'
      ],
    'https://agentic-reviewer.example.com',
    'https://github.com/example/agentic-reviewer',
    ARRAY['Next.js', 'TypeScript', 'Gemini API', 'Supabase RLS', 'Vector Embeddings'],
    ARRAY[
        'Automated code style/security analysis',
        'Context-aware semantic patch checks',
        'Contextual embedding search over codebase structures'
    ],
    'Development speed in fast-moving engineering teams was constrained by manual, repetitive merge request reviews and static code analysis noise.',
    'Architect a reliable, context-aware LLM pipeline capable of acting as an autonomous peer reviewer to flag critical logic flaws prior to main branch integration.',
    'Built an asynchronous processing pipeline utilizing the Gemini API to parse diff fragments, built a vector retrieval system over regional coding standards, and structured strict JSON schemas for precise parsing.',
    'Accelerated continuous integration code validation cycles by 35% and captured critical edge-case structural exceptions prior to production deployment.'
);
