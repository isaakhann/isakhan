import React, { useState, useEffect, useRef } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from 'react-router-dom';
import profilePic from './assets/profile.jpg';
import './App.css';
// --- DATA (No changes here) ---
const projectData = [
  {
    id: 'tarla-io',
    title: 'Tarla.io - Predictive Energy Platform',
    shortDescription:
      'A web app using React and FastAPI to visualize and predict energy output from renewable farms in Turkey.',
    tags: ['ReactJS', 'FastAPI', 'Mapbox', 'Python', 'Data Science'],
    imageUrl: 'https://placehold.co/600x400/0f172a/94a3b8?text=Tarla.io',
    role: 'Software Engineering Intern',
    timeline: 'June 2025 - Present',
    challenge:
      'To create a web platform for visualizing all solar and wind farms in Turkey and providing predictive analytics on their energy output based on dynamic environmental data.',
    solution: [
      'Built a highly interactive map interface with ReactJS and Mapbox to pinpoint the exact location of every farm.',
      'Developed a Python algorithm in the FastAPI backend to predict energy generation using metrics like wind speed and UV index.',
      'Integrated satellite data to display real-time wind patterns, humidity, and temperature for any location.',
      'Implemented a critical safety feature to track cloud-to-cloud and cloud-to-ground lightning within a specific radius of a wind farm.',
    ],
    liveUrl: 'https://tarla.io', // Placeholder
    sourceUrl: 'https://github.com/isaakhann/MapboxProject', // Placeholder
    isFeatured: true,
  },
  {
    id: 'bilformation',
    title: 'Bilformation - Smart Scheduling System',
    shortDescription:
      'A custom web portal for Bilkent University that uses a smart scheduling system to manage booking requests.',
    tags: ['ReactJS', 'Python', 'FastAPI'],
    imageUrl: 'https://placehold.co/600x400/0f172a/94a3b8?text=Bilformation',
    role: 'Personal Project',
    timeline: '2024',
    challenge:
      "Bilkent University's information office needed an efficient way to manage booking requests from high school counsellors and prioritize them effectively.",
    solution: [
      'Built a full-stack application with a ReactJS frontend for counsellors and university officials.',
      'The system allows officials to accept/reject booking requests seamlessly through a dedicated admin dashboard.',
      'The key feature is a "smart scheduling system" I implemented that prioritizes requests based on historical student data from different high schools.',
    ],
    liveUrl: '#',
    sourceUrl: 'https://github.com/CS319-24-FA/S3-T6-Bilformationn', // Placeholder
    isFeatured: true,
  },
  {
    id: 'kardinero',
    title: 'Kardinero Medikal - macOS ECG App',
    shortDescription:
      'A native macOS application to read, decode, and visualize patient ECG files for analysis.',
    tags: ['.NET C#', 'Swift', 'Python', 'Desktop App'],
    imageUrl: 'https://placehold.co/600x400/0f172a/94a3b8?text=ECG+App',
    role: 'Software Engineering Intern',
    timeline: 'Summer 2024',
    challenge:
      'The company needed a native macOS application to read proprietary, encoded patient data files (.ocp) and print the corresponding ECG waveforms for analysis.',
    solution: [
      'Created a desktop application for macOS using .NET C# and Swift for the user interface and core logic.',
      'Wrote Python scripts to read, parse, and understand the complex ECG file format, handling binary data and custom encoding.',
      'Developed features to render the ECG waveforms accurately on screen and assist in generating diagnoses based on the output.',
    ],
    liveUrl: null,
    sourceUrl: 'https://github.com/isaakhann/Kardinero_App', // Placeholder
    isFeatured: true,
  },
  {
    id: 'hospital-management',
    title: 'Hospital Management System',
    shortDescription:
      'A C++ application using Heaps to efficiently match patients with doctors, minimizing wait times.',
    tags: ['C++', 'Data Structures', 'Algorithms'],
    imageUrl: 'https://placehold.co/600x400/0f172a/94a3b8?text=Hospital+System',
    isFeatured: false,
  },
  {
    id: 'pet-sphere',
    title: 'PetSphere - Java Adoption App',
    shortDescription:
      'A JavaFX application for pet adoption, connecting users with animal shelters.',
    tags: ['Java', 'JavaFX', 'Desktop App'],
    imageUrl: 'https://placehold.co/600x400/0f172a/94a3b8?text=PetSphere',
    isFeatured: false,
  },
  {
    id: 'space-invaders',
    title: 'Space Invaders - Java Game',
    shortDescription:
      'A classic Space Invaders game built in a group using the LibGDX framework in Java.',
    tags: ['Java', 'LibGDX', 'Game Dev'],
    imageUrl: 'https://placehold.co/600x400/0f172a/94a3b8?text=Space+Invaders',
    isFeatured: false,
  },
];

