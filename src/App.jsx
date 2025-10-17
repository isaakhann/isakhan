import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  NavLink,
  Outlet,
} from 'react-router-dom';
// NEW: Import the new CSS file
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
    sourceUrl: 'https://github.com/your-username/tarla-io-repo', // Placeholder
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
    sourceUrl: 'https://github.com/your-username/bilformation-repo', // Placeholder
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
    sourceUrl: 'https://github.com/your-username/kardinero-repo', // Placeholder
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
const LINKEDIN_URL = 'https://linkedin.com/in/isakhan1123';

// --- SVG ICONS (No changes here) ---
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
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
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

// --- HELPER COMPONENTS (No changes here) ---
const AnimatedSection = ({ children, className = '' }) => {
  return (
    <section className={`animated-section ${className}`}>{children}</section>
  );
};

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};

// --- LAYOUT COMPONENTS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo">
            Isa Ahmad Khan
          </Link>
        </div>
        <div className="navbar-menu-desktop">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            About
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/skills"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Skills
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Contact
          </NavLink>
        </div>
        <div className="navbar-menu-mobile-toggle">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-button"
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
      </div>
      <div className={`navbar-menu-mobile ${isOpen ? 'open' : ''}`}>
        <NavLink
          to="/"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            isActive ? 'nav-link-mobile active' : 'nav-link-mobile'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            isActive ? 'nav-link-mobile active' : 'nav-link-mobile'
          }
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            isActive ? 'nav-link-mobile active' : 'nav-link-mobile'
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/skills"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            isActive ? 'nav-link-mobile active' : 'nav-link-mobile'
          }
        >
          Skills
        </NavLink>
        <NavLink
          to="/contact"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            isActive ? 'nav-link-mobile active' : 'nav-link-mobile'
          }
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
};

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
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
};

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <p>
        &copy; {new Date().getFullYear()} Isa Ahmad Khan. All Rights Reserved.
      </p>
    </div>
  </footer>
);

const AppLayout = () => (
  <div className="app-layout">
    <div className="background-gradient"></div>
    <Navbar />
    <main className="main-content">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// --- PAGES ---

const Home = () => (
  <div className="home-hero">
    <div className="home-hero-content">
      <h1 className="home-hero-title">Isa Ahmad Khan</h1>
      <p className="home-hero-subtitle">
        A Software Engineer building data-driven web and desktop applications.
      </p>
      <div className="home-hero-actions">
        <Link to="/projects" className="button button-primary">
          View My Work
        </Link>
        <Link to="/contact" className="button button-secondary">
          Get In Touch
        </Link>
      </div>
      <div className="home-hero-socials">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <GithubIcon />
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <LinkedinIcon />
        </a>
      </div>
    </div>
  </div>
);

const About = () => (
  <AnimatedSection>
    <div className="page-container">
      <h2 className="page-title">About Me</h2>
      <div className="about-content">
        <div className="about-image-container">
          <img
            src="https://placehold.co/400x400/0f172a/94a3b8?text=Isa"
            alt="Isa Ahmad Khan"
            className="about-image"
          />
        </div>
        <div className="about-text">
          <p>
            Hello! I'm Isa Ahmad Khan, a Software Engineering student at İhsan
            Doğramacı Bilkent University in Ankara. I am passionate about
            leveraging technology to build tangible solutions, from complex data
            visualization platforms to intuitive desktop applications.
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
  </AnimatedSection>
);

const Projects = () => (
  <AnimatedSection>
    <div className="page-container-large">
      <h2 className="page-title">My Work</h2>
      <div className="projects-grid">
        {projectData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  </AnimatedSection>
);

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projectData.find((p) => p.id === projectId);

  if (!project) {
    return (
      <AnimatedSection>
        <div className="page-container text-center">
          <h2 className="page-title">Project not found.</h2>
          <Link to="/projects" className="back-link">
            &larr; Back to Projects
          </Link>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection>
      <ScrollToTop />
      <div className="page-container">
        <Link to="/projects" className="back-link">
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
    </AnimatedSection>
  );
};

const Skills = () => (
  <AnimatedSection>
    <div className="page-container">
      <h2 className="page-title">My Toolkit</h2>
      <div className="skills-container">
        <div className="skills-category">
          <h3 className="skills-subtitle">Technical Skills</h3>
          <div className="skills-list">
            {skillsData.technical.map((skill) => (
              <span key={skill} className="skill-tag-tech">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="skills-category">
          <h3 className="skills-subtitle">Soft Skills</h3>
          <div className="skills-list">
            {skillsData.soft.map((skill) => (
              <span key={skill} className="skill-tag-soft">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="skills-category">
          <h3 className="skills-subtitle">Languages</h3>
          <div className="skills-list">
            {skillsData.languages.map((skill) => (
              <span key={skill} className="skill-tag-soft">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </AnimatedSection>
);

const Contact = () => {
  // Formspree form ID from Vite env (see .env.example)
  const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || '';
  const [status, setStatus] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');
    setError('');
    setIsSending(true);
    try {
      if (!FORMSPREE_ID) {
        throw new Error(
          'Missing VITE_FORMSPREE_ID. Add it to your .env (see README).'
        );
      }
      const form = e.currentTarget;
      const formData = new FormData(form);
      // Optional: add a timestamp or metadata
      formData.append('sentAt', new Date().toISOString());

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
        const msg =
          (data && (data.error || (data.errors && data.errors[0]?.message))) ||
          'Something went wrong. Please try again.';
        throw new Error(msg);
      }
    } catch (err) {
      setError(err.message || 'Failed to send.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatedSection>
      <div className="page-container-small">
        <h2 className="page-title">Get In Touch</h2>
        <p className="contact-subtitle">
          I'm always open to discussing new projects, creative ideas, or
          opportunities.
        </p>

        <form onSubmit={handleSubmit} className="contact-form">
          {/* Honeypot field to deter bots */}
          <input
            type="text"
            name="_gotcha"
            className="sr-only"
            tabIndex="-1"
            autoComplete="off"
          />

          {/* Status messages */}
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
    </AnimatedSection>
  );
};

// --- Main App Component ---
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<ProjectDetail />} />
          <Route path="skills" element={<Skills />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
