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

// --- DATA ---
const projectData = [
  {
    id: 'tarla-io',
    title: 'Tarla.io',
    subtitle: 'Predictive Energy Platform',
    shortDescription:
      'A web app using React and FastAPI to visualize and predict energy output from renewable farms across Turkey.',
    tags: ['ReactJS', 'FastAPI', 'Mapbox', 'Python', 'Data Science'],
    imageUrl: 'https://placehold.co/600x400/0f172a/94a3b8?text=Tarla.io',
    role: 'Software Engineering Intern',
    timeline: 'June 2025 – Present',
    challenge:
      'To create a web platform for visualizing all solar and wind farms in Turkey and providing predictive analytics on their energy output based on dynamic environmental data.',
    solution: [
      'Built a highly interactive map interface with ReactJS and Mapbox to pinpoint the exact location of every farm.',
      'Developed a Python algorithm in the FastAPI backend to predict energy generation using metrics like wind speed and UV index.',
      'Integrated satellite data to display real-time wind patterns, humidity, and temperature for any location.',
      'Implemented a critical safety feature to track cloud-to-cloud and cloud-to-ground lightning within a specific radius of a wind farm.',
    ],
    liveUrl: 'https://tarla.io',
    sourceUrl: 'https://github.com/isaakhann/MapboxProject',
    isFeatured: true,
    accentColor: '#f59e0b',
  },
  {
    id: 'redflag',
    title: 'Redflagger',
    subtitle: 'AI-Powered Social Media Analysis',
    shortDescription:
      'A cross-platform social media analysis tool that uses NLP and Computer Vision pipelines to detect inappropriate content on Twitter, Reddit, and Instagram',
    tags: ['ReactJS', 'FastAPI', 'Python', 'NextJS', 'NLP', 'Computer Vision', 'Data Science'],
    imageUrl: 'https://placehold.co/600x400/0f172a/94a3b8?text=RedFlagger',
    role: 'Group Project',
    timeline: 'September 2025 – Present',
    challenge:
      'Manual social media screening is time-consuming, prone to human bias, and often fails to catch subtle behavioral risks hidden in years of digital history.',
    solution: [
      'An AI-powered risk analysis engine that uses advanced Natural Language Processing (NLP) to instantly scan cross-platform data, providing objective, context-aware safety scores and automated transparency reports.',
    ],
    liveUrl: 'https://redflagger-c36d3.web.app/',
    sourceUrl: 'https://github.com/isaakhann/Redflagger',
    isFeatured: true,
    accentColor: '#f59e0b',
  },
  {
    id: 'bilformation',
    title: 'Bilformation',
    subtitle: 'Smart Scheduling System',
    shortDescription:
      'A custom web portal for Bilkent University that uses a smart scheduling system to manage booking requests intelligently.',
    tags: ['ReactJS', 'Python', 'FastAPI'],
    imageUrl: 'https://placehold.co/600x400/0f172a/94a3b8?text=Bilformation',
    role: 'Group Project',
    timeline: '2024',
    challenge:
      "Bilkent University's information office needed an efficient way to manage booking requests from high school counsellors and prioritize them effectively.",
    solution: [
      'Built a full-stack application with a ReactJS frontend for counsellors and university officials.',
      'The system allows officials to accept/reject booking requests seamlessly through a dedicated admin dashboard.',
      'Implemented a smart scheduling system that prioritizes requests based on historical student data from different high schools.',
    ],
    liveUrl: '#',
    sourceUrl: 'https://github.com/isaakhann/bilformation',
    isFeatured: true,
    accentColor: '#60a5fa',
  },
  {
    id: 'kardinero',
    title: 'Kardinero Medikal',
    subtitle: 'macOS ECG Application',
    shortDescription:
      'A native macOS application to read, decode, and visualize patient ECG files for clinical analysis.',
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
    sourceUrl: 'https://github.com/isaakhann/Kardinero_App',
    isFeatured: true,
    accentColor: '#34d399',
  },
  {
    id: 'hospital-management',
    title: 'Hospital Management System',
    subtitle: 'Algorithmic Patient Scheduling',
    shortDescription:
      'A C++ application using Heaps to efficiently match patients with doctors, minimizing wait times.',
    tags: ['C++', 'Data Structures', 'Algorithms'],
    imageUrl: 'https://placehold.co/600x400/0f172a/94a3b8?text=Hospital+System',
    isFeatured: false,
    accentColor: '#f472b6',
  },
  {
    id: 'pet-sphere',
    title: 'PetSphere',
    subtitle: 'Java Pet Adoption App',
    shortDescription:
      'A JavaFX application for pet adoption, connecting users with animal shelters in an intuitive desktop interface.',
    tags: ['Java', 'JavaFX', 'Desktop App'],
    imageUrl: 'https://placehold.co/600x400/0f172a/94a3b8?text=PetSphere',
    isFeatured: false,
    accentColor: '#a78bfa',
  },
  {
    id: 'space-invaders',
    title: 'Space Invaders',
    subtitle: 'Java Game Development',
    shortDescription:
      'A fully playable Space Invaders clone built with the LibGDX framework in Java as a team project.',
    tags: ['Java', 'LibGDX', 'Game Dev'],
    imageUrl: 'https://placehold.co/600x400/0f172a/94a3b8?text=Space+Invaders',
    isFeatured: false,
    accentColor: '#fb923c',
  },
  {
    id: 'HelpAi',
    title: 'HelpAi',
    subtitle: 'AI-powered Helping system',
    shortDescription:
      'An AI assistant that analyzes real-time on-screen content and meeting conversations, integrating open-source LLMs via API to generate contextual responses',
    tags: ['ReactJS', 'FastAPI', 'Python', 'Data Science'],
    imageUrl: 'https://placehold.co/600x400/0f172a/94a3b8?text=HelpAi',
    role: 'Group Project',
    timeline: 'September 2025 – Present',
    challenge:
      'Navigating high-pressure technical interviews or rapid-fire meetings makes it difficult to synthesize complex information, recall specific documentation, and formulate structured responses in real-time.',
    solution: [
      'A low-latency AI assistant that utilizes Optical Character Recognition (OCR) and Speech-to-Text to monitor live on-screen content and audio, feeding data into open-source LLMs to provide instant, context-aware suggestions and technical references.',
    ],

    isFeatured: true,
    accentColor: '#f59e0b',
  },
  {
    id: 'chord-craft',
    title: 'ChordCraft',
    subtitle: 'AI Music Composition Tool',
    shortDescription:
      'A browser-based tool that uses algorithmic composition to suggest chord progressions and melodies based on a chosen mood and key.',
    tags: ['JavaScript', 'Web Audio API', 'Algorithms', 'CSS'],
    imageUrl: 'https://placehold.co/600x400/0f172a/94a3b8?text=ChordCraft',
    role: 'Personal Project',
    timeline: 'Early 2025',
    challenge:
      'Inspired by my interest in music, I wanted to build a tool that lowers the barrier to music composition — letting anyone experiment with harmony without needing music theory knowledge.',
    solution: [
      'Built an interactive piano roll UI using vanilla JavaScript and the Web Audio API for real-time audio synthesis.',
      'Implemented chord generation logic based on music theory rules (diatonic harmony, voice leading) to suggest progressions.',
      'Added a mood-selector that maps emotional states to musical characteristics like tempo, mode, and dynamics.',
      'Exported compositions as MIDI files for use in production software.',
    ],
    liveUrl: '#',
    sourceUrl: 'https://github.com/isaakhann',
    isFeatured: false,
    accentColor: '#38bdf8',
  },
  {
    id: 'lens-log',
    title: 'LensLog',
    subtitle: 'Photography Portfolio & EXIF Tracker',
    shortDescription:
      'A personal photography showcase that automatically reads EXIF data from uploaded images to catalogue camera settings, locations, and timestamps.',
    tags: ['Python', 'ReactJS', 'FastAPI', 'Photography'],
    imageUrl: 'https://placehold.co/600x400/0f172a/94a3b8?text=LensLog',
    role: 'Personal Project',
    timeline: 'Winter 2024',
    challenge:
      'As a hobbyist photographer, I wanted a personal space to showcase my work that also served as a technical diary — logging the camera settings behind every shot.',
    solution: [
      'Built a FastAPI backend to parse raw image EXIF metadata (aperture, shutter speed, ISO, GPS) on upload.',
      'Developed a ReactJS gallery frontend with masonry layout and lightbox for an immersive viewing experience.',
      'Integrated a map view using Mapbox to visualize where each photo was taken geographically.',
      'Added filtering by lens, camera body, and shooting conditions.',
    ],
    liveUrl: '#',
    sourceUrl: 'https://github.com/isaakhann',
    isFeatured: false,
    accentColor: '#e879f9',
  },
];

