import { Project, ServiceItem, ExperienceItem, TestimonialItem, ClientLogo, StatItem } from '../types';

export const portfolioConfig = {
  personal: {
    name: "Daksh Bhavsar",
    fullName: "BHAVSAR DAKSH NARENDRABHAI",
    title: "AI Engineering Intern Candidate | Python & GenAI Developer",
    shortBio: "Computer Engineering student (Semester 5) with strong experience building full-stack, AI-powered, real-time, and SaaS applications using modern frontend, backend, database, and cloud technologies.",
    tagline: "Building scalable full-stack web applications and intelligent multi-provider AI systems.",
    summary: "Highly motivated Computer Engineering student (Semester 5) with a strong foundation in full-stack web development and AI integration. Proficient in Django, Flask, FastAPI, React, Node.js, and Python, with a proven ability to architect, develop, and deploy production-grade platforms. Creator of Between, an AI-powered recruitment and resume platform, alongside SevaSetu, StudyVerse, and TestVerse — showcasing expertise in multi-provider LLM systems, cloud deployment, and scalable system design.",
    location: "Ahmedabad, Gujarat, India",
    education: "B.E. Computer Engineering • LJ University (July 2024 – May 2028) • Semester 5 • CGPA 8.28",
    cgpa: "8.28",
    languages: "English (Fluent), Hindi (Native), Gujarati (Native)",
    certifications: "View all certifications — LinkedIn",
    availability: "Available for Roles & Projects",
    avatar: "/daksh-portrait.png",
    aboutHeroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
    heroPortrait: "/daksh-portrait.png",
  },
  roles: [
    "AI Engineering Intern",
    "Python & GenAI Developer",
    "Full-Stack Developer",
    "Backend Developer",
    "Frontend Developer",
    "Python Developer",
    "DevOps Engineer",
    "Business Analyst"
  ],
  contact: {
    email: "dakshbhavsar3699@gmail.com",
    secondaryEmail: "dakshbhavsar3699@gmail.com",
    phone: "8849538117",
    mobilePhone: "+91 8849538117",
    address: "Ahmedabad, Gujarat, India",
    socials: {
      github: "https://github.com/DakshBhavsar007",
      linkedin: "https://www.linkedin.com/in/daksh-bhavsar-96b102339/",
      twitter: "https://twitter.com",
      dribbble: "https://dribbble.com",
      instagram: "https://instagram.com"
    },
    resumeUrl: "/Daksh_Bhavsar_Resume.pdf"
  }
};

export const roles = portfolioConfig.roles;

export const clientLogos: ClientLogo[] = [
  { name: "Python", slug: "python" },
  { name: "Django", slug: "django" },
  { name: "FastAPI", slug: "fastapi" },
  { name: "React", slug: "react" },
  { name: "Node.js", slug: "nodejs" },
  { name: "Gemini API", slug: "gemini" },
  { name: "PostgreSQL", slug: "postgres" },
  { name: "AWS", slug: "aws" }
];

export const statistics: StatItem[] = [
  {
    value: "06+",
    label: "Production Platforms Built",
    sublabel: "Between-GitOPS, Resume RAG Search Engine, Between, SevaSetu, StudyVerse, and TestVerse engineered from concept to live deployment."
  },
  {
    value: "8.28",
    label: "CGPA • Semester 5",
    sublabel: "B.E. Computer Engineering • LJ University, Ahmedabad, Gujarat (July 2024 – May 2028)"
  }
];

