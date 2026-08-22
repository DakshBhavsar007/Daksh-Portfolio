import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LogoStrip } from './components/LogoStrip';
import { About } from './components/About';
import { Services } from './components/Services';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Testimonial } from './components/Testimonial';
import { ContactCTA } from './components/ContactCTA';

// Modals
import { ProjectModal } from './components/ProjectModal';
import { ServiceModal } from './components/ServiceModal';
import { VideoModal } from './components/VideoModal';
import { QuickHireModal } from './components/QuickHireModal';

import { Project, ServiceItem } from './types';
import { ArrowUp } from 'lucide-react';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isQuickHireOpen, setIsQuickHireOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  const handleOpenContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreWork = () => {
    const projectsEl = document.getElementById('projects') || document.getElementById('portfolio');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
  };

  const handleInquireFromService = (serviceName: string) => {
    setPreselectedService(serviceName);
    setIsQuickHireOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans antialiased relative selection:bg-[#111111] selection:text-white">
      {/* Sticky Navigation */}
      <Navbar
        onOpenContact={handleOpenContact}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onExploreWork={handleExploreWork}
          onOpenContact={() => setIsQuickHireOpen(true)}
        />

        {/* Client & Partner Pill Strip */}
        <LogoStrip />

        {/* About Me Section with Video Play Trigger & Giant Statistics */}
        <About
          onOpenVideo={() => setIsVideoOpen(true)}
        />

        {/* Services & Capabilities Section with Featured Dark Card */}
        <Services
          onSelectService={handleSelectService}
          onOpenContact={() => setIsQuickHireOpen(true)}
        />

        {/* Yearly Growth & Experience Timeline Section */}
        <Experience />

        {/* Selected Portfolio / Projects Gallery with Case Study Previews */}
        <Projects
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Testimonial Section with Editorial Typography */}
        <Testimonial />

        {/* Dark Contact & Footer Section */}
        <ContactCTA
          onOpenQuickHire={() => setIsQuickHireOpen(true)}
        />
      </main>

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onInquire={handleInquireFromService}
      />

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

      <QuickHireModal
        isOpen={isQuickHireOpen}
        onClose={() => {
          setIsQuickHireOpen(false);
          setPreselectedService(undefined);
        }}
        preselectedService={preselectedService}
      />
    </div>
  );
}
