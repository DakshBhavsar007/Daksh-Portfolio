export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  longDescription?: string;
  image: string;
  client?: string;
  year?: string;
  role?: string;
  challenge?: string;
  solution?: string;
  deliverables?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category?: string;
  isDark?: boolean;
  iconName?: string;
  deliverables?: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  description: string;
  period: string;
  location?: string;
  highlights?: string[];
  skills?: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  highlightQuote?: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export interface ClientLogo {
  name: string;
  slug: string;
  category?: string;
}

export interface StatItem {
  value: string;
  label: string;
  sublabel: string;
}