const skillsData = {
  technical: [
    'Java',
    'C',
    'C++',
    'Python',
    'C#',
    '.NET',
    'Swift',
    'HTML',
    'CSS',
    'JavaScript',
    'ReactJS',
    'FastAPI',
    'Figma',
    'Arduino',
    'Verilog',
    'GitHub',
  ],
  soft: [
    'Problem-solving',
    'Team Oriented',
    'Outspoken',
    'Collaborative',
    'Creative',
  ],
  languages: [
    'English (C1)',
    'Turkish (B2)',
    'Urdu (Native)',
    'Kashmiri (Native)',
  ],
};

const GITHUB_URL = 'https://github.com/isaakhann';
const LINKEDIN_URL = 'https://linkedin.com/in/isa-khan1123';

// --- SVG ICONS (Updated for a more modern look) ---
const GithubIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-3"></path>
  </svg>
);
const LinkedinIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

// --- HELPER COMPONENTS ---
const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
};

// NEW: Scroll Progress Bar Component
const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const totalHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-progress-bar-container">
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </div>
  );
};

// --- LAYOUT COMPONENTS ---
const Navbar = ({ isSinglePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const sectionsRef = useRef({});

  useEffect(() => {
    if (!isSinglePage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );

    const sections = document.querySelectorAll('.page-section');
    sections.forEach((section) => {
      sectionsRef.current[section.id] = section;
      observer.observe(section);
    });

    return () => {
      Object.values(sectionsRef.current).forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [isSinglePage]);

  const navLinks = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'projects', title: 'Projects' },
    { id: 'skills', title: 'Skills' },
    { id: 'contact', title: 'Contact' },
  ];

  const NavItem = ({ id, title, isMobile = false }) => {
    const className = isMobile ? 'nav-link-mobile' : 'nav-link';
    const activeClassName = activeSection === id ? ' active' : '';

    return (
      <a
        href={`#${id}`}
        className={className + activeClassName}
        onClick={() => isMobile && setIsOpen(false)}
      >
        {title}
      </a>
    );
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-logo"
          onClick={() => window.scrollTo(0, 0)}
        >
          Isa Ahmad Khan
        </Link>
        {isSinglePage && (
          <>
            <div className="navbar-menu-desktop">
              {navLinks.map((link) => (
                <NavItem key={link.id} {...link} />
              ))}
            </div>
            <div className="navbar-menu-mobile-toggle">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="mobile-menu-button"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <svg
                    className="menu-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="menu-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </>
        )}
      </div>
      {isSinglePage && (
        <div className={`navbar-menu-mobile ${isOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <NavItem key={link.id} {...link} isMobile />
          ))}
        </div>
      )}
    </nav>
  );
};

const ProjectCard = ({ project, index }) => (
  <div className="project-card" style={{ animationDelay: `${index * 100}ms` }}>
    <img
      className="project-card-image"
      src={project.imageUrl}
      alt={project.title}
    />
    <div className="project-card-content">
      <h3 className="project-card-title">{project.title}</h3>
      <p className="project-card-description">{project.shortDescription}</p>
      <div className="project-card-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="project-card-tag">
            {tag}
          </span>
        ))}
      </div>
      <Link to={`/projects/${project.id}`} className="project-card-link">
        View Case Study <span>&rarr;</span>
      </Link>
    </div>
  </div>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <p>
        &copy; {new Date().getFullYear()} Isa Ahmad Khan. All Rights Reserved.
      </p>
    </div>
  </footer>
);

// --- PAGE SECTIONS ---

const HomeSection = () => (
  <section id="home" className="home-hero page-section">
    <div className="home-hero-content">
      <h1 className="home-hero-title">Isa Ahmad Khan</h1>
      <p className="home-hero-subtitle">
        A Software Engineer building data-driven web and desktop applications.
      </p>
      <div className="home-hero-actions">
        <a href="#projects" className="button button-primary">
          View My Work
        </a>
        <a href="#contact" className="button button-secondary">
          Get In Touch
        </a>
      </div>
      <div className="home-hero-socials">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="GitHub"
        >
          <GithubIcon />
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          aria-label="LinkedIn"
        >
          <LinkedinIcon />
        </a>
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section id="about" className="page-section">
    <div className="page-container">
      <h2 className="page-title">About Me</h2>
      <div className="about-content">
        <div className="about-image-container">
          <img src={profilePic} alt="Isa Ahmad Khan" className="about-image" />
        </div>
        <div className="about-text">
          <p>
            Hello! I'm Isa Ahmad Khan, a Software Engineering student at Bilkent
            University in Ankara. I am passionate about leveraging technology to
            build tangible solutions, from complex data visualization platforms
            to intuitive desktop applications.
          </p>
          <p>
            My experience spans both web and native development. At{' '}
            <strong>Tarla.io</strong>, I'm building a web application using
            ReactJS and FastAPI to pinpoint solar and wind farms and predict
            their energy output. Previously, at{' '}
            <strong>Kardinero Medikal</strong>, I developed a macOS application
            using .NET C# and Swift to visualize patient ECG data.
          </p>
          <p>
            Beyond coding, I believe in building strong communities. I served as
            the Vice President for the{' '}
            <strong>Bilkent International House</strong>, helping organize the
            university's largest cultural event. When I'm not at my computer,
            you can find me making music, skiing, or pursuing my interest in
            photography.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const ProjectsSection = () => (
  <section id="projects" className="page-section">
    <div className="page-container-large">
      <h2 className="page-title">My Work</h2>
      <div className="projects-grid">
        {projectData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  </section>
);

const SkillsSection = () => (
  <section id="skills" className="page-section">
    <div className="page-container">
      <h2 className="page-title">My Toolkit</h2>
      <div className="skills-container">
        <div className="skills-category">
          <h3 className="skills-subtitle">Technical Skills</h3>
          <div className="skills-list">
            {skillsData.technical.map((skill, i) => (
              <span
                key={skill}
                className="skill-tag-tech"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="skills-category">
          <h3 className="skills-subtitle">Soft Skills</h3>
          <div className="skills-list">
            {skillsData.soft.map((skill, i) => (
              <span
                key={skill}
                className="skill-tag-soft"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="skills-category">
          <h3 className="skills-subtitle">Languages</h3>
          <div className="skills-list">
            {skillsData.languages.map((skill, i) => (
              <span
                key={skill}
                className="skill-tag-soft"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ContactSection = () => {
  const FORMSPREE_ID = 'VITE_FORMSPREE_ID'; // Replace with your Formspree form ID
  const [status, setStatus] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setError('');
    setIsSending(true);
    try {
      if (FORMSPREE_ID === 'your-formspree-id') {
        throw new Error('Please replace "your-formspree-id" in the code.');
      }
      const form = e.currentTarget;
      const formData = new FormData(form);
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('Thanks! Your message has been sent.');
        form.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          (data && (data.error || (data.errors && data.errors[0]?.message))) ||
            'Something went wrong.'
        );
      }
    } catch (err) {
      setError(err.message || 'Failed to send.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="page-section">
      <div className="page-container-small">
        <h2 className="page-title">Get In Touch</h2>
        <p className="contact-subtitle">
          I'm always open to discussing new projects, creative ideas, or
          opportunities.
        </p>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="_gotcha"
            className="sr-only"
            tabIndex="-1"
            autoComplete="off"
          />
          <div className="form-status" aria-live="polite">
            {status && <span className="success-badge">{status}</span>}
          </div>
          <div className="form-status" aria-live="assertive">
            {error && <span className="error-badge">{error}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="4"
              required
              className="form-input"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="button button-primary full-width"
              disabled={isSending}
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

// --- PAGES & ROUTING ---

const SinglePageLayout = () => (
  <>
    <Navbar isSinglePage={true} />
    <main>
      <HomeSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
    <Footer />
  </>
);

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const project = projectData.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="page-section">
        <div className="page-container" style={{ textAlign: 'center' }}>
          <h2 className="page-title">Project not found.</h2>
          <Link to="/" className="back-link">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar isSinglePage={false} />
      <main className="main-content">
        <section className="page-section">
          <ScrollToTop />
          <div className="page-container">
            <Link to="/#projects" className="back-link">
              &larr; Back to All Projects
            </Link>
            <h2 className="project-detail-title">{project.title}</h2>
            <div className="project-detail-meta">
              <span>{project.role}</span>
              <span className="separator">|</span>
              <span>{project.timeline}</span>
            </div>
            <img
              src={project.imageUrl.replace('600x400', '1200x600')}
              alt={project.title}
              className="project-detail-image"
            />
            <div className="project-detail-layout">
              <div className="project-detail-main">
                <div className="project-detail-section">
                  <h3 className="project-detail-subtitle">The Challenge</h3>
                  <p>{project.challenge}</p>
                </div>
                <div className="project-detail-section">
                  <h3 className="project-detail-subtitle">My Solution</h3>
                  {project.solution && (
                    <ul className="solution-list">
                      {project.solution.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <aside className="project-detail-sidebar">
                <div className="sidebar-box">
                  <h4 className="sidebar-title">Technology Stack</h4>
                  <div className="project-card-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="sidebar-links">
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button-primary full-width"
                      >
                        Live Demo <ExternalLinkIcon />
                      </a>
                    )}
                    {project.sourceUrl && project.sourceUrl !== '#' && (
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button-secondary full-width"
                      >
                        Source Code <GithubIcon />
                      </a>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <ScrollProgressBar />
        <div className="background-gradient"></div>
        <Routes>
          <Route path="/" element={<SinglePageLayout />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