const skillsData = {
  technical: [
    { name: 'Java', level: 90 },
    { name: 'C / C++', level: 85 },
    { name: 'Python', level: 88 },
    { name: 'C# / .NET', level: 75 },
    { name: 'Swift', level: 65 },
    { name: 'JavaScript', level: 85 },
    { name: 'ReactJS', level: 88 },
    { name: 'FastAPI', level: 82 },
    { name: 'HTML & CSS', level: 90 },
    { name: 'Mapbox', level: 70 },
    { name: 'Figma', level: 72 },
    { name: 'Arduino', level: 60 },
    { name: 'Verilog', level: 55 },
    { name: 'GitHub', level: 90 },
  ],
  soft: ['Problem-solving', 'Team Oriented', 'Outspoken', 'Collaborative', 'Creative'],
  languages: ['English (C1)', 'Turkish (B2)', 'Urdu (Native)', 'Kashmiri (Native)', 'Hindi (Native)'],
};

const GITHUB_URL = 'https://github.com/isaakhann';
const LINKEDIN_URL = 'https://linkedin.com/in/isa-khan1123';

// --- ICONS ---
const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-3"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const ExternalLinkIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const ArrowRight = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);

// --- HELPERS ---
const ScrollToTop = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return null;
};

const useInView = (options = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.1, ...options });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
};

