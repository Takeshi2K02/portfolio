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
    'Multi-Modal AI Tutoring System',
    'A GenAI-powered tutoring system using Agentic AI and Vector Embeddings for context-aware, goal-driven learning.',
    ARRAY[
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'
    ],
    NULL,
    'https://github.com/Takeshi2K02/ai-tutoring-system',
    ARRAY['LangChain', 'Tree of Thought', 'ReAct', 'Vector Embeddings', 'LLMs', 'Python', 'OpenCV'],
    ARRAY[
        'Dynamic instructional flow planning',
        'RL-based teaching optimization',
        'CV-based attention tracking modules'
    ],
    'Online tutoring frameworks lacked context-aware, adaptive pacing, leading to significant learning gaps and low user attention retention.',
    'Develop a personalized, goal-driven tutoring service that dynamically steers educational content and tracks student engagement in real-time.',
    'Engineered a cognitive agentic structure using LangChain and a custom Tree of Thought/ReAct loop, integrating an OpenCV module for visual attention monitoring.',
    'Successfully bridged instructional gaps by tailoring content streams based on student interaction histories and physical engagement metrics.'
),
(
    'AI-Powered Learning Platform',
    'Full-stack platform enabling automated course generation and adaptive quiz evaluation.',
    ARRAY[
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80'
    ],
    NULL,
    'https://github.com/Takeshi2K02/ai-learning-platform',
    ARRAY['MERN Stack', 'Gemini API', 'Python', 'YouTube Data API', 'React.js', 'Node.js', 'MongoDB'],
    ARRAY[
        'LLM-driven course syllabus generation',
        'Dynamic YouTube video recommendations',
        'Module engagement scoring pipelines'
    ],
    'Manually curating educational materials and designing personalized quiz evaluations is highly time-consuming for content creators and teachers.',
    'Design an end-to-end full-stack web platform that automates high-quality course generation and dynamically tracks student progress.',
    'Integrated the Gemini API for structured module generation, wrote Python workers to process documents, and utilized the YouTube Data API to fetch supplementary tutorials.',
    'Delivered a responsive learning dashboard offering immediate automated course creation, module progress scores, and adaptive quizzes.'
),
(
    'E-commerce Recommendation System',
    'Personalized recommendation engine using collaborative, content-based, and hybrid filtering.',
    ARRAY[
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80'
    ],
    NULL,
    'https://github.com/Takeshi2K02/ecommerce-recommendation',
    ARRAY['Python', 'Flask', 'PhpMyAdmin', 'Jupyter Notebook', 'MySQL'],
    ARRAY[
        'Collaborative filtering product recommendations',
        'Content-based similarity vectors',
        'Hybrid user recommendation pipeline'
    ],
    'Online retail storefronts struggle with low click-through rates and high basket abandonment rates due to generic, static product discovery interfaces.',
    'Build a modular, low-latency recommendation engine that dynamically targets product listings to match historical user preferences.',
    'Developed and optimized collaborative and content-based recommendation algorithms in Jupyter Notebook, exposing inference endpoints via a Flask API connected to PhpMyAdmin.',
    'Generated accurate recommendation arrays that map user profiles to relevant products, boosting click-through performance.'
),
(
    'Accident Severity Prediction System',
    'Machine learning injury risk assessment system evaluating five separate model architectures.',
    ARRAY[
        'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=800&q=80'
    ],
    NULL,
    'https://github.com/Takeshi2K02/accident-severity-prediction',
    ARRAY['Python', 'Flask', 'JavaScript', 'Jupyter Notebook', 'Scikit-Learn'],
    ARRAY[
        'Injury risk assessment scores',
        '5 model architecture comparisons',
        'Environmental telemetry evaluation'
    ],
    'Transit authorities lacked granular data models to analyze structural road hazards and anticipate severity indicators in motor vehicle accidents.',
    'Construct a machine learning pipeline to estimate injury risks by evaluating weather, spatial-temporal features, and road conditions.',
    'Trained and compared five distinct classification architectures using Scikit-Learn, wrapping the top-performing estimator in a Flask service with an interactive UI.',
    'Achieved high prediction precision, providing planners with an analytical system to model traffic hazards and dispatch response resources.'
);