export const services: ServiceItem[] = [
  {
    id: "fullstack-dev",
    title: "Full-Stack Development",
    description: "Architecting and deploying production-grade web platforms with React 19, Vite, Django, Flask, FastAPI, Node.js, and Express.",
    deliverables: ["React 19 & Vite Frontend", "Django & FastAPI Backends", "RESTful & JWT APIs", "Mapbox GL JS & Three.js"],
    isDark: false
  },
  {
    id: "ai-llm-integration",
    title: "AI Integration & Multi-Provider LLMs",
    description: "Engineering intelligent multi-provider LLM pipelines with automated fallback rotation (Gemini + Groq), resume parsing, ATS scoring, and Tesseract.js OCR.",
    deliverables: ["Gemini & Groq API Fallback", "Multi-Provider LLM Rotation", "Automated ATS & OCR Scoring", "Async Task Processing"],
    isDark: false
  },
  {
    id: "devops-cloud",
    title: "DevOps, Cloud & Infrastructure",
    description: "Configuring scalable cloud infrastructure on AWS (EC2, VPC, S3, ALB/ASG), Docker, Docker Compose, Jenkins CI/CD, Celery, Redis, Render, and Vercel.",
    deliverables: ["AWS EC2, VPC, S3, CloudWatch", "Docker & Docker Compose", "Celery & Redis Async Queues", "Custom DNS & SPF/DKIM/DMARC"],
    isDark: true // Featured dark card
  },
  {
    id: "databases-realtime",
    title: "Databases & Real-Time Systems",
    description: "Designing robust relational and NoSQL databases, low-latency Socket.IO communications, and Playwright end-to-end testing automation.",
    deliverables: ["PostgreSQL (Neon), MySQL, MongoDB", "Socket.IO Real-Time Live Battles", "Playwright Test Automation", "Server Monitoring & systemd"],
    isDark: false
  }
];

export const experiences: ExperienceItem[] = [
  {
    id: "exp-gitops",
    role: "Kubernetes & GitOps Cloud Architect",
    company: "Between-GitOPS Platform",
    description: "Architected and deployed an automated Kubernetes (k3s) and ArgoCD GitOps delivery pipeline on AWS EC2 & RDS.",
    period: "Live",
    location: "AWS Cloud (ap-south-1)",
    highlights: [
      "Deployed k3s Kubernetes cluster on AWS EC2 with ArgoCD declarative continuous delivery and automated sync",
      "Configured GitHub Actions CI publishing immutable multi-stage Docker images to GitHub Container Registry (GHCR)",
      "Configured Traefik Ingress with automated Let's Encrypt SSL/TLS certificates and HTTPS redirection",
      "Isolated production storage in AWS RDS PostgreSQL 15 within private subnet security groups, with automated daily backups",
      "Authored PowerShell AWS CLI cost-toggle script for one-click stopping/starting of EC2 and RDS with dynamic Route 53 DNS updates"
    ],
    skills: ["Kubernetes (k3s)", "ArgoCD", "AWS EC2", "AWS RDS", "Docker", "GitHub Actions", "GHCR", "Traefik", "Let's Encrypt", "Route 53", "PostgreSQL", "PowerShell"]
  },
  {
    id: "exp-rag",
    role: "RAG & Cloud Systems Creator",
    company: "Resume RAG Search Engine",
    description: "Architected and shipped an end-to-end RAG candidate search platform on AWS EC2 with pgvector, LangChain LCEL, and Let's Encrypt SSL.",
    period: "Live",
    location: "AWS Cloud (ap-south-1)",
    highlights: [
      "Built section-aware regex chunking and 3072-d dense vector search via pgvector cosine distance (<=>)",
      "Orchestrated custom LangChain BaseRetriever with LCEL pipeline and strict citation-grounded prompting",
      "Containerized with Docker and deployed live on AWS EC2 behind Nginx reverse proxy with Elastic IP and Route 53",
      "Conducted automated 10-query benchmark logging retrieval precision, latency profiles, and edge-case caveats"
    ],
    skills: ["Python", "FastAPI", "LangChain", "PostgreSQL", "pgvector", "Gemini 2.5", "Docker", "AWS EC2", "Nginx", "Route 53"]
  },
  {
    id: "exp-edu",
    role: "B.E. Computer Engineering (Semester 5)",
    company: "LJ University",
    description: "Pursuing Bachelor of Engineering in Computer Engineering with CGPA 8.28. Focus on full-stack architecture, algorithms, and AI systems.",
    period: "July 2024 – May 2028",
    location: "Ahmedabad, Gujarat, India",
    highlights: [
      "Semester 5 • CGPA 8.28 with focus on scalable software architecture and database design",
      "Architected and deployed 4 production-grade platforms (Between, SevaSetu, StudyVerse, TestVerse)",
      "Specialized in multi-provider LLM pipelines, asynchronous processing, and cloud deployment"
    ],
    skills: ["Python", "Java", "SQL", "PL/SQL", "C/C++", "JavaScript", "HTML5", "CSS3"]
  },
  {
    id: "exp-between",
    role: "Full-Stack & AI Systems Creator",
    company: "Between Platform",
    description: "Architected and deployed Between, an AI-powered recruitment and resume platform with automated ATS scoring and sandbox execution.",
    period: "Live",
    location: "Ahmedabad, Gujarat",
    highlights: [
      "Built automated resume parsing and ATS scoring pipeline on Django backend with React/Vite frontend",
      "Designed a multi-provider LLM rotation system (Gemini + Groq fallback) using Celery and Redis for async processing",
      "Integrated Piston coding assessment sandbox and developer portal with CORS-based domain allowlisting",
      "Configured custom DNS, SPF/DKIM/DMARC email routing, and deployed on Render/Vercel and AWS EC2"
    ],
    skills: ["Django", "React", "Vite", "Celery", "Redis", "PostgreSQL (Neon)", "Gemini API", "Groq API", "Docker"]
  },
  {
    id: "exp-sevasetu",
    role: "Full-Stack Developer",
    company: "SevaSetu Platform",
    description: "Built full-stack NGO volunteer coordination platform with real-time 3D crisis map and weighted smart-matching algorithm.",
    period: "Live",
    location: "Ahmedabad, Gujarat",
    highlights: [
      "Architected React frontend and FastAPI backend with interactive Mapbox GL JS real-time 3D crisis map",
      "Developed weighted smart-matching algorithm for volunteer assignment based on distance, skills, and availability",
      "Integrated Tesseract.js OCR and Gemini API for automated need categorization and urgency scoring",
      "Implemented JWT-authenticated APIs, Cloudinary media uploads, and MongoDB / SQLite (Turso) storage"
    ],
    skills: ["React", "FastAPI", "Mapbox GL JS", "Cloudinary", "Gemini API", "Tesseract.js", "MongoDB", "JWT"]
  },
  {
    id: "exp-study-test",
    role: "Full-Stack & QA Automation Developer",
    company: "StudyVerse & TestVerse",
    description: "Engineered AI-powered gamified study platform with live quiz battles and an enterprise SaaS testing automation platform.",
    period: "Live",
    location: "Ahmedabad, Gujarat",
    highlights: [
      "Engineered StudyVerse v2.0 with Gemini API content generation, gamification (XP/ranks/Pomodoro), and Socket.IO live quiz battles",
      "Developed TestVerse v3.1 multi-tenant SaaS testing platform with React 19, FastAPI, MongoDB, and Playwright automation",
      "Implemented team collaboration tools, flexible test scheduling, and real-time monitoring dashboards"
    ],
    skills: ["React 19", "FastAPI", "MongoDB", "Playwright", "Socket.IO", "Flask", "Gemini API"]
  }
];