const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="scroll-progress-container">
      <div className="scroll-progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
};

// --- NAVBAR ---
const Navbar = ({ isSinglePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isSinglePage) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && setActiveSection(e.target.id)),
      { rootMargin: '-30% 0px -70% 0px' }
    );
    document.querySelectorAll('.page-section').forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, [isSinglePage]);

  const navLinks = [
    { id: 'home', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'projects', title: 'Projects' },
    { id: 'skills', title: 'Skills' },
    { id: 'contact', title: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => window.scrollTo(0, 0)}>
          <span className="logo-bracket">&lt;</span>
          IAK
          <span className="logo-bracket">/&gt;</span>
        </Link>
        {isSinglePage && (
          <>
            <div className="navbar-menu-desktop">
              {navLinks.map(({ id, title }) => (
                <a key={id} href={`#${id}`} className={`nav-link ${activeSection === id ? 'active' : ''}`}>
                  {title}
                </a>
              ))}
            </div>
            <button className="mobile-menu-button" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              <span className={`burger ${isOpen ? 'open' : ''}`} />
            </button>
          </>
        )}
      </div>
      {isSinglePage && (
        <div className={`navbar-menu-mobile ${isOpen ? 'open' : ''}`}>
          {navLinks.map(({ id, title }) => (
            <a key={id} href={`#${id}`} className={`nav-link-mobile ${activeSection === id ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
              {title}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

// --- HERO ---
const HomeSection = () => {
  const roles = ['Software Engineer', 'Full-Stack Developer', 'CS Student at Bilkent', 'Music Maker'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setRoleIndex(i => (i + 1) % roles.length);
        setFade(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="home-hero page-section">
      <div className="hero-bg-grid" />
      <div className="hero-glow" />
      <div className="home-hero-content">
        <div className="hero-eyebrow">
          <span className="eyebrow-dot" />
          Available for opportunities
        </div>
        <h1 className="home-hero-title">
          Isa Ahmad<br />
          <span className="title-highlight">Khan</span>
        </h1>
        <p className="home-hero-role">
          <span className={`role-text ${fade ? 'fade-in' : 'fade-out'}`}>{roles[roleIndex]}</span>
        </p>
        <p className="home-hero-subtitle">
          Building data-driven web & desktop applications that solve real-world problems.
        </p>
        <div className="home-hero-actions">
          <a href="#projects" className="button button-primary">
            View My Work <ArrowRight />
          </a>
          <a href="#contact" className="button button-ghost">
            Get In Touch
          </a>
        </div>
        <div className="home-hero-socials">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
            <LinkedinIcon />
          </a>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span>scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
};

// --- ABOUT ---
const AboutSection = () => {
  const [ref, inView] = useInView();
  const stats = [
    { value: '3+', label: 'Years Coding' },
    { value: '10+', label: 'Projects Built' },
    { value: '2', label: 'Internships' },
    { value: '5', label: 'Languages' },
  ];
  return (
    <section id="about" className="page-section" ref={ref}>
      <div className={`page-container about-wrapper ${inView ? 'animate-in' : ''}`}>
        <div className="section-label">Who I Am</div>
        <h2 className="page-title">About Me</h2>
        <div className="about-content">
          <div className="about-image-side">
            <div className="about-image-frame">
              <img src={profilePic} alt="Isa Ahmad Khan" className="about-image" />
              <div className="image-frame-border" />
            </div>
            <div className="stats-row">
              {stats.map(({ value, label }) => (
                <div key={label} className="stat-item">
                  <span className="stat-value">{value}</span>
                  <span className="stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-text">
            <p>
              Hello! I'm <strong>Isa Ahmad Khan</strong>, a Software Engineering student at Bilkent
              University in Ankara. I'm driven by a simple belief: good software should solve real problems elegantly.
            </p>
            <p>
              At <strong>Tarla.io</strong>, I'm building a platform to visualize and predict energy output
              for every solar and wind farm in Turkey. Before that, at <strong>Kardinero Medikal</strong>,
              I engineered a native macOS tool to decode and render patient ECG data for clinical use.
            </p>
            <p>
              Beyond code, I served as <strong>Vice President of Bilkent International House</strong>,
              organizing the university's largest cultural event. When I step away from the screen, I'm
              composing music, on the slopes, or behind a camera lens.
            </p>
            <div className="about-cta">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="button button-ghost">
                <GithubIcon size={18} /> View GitHub
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="button button-ghost">
                <LinkedinIcon size={18} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- PROJECT CARD ---
const ProjectCard = ({ project, index }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`project-card ${inView ? 'card-visible' : ''}`}
      style={{ '--accent': project.accentColor || '#f59e0b', transitionDelay: `${(index % 3) * 80}ms` }}
    >
      <div className="project-card-image-wrapper">
        <img className="project-card-image" src={project.imageUrl} alt={project.title} />
        <div className="project-card-overlay" />
        <div className="project-card-number">0{index + 1}</div>
      </div>
      <div className="project-card-content">
        <div className="project-card-header">
          <div>
            <p className="project-card-subtitle">{project.subtitle}</p>
            <h3 className="project-card-title">{project.title}</h3>
          </div>
        </div>
        <p className="project-card-description">{project.shortDescription}</p>
        <div className="project-card-tags">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="project-card-tag">{tag}</span>
          ))}
        </div>
        <Link to={`/projects/${project.id}`} className="project-card-link">
          View Case Study <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

// --- PROJECTS SECTION ---
const ProjectsSection = () => {
  const [filter, setFilter] = useState('All');
  const [ref, inView] = useInView();
  const filters = ['All', 'Featured', 'Web', 'Desktop', 'Game Dev'];

  const filtered = projectData.filter(p => {
    if (filter === 'All') return true;
    if (filter === 'Featured') return p.isFeatured;
    if (filter === 'Web') return p.tags.some(t => ['ReactJS', 'FastAPI', 'JavaScript', 'HTML'].includes(t));
    if (filter === 'Desktop') return p.tags.some(t => ['Desktop App', '.NET C#', 'Swift', 'Java'].includes(t));
    if (filter === 'Game Dev') return p.tags.includes('Game Dev');
    return true;
  });

  return (
    <section id="projects" className="page-section" ref={ref}>
      <div className={`page-container-large ${inView ? 'animate-in' : ''}`}>
        <div className="section-label">What I've Built</div>
        <h2 className="page-title">My Work</h2>
        <div className="project-filters">
          {filters.map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {filtered.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- SKILLS ---
const SkillBar = ({ name, level, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div className="skill-bar-item" ref={ref}>
      <div className="skill-bar-header">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-level">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ width: inView ? `${level}%` : '0%', transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const [ref, inView] = useInView();
  return (
    <section id="skills" className="page-section" ref={ref}>
      <div className={`page-container ${inView ? 'animate-in' : ''}`}>
        <div className="section-label">Capabilities</div>
        <h2 className="page-title">My Toolkit</h2>
        <div className="skills-layout">
          <div className="skills-bars-col">
            <h3 className="skills-col-title">Technical Skills</h3>
            {skillsData.technical.map(({ name, level }, i) => (
              <SkillBar key={name} name={name} level={level} delay={i * 60} />
            ))}
          </div>
          <div className="skills-right-col">
            <div className="skills-pill-group">
              <h3 className="skills-col-title">Soft Skills</h3>
              <div className="skills-pills">
                {skillsData.soft.map(skill => (
                  <span key={skill} className="skill-pill soft">{skill}</span>
                ))}
              </div>
            </div>
            <div className="skills-pill-group">
              <h3 className="skills-col-title">Languages</h3>
              <div className="skills-pills">
                {skillsData.languages.map(lang => (
                  <span key={lang} className="skill-pill lang">{lang}</span>
                ))}
              </div>
            </div>
            <div className="skills-callout">
              <p className="callout-heading">Always Learning</p>
              <p className="callout-body">
                Currently deepening my knowledge in machine learning, distributed systems, and mobile development with Swift.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- CONTACT ---
const ContactSection = () => {
  const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;
  const [status, setStatus] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [ref, inView] = useInView();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(''); setError(''); setIsSending(true);
    try {
      const form = e.currentTarget;
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' },
      });
      if (res.ok) { setStatus("Message sent! I'll get back to you soon."); form.reset(); }
      else throw new Error('Something went wrong. Please try again.');
    } catch (err) {
      setError(err.message || 'Failed to send.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="page-section contact-section" ref={ref}>
      <div className={`page-container-small ${inView ? 'animate-in' : ''}`}>
        <div className="section-label">Say Hello</div>
        <h2 className="page-title">Get In Touch</h2>
        <p className="contact-subtitle">
          Have a project in mind, or just want to connect? My inbox is always open.
        </p>
        <div className="contact-card">
          <form onSubmit={handleSubmit} className="contact-form">
            <input type="text" name="_gotcha" className="sr-only" tabIndex="-1" autoComplete="off" />
            {status && <div className="form-feedback success">{status}</div>}
            {error && <div className="form-feedback error">{error}</div>}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" name="name" id="name" required className="form-input" placeholder="John Doe" />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" name="email" id="email" required className="form-input" placeholder="john@example.com" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea name="message" id="message" rows="5" required className="form-input" placeholder="Tell me about your project..."></textarea>
            </div>
            <button type="submit" className="button button-primary full-width" disabled={isSending}>
              {isSending ? 'Sending...' : 'Send Message'} {!isSending && <ArrowRight />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// --- FOOTER ---
const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-logo">
        <span className="logo-bracket">&lt;</span>IAK<span className="logo-bracket">/&gt;</span>
      </div>
      <div className="footer-socials">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon size={20} /></a>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon size={20} /></a>
      </div>
      <p className="footer-copy">&copy; {new Date().getFullYear()} Isa Ahmad Khan. Designed &amp; Built with care.</p>
    </div>
  </footer>
);

// --- PROJECT DETAIL PAGE ---
const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const project = projectData.find(p => p.id === projectId);
  const otherProjects = projectData.filter(p => p.id !== projectId).slice(0, 3);

  if (!project) return (
    <div className="page-section" style={{ textAlign: 'center' }}>
      <h2 className="page-title">Project not found.</h2>
      <Link to="/" className="back-link">&larr; Back to Home</Link>
    </div>
  );

  return (
    <>
      <Navbar isSinglePage={false} />
      <main className="main-content">
        <ScrollToTop />
        <div className="project-detail-hero" style={{ '--accent': project.accentColor || '#f59e0b' }}>
          <div className="page-container">
            <Link to="/#projects" className="back-link">&larr; All Projects</Link>
            <div className="project-detail-headline">
              <p className="project-detail-eyebrow">{project.subtitle}</p>
              <h1 className="project-detail-title">{project.title}</h1>
              <div className="project-detail-meta">
                {project.role && <span className="meta-badge">{project.role}</span>}
                {project.timeline && <span className="meta-badge">{project.timeline}</span>}
              </div>
            </div>
          </div>
        </div>
        <section className="page-section">
          <div className="page-container">
            <img
              src={project.imageUrl.replace('600x400', '1200x600')}
              alt={project.title}
              className="project-detail-image"
            />
            <div className="project-detail-layout">
              <div className="project-detail-main">
                {project.challenge && (
                  <div className="project-detail-section">
                    <h3 className="project-detail-subtitle">The Challenge</h3>
                    <p>{project.challenge}</p>
                  </div>
                )}
                {project.solution && (
                  <div className="project-detail-section">
                    <h3 className="project-detail-subtitle">My Solution</h3>
                    <ul className="solution-list">
                      {project.solution.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  </div>
                )}
              </div>
              <aside className="project-detail-sidebar">
                <div className="sidebar-box" style={{ '--accent': project.accentColor || '#f59e0b' }}>
                  <h4 className="sidebar-title">Tech Stack</h4>
                  <div className="project-card-tags">
                    {project.tags.map(tag => <span key={tag} className="project-card-tag">{tag}</span>)}
                  </div>
                  <div className="sidebar-links">
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="button button-primary full-width">
                        Live Demo <ExternalLinkIcon />
                      </a>
                    )}
                    {project.sourceUrl && project.sourceUrl !== '#' && (
                      <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="button button-ghost full-width">
                        Source Code <GithubIcon size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
        {otherProjects.length > 0 && (
          <section className="page-section more-projects-section">
            <div className="page-container">
              <h3 className="more-projects-title">More Projects</h3>
              <div className="more-projects-grid">
                {otherProjects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

// --- LAYOUT ---
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

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <ScrollProgressBar />
        <div className="background-gradient" />
        <Routes>
          <Route path="/" element={<SinglePageLayout />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
