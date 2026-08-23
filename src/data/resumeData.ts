export interface ResumeRole {
  id: string;
  roleTitle: string;
  shortRole: string;
  subtitle: string;
  badge: string;
  iconName: string;
  color: string;
  summary: string;
  education: {
    degree: string;
    institution: string;
    location: string;
    period: string;
    cgpa: string;
    semester: string;
  };
  skillsByCategory: {
    category: string;
    skills: string;
  }[];
  experienceOrProjects: {
    title: string;
    subtitle: string;
    type: 'project' | 'experience' | 'lab';
    liveUrl?: string;
    githubUrl?: string;
    points: string[];
    techStack?: string;
  }[];
  certifications: string[];
  languages: string[];
}

export const resumesData: ResumeRole[] = [
  {
    id: "full-stack",
    roleTitle: "Full-Stack Developer | AI Enthusiast",
    shortRole: "Full-Stack Developer",
    subtitle: "End-to-End Web Architecture, React, Django & AI LLM Integration",
    badge: "Recommended",
    iconName: "Layers",
    color: "#111111",
    summary: "Highly motivated Computer Engineering student (Semester 5) with a strong foundation in full-stack web development and AI integration. Proficient in Django, Flask, FastAPI, React, Node.js, and Python, with a proven ability to architect, develop, and deploy production-grade platforms. Creator of Between, an AI-powered recruitment and resume platform, alongside SevaSetu, StudyVerse, and TestVerse — showcasing expertise in multi-provider LLM systems, cloud deployment, and scalable system design.",
    education: {
      degree: "B.E. Computer Engineering",
      institution: "LJ University",
      location: "Ahmedabad, Gujarat",
      period: "Jul 2024 – May 2028",
      cgpa: "8.28",
      semester: "Semester 5"
    },
    skillsByCategory: [
      {
        category: "Technical Skills",
        skills: "Python, Django, JavaScript, Java, SQL, HTML5, CSS3, React, Three.js, Flask, FastAPI, Express.js, Node.js, MySQL, MongoDB, PostgreSQL, SQLite, Git, GitHub, Render.com, Vercel, Celery, Redis, Cloudinary, Google OAuth, Gemini API, Groq API, AWS (EC2, VPC), RESTful APIs, Socket.IO, Mapbox GL JS, Tesseract.js, JWT"
      }
    ],
    experienceOrProjects: [
      {
        title: "Between — AI-Powered Recruitment & Resume Platform",
        subtitle: "Production Deployment",
        type: "project",
        liveUrl: "https://between.indevs.in",
        githubUrl: "https://github.com/DakshBhavsar007/Between",
        points: [
          "Built a full-stack AI recruitment platform with automated resume parsing, ATS scoring, and a coding assessment sandbox (Piston) on a Django backend with a React/Vite frontend.",
          "Designed a multi-provider LLM rotation system (Gemini + Groq fallback) using Celery and Redis for async processing; deployed on Render/Vercel with custom DNS and SPF/DMARC email."
        ],
        techStack: "Django, React, Vite, Celery, Redis, PostgreSQL (Neon), Gemini API, Groq API"
      },
      {
        title: "SevaSetu — NGO Volunteer Coordination Platform",
        subtitle: "Full-Stack NGO Platform",
        type: "project",
        liveUrl: "https://sevasetu-landing.onrender.com",
        githubUrl: "https://github.com/DakshBhavsar007/SevaSetu",
        points: [
          "Built a full-stack NGO volunteer-coordination platform (React frontend, FastAPI backend) with a real-time 3D crisis map (Mapbox GL JS) and a weighted smart-matching algorithm for volunteer assignment.",
          "Digitized paper-based field surveys via Tesseract.js OCR, used Gemini API for need categorization, and integrated Cloudinary for event/campaign media uploads."
        ],
        techStack: "React, FastAPI, Mapbox GL JS, Cloudinary, Gemini API"
      },
      {
        title: "StudyVerse v2.0 — AI-Powered Study Platform",
        subtitle: "Gamified Learning SaaS",
        type: "project",
        liveUrl: "https://studyverse-final.onrender.com",
        githubUrl: "https://github.com/DakshBhavsar007/StudyVerse",
        points: [
          "Engineered an AI-powered study platform integrating Gemini API for content generation with a gamification system (XP, ranks, badges, Pomodoro timer).",
          "Implemented real-time live quiz battles using Socket.IO; deployed on Render.com."
        ],
        techStack: "Python, Flask, Gemini API, Socket.IO, MySQL, JavaScript"
      },
      {
        title: "TestVerse v3.1 — Enterprise SaaS Testing Platform",
        subtitle: "Automated QA & Testing Suite",
        type: "project",
        liveUrl: "https://testverse-frontend.vercel.app",
        githubUrl: "https://github.com/DakshBhavsar007/TestVerse-frontend",
        points: [
          "Developed a multi-tenant SaaS testing platform with React 19 frontend, FastAPI backend, MongoDB storage, and Playwright automation.",
          "Implemented team collaboration tools, flexible test scheduling, and real-time monitoring dashboards."
        ],
        techStack: "React 19, FastAPI, MongoDB, Playwright, Python"
      }
    ],
    certifications: ["View all certifications on LinkedIn/GitHub"],
    languages: ["English (Fluent)", "Hindi (Native)", "Gujarati (Native)"]
  },
  {
    id: "backend",
    roleTitle: "Backend Developer | AI Enthusiast",
    shortRole: "Backend Developer",
    subtitle: "Django, FastAPI, Flask, Distributed Systems, Async Task Pipelines",
    badge: "Core Backend",
    iconName: "Server",
    color: "#2563EB",
    summary: "Computer Engineering student (Semester 5) specializing in backend architecture with Django, Flask, and FastAPI. Experienced in designing REST APIs, multi-provider LLM orchestration, async task pipelines (Celery/Redis), and relational/NoSQL data models across four production-deployed platforms.",
    education: {
      degree: "B.E. Computer Engineering",
      institution: "LJ University",
      location: "Ahmedabad, Gujarat",
      period: "Jul 2024 – May 2028",
      cgpa: "8.28",
      semester: "Semester 5"
    },
    skillsByCategory: [
      {
        category: "Technical Skills",
        skills: "Python, Django, Flask, FastAPI, Node.js, Express.js, Java, SQL, PL/SQL, MySQL, MongoDB, PostgreSQL, SQLite, Oracle SQL, Celery, Redis, RESTful APIs, Git, GitHub, AWS (EC2, VPC), Gemini API, Cloudinary, JWT"
      }
    ],
    experienceOrProjects: [
      {
        title: "Between — AI-Powered Recruitment & Resume Platform",
        subtitle: "Backend & Distributed LLM Pipelines",
        type: "project",
        liveUrl: "https://between.indevs.in",
        githubUrl: "https://github.com/DakshBhavsar007/Between",
        points: [
          "Built a Django backend powering automated resume parsing, ATS scoring, and a coding assessment sandbox executing Python/JavaScript test cases via Piston.",
          "Designed a multi-provider LLM rotation system (Gemini + Groq fallback) for reliability under quota limits, using Celery and Redis for async processing.",
          "Developed a developer portal backend with embed tokens, CORS-based domain allowlisting, and role-based access control.",
          "Configured transactional/inbox email (Brevo + Zoho) with SPF/DMARC on a PostgreSQL (Neon) data layer."
        ],
        techStack: "Django, Celery, Redis, PostgreSQL (Neon), Gemini API, Groq API"
      },
      {
        title: "SevaSetu — NGO Volunteer Coordination Platform",
        subtitle: "High-Performance REST Backend",
        type: "project",
        liveUrl: "https://sevasetu-landing.onrender.com",
        githubUrl: "https://github.com/DakshBhavsar007/SevaSetu",
        points: [
          "Built a FastAPI backend digitizing paper-based field surveys via Tesseract.js OCR and a weighted smart-matching algorithm (distance, skills, availability) to auto-assign volunteers to community needs.",
          "Integrated Gemini API for NLP-based need categorization and urgency scoring, with a MongoDB/SQLite (Turso) data layer and JWT-authenticated endpoints.",
          "Configured Cloudinary for event and campaign media uploads across the platform."
        ],
        techStack: "FastAPI, MongoDB, SQLite (Turso), Gemini API, Cloudinary, JWT"
      },
      {
        title: "TestVerse v3.1 — Enterprise SaaS Testing Platform",
        subtitle: "Automated Testing Backend Engine",
        type: "project",
        liveUrl: "https://testverse-frontend.vercel.app",
        githubUrl: "https://github.com/DakshBhavsar007/TestVerse-frontend",
        points: [
          "Built a FastAPI backend for a multi-tenant SaaS testing platform with an AI-powered test suggestion engine.",
          "Implemented Playwright-based browser automation and MongoDB data models for scalable test execution and monitoring."
        ],
        techStack: "FastAPI, MongoDB, Playwright, Python"
      },
      {
        title: "Smart City Complaint Management System",
        subtitle: "CLI Civic Platform & Relational Models",
        type: "project",
        points: [
          "Developed a CLI application with Admin, User, and Officer roles to manage the full complaint lifecycle.",
          "Used Java with MySQL/JDBC for reliable data storage, retrieval, and role-specific permission handling."
        ],
        techStack: "Java, MySQL, JDBC"
      }
    ],
    certifications: ["View all certifications on LinkedIn/GitHub"],
    languages: ["English (Fluent)"]
  },
  {
    id: "frontend",
    roleTitle: "Frontend Developer | AI Enthusiast",
    shortRole: "Frontend Developer",
    subtitle: "React, Vite, Responsive UI/UX, Three.js, Real-time WebSockets",
    badge: "UI/UX & React",
    iconName: "Layout",
    color: "#0D9488",
    summary: "Computer Engineering student (Semester 5) with strong frontend development experience building responsive, production-grade interfaces using React, Vite, and Three.js. Skilled at integrating REST APIs, real-time features (Socket.IO), and third-party services (OAuth, Cloudinary) into polished user-facing applications across four deployed platforms.",
    education: {
      degree: "B.E. Computer Engineering",
      institution: "LJ University",
      location: "Ahmedabad, Gujarat",
      period: "Jul 2024 – May 2028",
      cgpa: "8.28",
      semester: "Semester 5"
    },
    skillsByCategory: [
      {
        category: "Technical Skills",
        skills: "JavaScript, React, Vite, Three.js, HTML5, CSS3, Node.js, RESTful APIs, Socket.IO, Google OAuth, Cloudinary, Git, GitHub, Vercel, Render.com, Responsive UI Design, Mapbox GL JS, Tesseract.js"
      }
    ],
    experienceOrProjects: [
      {
        title: "Between — AI-Powered Recruitment & Resume Platform",
        subtitle: "Responsive UI & ATS Scoring Interface",
        type: "project",
        liveUrl: "https://between.indevs.in",
        githubUrl: "https://github.com/DakshBhavsar007/Between",
        points: [
          "Built a React/Vite frontend deployed on Vercel, delivering resume parsing results, ATS scores, and a live coding assessment sandbox through a fast, responsive UI.",
          "Developed a developer portal UI with embed-token generation and role-based views for external integrators.",
          "Integrated the frontend with a Django/Celery backend via REST APIs for real-time async task feedback."
        ],
        techStack: "React, Vite, RESTful APIs, Django (backend), Vercel"
      },
      {
        title: "TestVerse v3.1 — Enterprise SaaS Testing Platform",
        subtitle: "Real-Time Monitoring Dashboards",
        type: "project",
        liveUrl: "https://testverse-frontend.vercel.app",
        githubUrl: "https://github.com/DakshBhavsar007/TestVerse-frontend",
        points: [
          "Built the frontend of a multi-tenant SaaS platform using React 19, powering real-time monitoring dashboards and test scheduling views.",
          "Implemented team collaboration UI components and AI-driven test suggestion displays."
        ],
        techStack: "React 19, FastAPI (backend), MongoDB"
      },
      {
        title: "StudyVerse v2.0 — AI-Powered Study Platform",
        subtitle: "Gamification & Live WebSockets UI",
        type: "project",
        liveUrl: "https://studyverse-final.onrender.com",
        githubUrl: "https://github.com/DakshBhavsar007/StudyVerse",
        points: [
          "Built interactive UI for a gamified learning platform with XP points, ranks, badges, and a Pomodoro timer.",
          "Implemented real-time live quiz battles on the client using Socket.IO for low-latency event updates."
        ],
        techStack: "JavaScript, HTML/CSS, Socket.IO, Flask (backend)"
      },
      {
        title: "SevaSetu — NGO Volunteer Coordination Platform",
        subtitle: "3D Crisis Map & Mobile-First Frontend",
        type: "project",
        liveUrl: "https://sevasetu-landing.onrender.com",
        githubUrl: "https://github.com/DakshBhavsar007/SevaSetu",
        points: [
          "Built a React frontend featuring a real-time 3D crisis map (Mapbox GL JS) to visualize NGO/volunteer locations and community needs.",
          "Implemented an in-browser OCR upload flow (Tesseract.js) to digitize paper-based field surveys, plus Cloudinary-backed event/campaign media galleries."
        ],
        techStack: "React, Mapbox GL JS, Tesseract.js, Cloudinary"
      }
    ],
    certifications: ["View all certifications on LinkedIn/GitHub"],
    languages: ["English (Fluent)"]
  },
  {
    id: "devops",
    roleTitle: "DevOps & Cloud Monitoring Engineer | Linux & Networking Enthusiast",
    shortRole: "DevOps & Cloud Engineer",
    subtitle: "AWS EC2, Docker, Linux Administration, DNS, SPF/DMARC, Monitoring",
    badge: "Cloud & Infrastructure",
    iconName: "Cloud",
    color: "#E11D48",
    summary: "Semester 5 Computer Engineering student (CGPA 8.28) with hands-on experience deploying, monitoring, and maintaining production infrastructure across AWS EC2, Render, and Vercel. Skilled in Linux server administration, networking fundamentals (DNS, SPF/DKIM/DMARC, TCP/IP), containerized deployments with Docker Compose, and async task infrastructure (Celery/Redis). Comfortable monitoring server and application health, troubleshooting live systems, and documenting issues in a fast-paced operations environment. Working knowledge of Jenkins-based CI/CD pipelines, with monitoring stacks (Grafana/Prometheus) as current focus areas.",
    education: {
      degree: "B.E. Computer Engineering",
      institution: "LJ University",
      location: "Ahmedabad, Gujarat",
      period: "Jul 2024 – May 2028",
      cgpa: "8.28",
      semester: "Semester 5"
    },
    skillsByCategory: [
      {
        category: "Linux & Systems",
        skills: "Linux (Ubuntu), server monitoring & troubleshooting, systemd services, shell scripting (Bash)"
      },
      {
        category: "Networking",
        skills: "TCP/IP fundamentals, DNS configuration & troubleshooting, DHCP, SPF/DKIM/DMARC email authentication, VPC & security groups"
      },
      {
        category: "DevOps & Cloud",
        skills: "AWS (EC2, VPC, S3, ALB/ASG, CloudWatch), Docker & Docker Compose, Jenkins (CI/CD basics), Git/GitHub, Render, Vercel, Redis, Celery"
      },
      {
        category: "Currently Learning",
        skills: "Grafana, Prometheus"
      },
      {
        category: "Development",
        skills: "Python, Django, JavaScript, React, SQL (PostgreSQL, MySQL, MongoDB), RESTful APIs"
      }
    ],
    experienceOrProjects: [
      {
        title: "Between — AI Recruitment & Resume Platform (Production)",
        subtitle: "Production Infrastructure & Async Workers",
        type: "experience",
        liveUrl: "https://between.indevs.in",
        githubUrl: "https://github.com/DakshBhavsar007/Between",
        points: [
          "Migrating the production backend from Render to a self-managed AWS EC2 instance, containerizing the backend, Celery, and Redis together with Docker Compose for cost-efficient, single-instance infrastructure.",
          "Configured custom DNS and diagnosed/resolved SPF, DKIM, and DMARC misconfigurations to restore transactional email deliverability on the production domain.",
          "Monitor server and application health and debug production backend issues (middleware errors, race conditions, route conflicts) on a live, multi-service deployment.",
          "Set up Celery and Redis for reliable async task processing (LLM calls, resume parsing) with a multi-provider fallback system."
        ]
      },
      {
        title: "AWS Cloud Infrastructure — Hands-on Labs",
        subtitle: "EC2, VPC, CloudWatch & Subnetting",
        type: "lab",
        points: [
          "Hands-on with EC2, VPC, ALB/ASG, S3, and CloudWatch for monitoring instance and application-level metrics.",
          "Applied networking fundamentals (subnetting, routing, security groups) while configuring cloud environments."
        ]
      },
      {
        title: "SevaSetu — NGO Volunteer Coordination Platform",
        subtitle: "Production Deployment & AWS EC2 Migration",
        type: "project",
        liveUrl: "https://sevasetu-landing.onrender.com",
        githubUrl: "https://github.com/DakshBhavsar007/SevaSetu",
        points: [
          "Built and deployed a FastAPI + React platform on Render; resolved deployment issues including CORS, OAuth, and SPA routing on a free-tier server.",
          "Migrating the backend to AWS EC2 for self-managed, cost-efficient hosting, mirroring the Docker Compose approach used for Between.",
          "Configured a real-time 3D crisis map (Mapbox GL JS) and Cloudinary-backed media storage for event/campaign data."
        ]
      }
    ],
    certifications: ["View all certifications on LinkedIn/GitHub"],
    languages: ["English (Fluent)", "Hindi (Native)", "Gujarati (Native)"]
  },
  {
    id: "python",
    roleTitle: "Python Developer | AI Enthusiast",
    shortRole: "Python Developer",
    subtitle: "Django, FastAPI, Flask, Async LLM Pipelines, Web Automation",
    badge: "Python Specialist",
    iconName: "Code2",
    color: "#D97706",
    summary: "Computer Engineering student (Semester 5) with strong Python development experience across Django, Flask, and FastAPI. Skilled in building production-grade backends, integrating LLM APIs (Gemini, Groq), designing async processing pipelines with Celery/Redis, and working with SQL/NoSQL databases across four deployed platforms.",
    education: {
      degree: "B.E. Computer Engineering",
      institution: "LJ University",
      location: "Ahmedabad, Gujarat",
      period: "Jul 2024 – May 2028",
      cgpa: "8.28",
      semester: "Semester 5"
    },
    skillsByCategory: [
      {
        category: "Technical Skills",
        skills: "Python, Django, Flask, FastAPI, Celery, Redis, SQL, PL/SQL, MySQL, PostgreSQL, MongoDB, SQLite, Gemini API, Groq API, RESTful APIs, Playwright, Git, GitHub, Cloudinary, JWT"
      }
    ],
    experienceOrProjects: [
      {
        title: "Between — AI-Powered Recruitment & Resume Platform",
        subtitle: "Django & Python Async Automation",
        type: "project",
        liveUrl: "https://between.indevs.in",
        githubUrl: "https://github.com/DakshBhavsar007/Between",
        points: [
          "Built a Django-based backend for automated resume parsing, ATS scoring, and a Python/JavaScript coding assessment sandbox via Piston.",
          "Designed a multi-provider LLM rotation system (Gemini + Groq fallback) in Python for reliability under quota limits, using Celery and Redis for async task orchestration."
        ],
        techStack: "Python, Django, Celery, Redis, PostgreSQL (Neon), Gemini API, Groq API"
      },
      {
        title: "StudyVerse v2.0 — AI-Powered Study Platform",
        subtitle: "Flask Backend & Dynamic AI Engine",
        type: "project",
        liveUrl: "https://studyverse-final.onrender.com",
        githubUrl: "https://github.com/DakshBhavsar007/StudyVerse",
        points: [
          "Engineered a Python/Flask backend integrating the Gemini API for intelligent content generation and personalized learning.",
          "Built a gamification system (XP, ranks, badges, Pomodoro timer) and real-time quiz logic using Socket.IO."
        ],
        techStack: "Python, Flask, Gemini API, Socket.IO, MySQL"
      },
      {
        title: "TestVerse v3.1 — Enterprise SaaS Testing Platform",
        subtitle: "FastAPI & Playwright Automation",
        type: "project",
        liveUrl: "https://testverse-frontend.vercel.app",
        githubUrl: "https://github.com/DakshBhavsar007/TestVerse-frontend",
        points: [
          "Built a Python/FastAPI backend for a multi-tenant SaaS testing platform with an AI-powered test suggestion engine.",
          "Implemented Playwright-based browser automation and MongoDB data models for scalable test execution."
        ],
        techStack: "Python, FastAPI, MongoDB, Playwright"
      },
      {
        title: "SevaSetu — NGO Volunteer Coordination Platform",
        subtitle: "Python/FastAPI NLP Pipeline",
        type: "project",
        liveUrl: "https://sevasetu-landing.onrender.com",
        githubUrl: "https://github.com/DakshBhavsar007/SevaSetu",
        points: [
          "Built a Python/FastAPI backend with a weighted smart-matching algorithm (distance, skills, availability) to auto-assign volunteers to community needs.",
          "Integrated Gemini API for NLP-based need categorization/urgency scoring and a Tesseract.js OCR pipeline for digitizing paper-based field surveys."
        ],
        techStack: "Python, FastAPI, Gemini API, MongoDB/SQLite (Turso)"
      }
    ],
    certifications: ["View all certifications on LinkedIn/GitHub"],
    languages: ["English (Fluent)"]
  }
];