export const projects: Project[] = [
  {
    id: "proj-gitops",
    title: "Between-GitOps — Kubernetes, ArgoCD & AWS Cloud Platform",
    category: "DevOps & Cloud",
    tags: ["Kubernetes (k3s)", "ArgoCD", "AWS EC2 & RDS", "Docker", "GitHub Actions", "Traefik Ingress", "Let's Encrypt TLS", "Django", "React"],
    description: "Production GitOps deployment of an enterprise multi-agent AI recruitment platform on AWS EC2 using a lightweight k3s Kubernetes cluster, ArgoCD declarative continuous delivery, and AWS RDS PostgreSQL.",
    longDescription: "Architected and deployed a production-grade GitOps continuous delivery infrastructure on AWS EC2 (t3.small) running a lightweight k3s Kubernetes cluster. Engineered automated CI pipelines with GitHub Actions running multi-stage Docker builds published to GitHub Container Registry (GHCR), declarative auto-syncing with ArgoCD from Kustomize overlays, Traefik ingress controller with automated Let's Encrypt TLS (HTTP-01 challenge), and high-availability database storage on isolated AWS RDS PostgreSQL 15. Includes automated PowerShell / AWS CLI cloud cost management scripts for stopping/starting instances and dynamic Route 53 DNS updates.",
    image: "/images/projects/between-gitops.svg",
    client: "AWS Cloud (Live Production)",
    year: "2026",
    role: "DevOps & Cloud Systems Architect",
    challenge: "Managing manual Docker deployments across distributed microservices caused configuration drift, downtime during releases, lack of instant rollback, and high ongoing cloud compute costs when idling.",
    solution: "Built a fully declarative GitOps continuous delivery system with ArgoCD and k3s on AWS EC2, GitHub Actions CI to GHCR, Traefik ingress with automated Let's Encrypt TLS, secure AWS RDS PostgreSQL isolation, and automated one-click cloud cost toggle scripts.",
    deliverables: [
      "k3s Kubernetes Cluster on AWS EC2 (Ubuntu 24.04 LTS)",
      "ArgoCD Continuous Delivery with Declarative Kustomize Overlays",
      "GitHub Actions CI Pipeline with GHCR Multi-Stage Image Builds",
      "Traefik Ingress Controller with Automated Let's Encrypt TLS",
      "AWS RDS PostgreSQL 15 Database with Private Subnet Group Isolation",
      "Celery Background Task Queue & Redis Cache/Broker Pods",
      "Route 53 Dynamic DNS Record Sync (between.dakshaws.sryze.cc)",
      "Automated PowerShell / AWS CLI Cost-Toggle Script (EC2 + RDS Stop/Start)"
    ],
    liveUrl: "https://between.dakshaws.sryze.cc",
    githubUrl: "https://github.com/DakshBhavsar007/Between-GitOPS",
    featured: true
  },
  {
    id: "proj-rag",
    title: "Resume RAG Search Engine - Semantic Candidate Retrieval Platform",
    category: "AI & SaaS",
    tags: ["FastAPI", "LangChain", "pgvector", "AWS EC2", "Docker", "Gemini API"],
    description: "Architected an end-to-end RAG candidate search engine indexing technical resumes with section-aware chunking, 3072-d pgvector cosine similarity, and citation-grounded evaluations.",
    longDescription: "Architected and shipped an end-to-end RAG candidate retrieval engine in Python. Replaced naive token slicing with a regex-based section-aware chunker, stored 3072-dimensional Gemini embeddings in Neon PostgreSQL with pgvector cosine distance (<=>), and orchestrated retrieval with a custom LangChain BaseRetriever and LCEL chain. Evaluated against a 10-query benchmark and deployed live on AWS EC2 behind Nginx with Let's Encrypt SSL.",
    image: "/images/projects/resume-rag.svg",
    client: "AWS Production (Live)",
    year: "2026",
    role: "AI & Cloud Systems Architect",
    challenge: "Traditional keyword-based ATS screening fails on semantic intent, synonyms, and cross-functional role matching, while ungrounded LLMs produce hallucinated qualifications without citations.",
    solution: "Engineered section-aware chunking with 3072-d vector similarity in pgvector, custom LangChain BaseRetriever with LCEL orchestration, strict [resume_id: ...] citation grounding, and an automated 10-query benchmark, containerized and deployed on AWS EC2.",
    deliverables: [
      "FastAPI REST API with /health and /query",
      "Section-Aware Regex Chunking Pipeline",
      "3072-d Embeddings (models/gemini-embedding-001)",
      "PostgreSQL + pgvector Cosine Search (<=>)",
      "Custom PgVectorResumeRetriever(BaseRetriever)",
      "LangChain LCEL Citation-Grounded Chain",
      "Automated 10-Query Evaluation Benchmark",
      "AWS EC2 + Elastic IP + Route 53 + Let's Encrypt SSL",
      "Docker Containerization & Nginx Reverse Proxy"
    ],
    liveUrl: "https://rag.dakshaws.sryze.cc/docs",
    githubUrl: "https://github.com/DakshBhavsar007/Resume-RAG-Search",
    featured: true
  },
  {
    id: "proj-1",
    title: "Between — AI-Powered Recruitment & Resume Platform",
    category: "AI & SaaS",
    tags: ["Django", "React", "Celery", "Gemini API"],
    description: "Built a full-stack AI recruitment platform with automated resume parsing, ATS scoring, and a coding assessment sandbox (Piston) on a Django backend with a React/Vite frontend.",
    longDescription: "Built a full-stack AI recruitment platform with automated resume parsing, ATS scoring, and a coding assessment sandbox (Piston) on a Django backend with a React/Vite frontend. Designed a multi-provider LLM rotation system (Gemini + Groq fallback) using Celery and Redis for async processing; deployed on Render/Vercel with custom DNS and SPF/DMARC email.",
    image: "/images/projects/between.svg",
    client: "Between Platform",
    year: "Live",
    role: "Full-Stack Developer & Architect",
    challenge: "Traditional recruitment screening relies on manual resume parsing with slow processing, single-provider API rate limits, and lacking hands-on coding assessment environments.",
    solution: "Designed a multi-provider LLM rotation system (Gemini + Groq fallback) using Celery and Redis for async processing, integrated Piston coding sandbox, and deployed on Render/Vercel with custom DNS.",
    deliverables: [
      "Django Backend & React/Vite Frontend",
      "Multi-Provider LLM Rotation (Gemini + Groq)",
      "Automated Resume Parsing & ATS Scoring",
      "Piston Coding Assessment Sandbox",
      "Celery & Redis Async Processing Pipeline",
      "PostgreSQL (Neon) Database",
      "CORS Domain Allowlisting & RBAC",
      "Custom DNS, SPF/DKIM/DMARC Email"
    ],
    liveUrl: "https://between.indevs.in",
    githubUrl: "https://github.com/DakshBhavsar007/Between",
    featured: true
  },
  {
    id: "proj-2",
    title: "SevaSetu — NGO Volunteer Coordination Platform",
    category: "Web Platform",
    tags: ["React", "FastAPI", "Mapbox GL JS", "Gemini API"],
    description: "Built a full-stack NGO volunteer-coordination platform with a React frontend, FastAPI backend, real-time 3D crisis map, and weighted smart-matching algorithm.",
    longDescription: "Built a full-stack NGO volunteer-coordination platform with a React frontend and FastAPI backend. Features real-time 3D crisis mapping with Mapbox GL JS, weighted smart-matching algorithm for volunteer assignment (distance, skills, availability), Tesseract.js OCR and Gemini API for need categorization & urgency scoring, Cloudinary media uploads, and JWT-authenticated APIs.",
    image: "/images/projects/sevasetu.svg",
    client: "SevaSetu Platform",
    year: "Live",
    role: "Full-Stack Developer",
    challenge: "Disaster and community relief efforts struggle with slow volunteer matching, lack of real-time spatial crisis maps, and unverified aid requests.",
    solution: "Built an interactive 3D crisis map with Mapbox GL JS, algorithmic volunteer matching by distance/skills/availability, OCR with Tesseract.js, and Gemini API urgency scoring.",
    deliverables: [
      "React Frontend & FastAPI Backend",
      "Real-Time 3D Crisis Map (Mapbox GL JS)",
      "Weighted Volunteer Smart-Matching Algorithm",
      "Tesseract.js OCR & Gemini API Urgency Scoring",
      "Cloudinary Media & JWT Authentication",
      "MongoDB / SQLite (Turso) Storage"
    ],
    liveUrl: "https://sevasetu-landing.onrender.com",
    githubUrl: "https://github.com/DakshBhavsar007/SevaSetu",
    featured: false
  },
  {
    id: "proj-3",
    title: "TestVerse v3.1 — Enterprise SaaS Testing Platform",
    category: "AI & SaaS",
    tags: ["React 19", "FastAPI", "MongoDB", "Playwright"],
    description: "Developed a multi-tenant SaaS testing platform with React 19 frontend, FastAPI backend, MongoDB storage, and Playwright automation.",
    longDescription: "Developed a multi-tenant SaaS testing platform with React 19 frontend, FastAPI backend, MongoDB storage, and Playwright automation. Implemented team collaboration tools, flexible test scheduling, and real-time monitoring dashboards.",
    image: "/images/projects/testverse.svg",
    client: "TestVerse Platform",
    year: "Live",
    role: "Lead Full-Stack Developer",
    challenge: "Executing automated end-to-end browser tests reliably across multi-tenant teams while maintaining high throughput and real-time reporting.",
    solution: "Engineered a high-performance FastAPI backend with MongoDB, React 19 real-time dashboard UI, Playwright browser test orchestration, AI-powered test suggestions, and automated scheduling.",
    deliverables: [
      "React 19 Multi-Tenant Dashboard UI",
      "FastAPI High-Performance Backend",
      "Playwright Browser Automation Suite",
      "AI-Powered Test Suggestion Engine",
      "Flexible Test Scheduling & Real-Time Monitoring",
      "MongoDB Data Storage"
    ],
    liveUrl: "https://testverse-frontend.vercel.app",
    githubUrl: "https://github.com/DakshBhavsar007/TestVerse-frontend",
    featured: true
  },
  {
    id: "proj-4",
    title: "StudyVerse v2.0 — AI-Powered Study Platform",
    category: "AI & SaaS",
    tags: ["Flask", "Gemini API", "Socket.IO", "MySQL"],
    description: "Engineered an AI-powered study platform integrating Gemini API for content generation with a gamification system (XP, ranks, badges, Pomodoro timer).",
    longDescription: "Engineered an AI-powered study platform integrating Gemini API for content generation with a gamification system (XP, ranks, badges, Pomodoro timer). Implemented real-time live quiz battles using Socket.IO; deployed on Render.com.",
    image: "/images/projects/studyverse.svg",
    client: "StudyVerse Platform",
    year: "Live",
    role: "Full-Stack & AI Engineer",
    challenge: "Creating an engaging learning environment that combines AI-generated educational materials with low-latency competitive multiplayer elements.",
    solution: "Integrated Gemini API for dynamic study content synthesis, built a full gamification reward system (XP, badges, Pomodoro), and deployed real-time Socket.IO quiz battle rooms.",
    deliverables: [
      "Gemini API Content Generation",
      "Socket.IO Live Quiz Battles",
      "Gamification (XP, Ranks, Badges, Pomodoro)",
      "Python Flask Architecture",
      "MySQL Database Design",
      "Render.com Deployment"
    ],
    liveUrl: "https://studyverse-final.onrender.com",
    githubUrl: "https://github.com/DakshBhavsar007/StudyVerse",
    featured: false
  },
  {
    id: "proj-5",
    title: "Smart City Complaint Management System",
    category: "Web Platform",
    tags: ["Java", "MySQL", "JDBC", "CLI"],
    description: "Developed a CLI civic platform with Admin, User, and Officer roles to manage the full complaint lifecycle with role-specific permissions.",
    longDescription: "Developed a robust CLI civic complaint management application featuring distinct Admin, User, and Officer roles to manage the complete complaint lifecycle, status updates, and audit trails.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
    client: "Civic Systems",
    year: "Live",
    role: "Backend Developer",
    challenge: "Structuring clear role separation and transactional integrity for civic dispute resolution and ticket lifecycle management.",
    solution: "Engineered role-based authentication, modular JDBC database queries, and structured terminal interfaces for swift complaint resolution.",
    deliverables: [
      "Role-Based Access (Admin, User, Officer)",
      "Complaint Lifecycle Management",
      "Java & JDBC Database Architecture",
      "MySQL Relational Data Models"
    ],
    liveUrl: "https://github.com/DakshBhavsar007",
    githubUrl: "https://github.com/DakshBhavsar007",
    featured: false
  }
];

