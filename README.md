# 🚀 Daksh Bhavsar — Developer Portfolio & Systems Showcase

[![Live Portfolio](https://img.shields.io/badge/Live_Portfolio-daksh--portfolio--beta.vercel.app-7C3AED?style=for-the-badge&logo=vercel&logoColor=white)](https://daksh-portfolio-beta.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-DakshBhavsar007-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DakshBhavsar007)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Daksh_Bhavsar-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/daksh-bhavsar-96b102339/)
[![Email](https://img.shields.io/badge/Email-dakshbhavsar3699@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:dakshbhavsar3699@gmail.com)

Welcome to the open-source repository powering my personal developer portfolio and systems engineering showcase. Built with **React 19**, **TypeScript**, **Vite**, and **TailwindCSS**, designed with a clean, high-performance UI and an interactive multi-role ATS resume engine.

---

## 🌟 Featured Engineering Projects

| Project | Highlights & Architecture | Links |
| :--- | :--- | :---: |
| **Between-GitOps** | • Lightweight **k3s Kubernetes** cluster on AWS EC2 (Ubuntu 24.04)<br>• **ArgoCD** declarative GitOps auto-syncing Kustomize overlays<br>• **GitHub Actions** CI building multi-stage Docker images to **GHCR**<br>• **Traefik** ingress with automated Let's Encrypt TLS (HTTP-01)<br>• Isolated **AWS RDS PostgreSQL 15** in private subnets | [Live Site](https://between.dakshaws.sryze.cc) • [GitHub](https://github.com/DakshBhavsar007/Between-GitOPS) |
| **Resume RAG Search Engine** | • Production semantic retrieval platform with **FastAPI** & **LangChain LCEL**<br>• Section-aware regex chunking & 3,072-d **pgvector** cosine search (`<=>`)<br>• Enforced strict `[resume_id]` citation constraints with Gemini 2.5 Flash<br>• Dockerized on **AWS EC2** behind Nginx reverse proxy with Route 53 DNS & SSL | [Live API Docs](https://rag.dakshaws.sryze.cc/docs) • [GitHub](https://github.com/DakshBhavsar007/Resume-RAG-Search) |
| **Between** | • AI-Powered Recruitment Platform with 12+ specialized agents<br>• Multi-provider LLM failover rotation (**Gemini + Groq**)<br>• Asynchronous parsing and ATS scoring via **Celery & Redis** | [Live Platform](https://between.indevs.in) • [GitHub](https://github.com/DakshBhavsar007/Between) |
| **SevaSetu** | • NGO Volunteer Coordination Platform with real-time crisis dispatch<br>• Interactive 3D disaster mapping using **Mapbox GL JS** | [Live App](https://sevasetu-landing.onrender.com) • [GitHub](https://github.com/DakshBhavsar007/SevaSetu) |
| **StudyVerse** | • Collaborative academic hub featuring peer study spaces & resources | [Live App](https://study-verse-final.vercel.app/) • [GitHub](https://github.com/DakshBhavsar007/StudyVerse_Final) |
| **TestVerse** | • Automated testing and developer code validation suite | [GitHub](https://github.com/DakshBhavsar007/TESTVERSE) |

---

## ⚡ Interactive ATS Resume Engine

A key feature of this portfolio is its built-in, multi-role ATS resume generator. Visitors, recruiters, and hiring managers can:
- **Switch between 6 specialized profiles**:
  1. `AI Engineering Intern Candidate | Python & GenAI Developer` *(Featured)*
  2. `Full-Stack Developer | AI Enthusiast`
  3. `DevOps & Cloud Engineer`
  4. `Backend Developer`
  5. `Frontend Developer`
  6. `Python Developer`
- **Instant Clean Copy**: Copy plain-text ATS-formatted resume to clipboard.
- **One-Click Print & PDF**: Open cleanly styled, media-query print layout formatted for standard A4 pages.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: React 19, TypeScript, Vite
- **Styling**: TailwindCSS, CSS Variables, Glassmorphism, Micro-animations
- **Icons**: Lucide React
- **Deployment**: Vercel CI/CD Edge Network

---

## 💻 Local Development

Clone the repository and run the local development server:

```bash
# Clone the repository
git clone https://github.com/DakshBhavsar007/Daksh-Portfolio.git

# Navigate to the directory
cd Daksh-Portfolio

# Install dependencies
bun install   # or: npm install

# Start development server
bun run dev   # or: npm run dev
```

To create a production bundle:
```bash
bun run build # or: npm run build
```

---

## 📬 Contact & Connect

- **Portfolio**: [daksh-portfolio-beta.vercel.app](https://daksh-portfolio-beta.vercel.app/)
- **Email**: [dakshbhavsar3699@gmail.com](mailto:dakshbhavsar3699@gmail.com)
- **LinkedIn**: [linkedin.com/in/daksh-bhavsar-96b102339](https://www.linkedin.com/in/daksh-bhavsar-96b102339/)
- **GitHub**: [github.com/DakshBhavsar007](https://github.com/DakshBhavsar007)

---
*Crafted with precision by Bhavsar Daksh Narendrabhai.*