export const testimonials: TestimonialItem[] = [
  {
    id: "test-1",
    highlightQuote: "Daksh built a robust multi-provider AI recruitment pipeline with exceptional architectural clarity.",
    quote: "Between's automated resume parsing and LLM rotation system (Gemini + Groq fallback) operates seamlessly with Celery and Redis async queues.",
    author: "B.E. Computer Engineering (CGPA 8.28)",
    role: "LJ University",
    company: "Ahmedabad, Gujarat",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "test-2",
    highlightQuote: "Proven ability to architect, develop, and deploy production-grade platforms with Python and modern JavaScript.",
    quote: "From 3D crisis maps in SevaSetu to real-time live quiz battles in StudyVerse and Playwright test automation in TestVerse, Daksh demonstrates strong full-stack and AI integration depth.",
    author: "Full-Stack Development",
    role: "AI Integration",
    company: "Production Platforms",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "test-3",
    highlightQuote: "View all certifications — LinkedIn",
    quote: "Proficient across Python, JavaScript, Java, SQL, React 19, Django, FastAPI, Celery, Redis, AWS (EC2/VPC), Docker, and Gemini/Groq APIs. English (Fluent), Hindi (Native), Gujarati (Native).",
    author: "Certifications & Credentials",
    role: "English, Hindi, Gujarati",
    company: "linkedin.com/in/daksh-bhavsar-96b102339",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
  }
];


