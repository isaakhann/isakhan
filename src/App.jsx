import React, { useState, useEffect, useRef, Suspense } from 'react';
import {
  BrowserRouter, Routes, Route, Link, useParams,
} from 'react-router-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import profilePic from './assets/profile.jpg';
import './App.css';

// --- DATA ---
const projectData = [
  {
    id: 'tarla-io',
    title: 'Tarla.io',
    subtitle: 'Predictive Energy Platform',
    shortDescription: 'A web app using React and FastAPI to visualize and predict energy output from renewable farms across Turkey.',
    tags: ['ReactJS', 'FastAPI', 'Mapbox', 'Python', 'Data Science'],
    imageUrl: 'https://placehold.co/600x400/0a0a0a/C8FF00?text=TARLA.IO',
    role: 'Software Engineering Intern',
    timeline: 'June 2025 – Present',
    challenge: 'To create a web platform for visualizing all solar and wind farms in Turkey and providing predictive analytics on their energy output based on dynamic environmental data.',
    solution: [
      'Built a highly interactive map interface with ReactJS and Mapbox to pinpoint the exact location of every farm.',
      'Developed a Python algorithm in the FastAPI backend to predict energy generation using metrics like wind speed and UV index.',
      'Integrated satellite data to display real-time wind patterns, humidity, and temperature for any location.',
      'Implemented a critical safety feature to track cloud-to-cloud and cloud-to-ground lightning within a specific radius of a wind farm.',
    ],
    liveUrl: 'https://tarla.io',
    sourceUrl: 'https://github.com/isaakhann/MapboxProject',
    isFeatured: true,
    index: '01',
  },
  {
    id: 'redflag',
    title: 'Redflagger',
    subtitle: 'AI-Powered Social Analysis',
    shortDescription: 'A cross-platform social media analysis tool using NLP and Computer Vision pipelines to detect inappropriate content on Twitter, Reddit, and Instagram.',
    tags: ['ReactJS', 'FastAPI', 'Python', 'NextJS', 'NLP', 'Computer Vision'],
    imageUrl: 'https://placehold.co/600x400/0a0a0a/C8FF00?text=REDFLAGGER',
    role: 'Group Project',
    timeline: 'September 2025 – Present',
    challenge: 'Manual social media screening is time-consuming, prone to human bias, and often fails to catch subtle behavioral risks hidden in years of digital history.',
    solution: [
      'An AI-powered risk analysis engine using advanced NLP to instantly scan cross-platform data, providing objective, context-aware safety scores and automated transparency reports.',
    ],
    liveUrl: 'https://redflagger-c36d3.web.app/',
    sourceUrl: 'https://github.com/isaakhann/Redflagger',
    isFeatured: true,
    index: '02',
  },
  {
    id: 'bilformation',
    title: 'Bilformation',
    subtitle: 'Smart Scheduling System',
    shortDescription: 'A custom web portal for Bilkent University using a smart scheduling system to manage booking requests intelligently.',
    tags: ['ReactJS', 'Python', 'FastAPI'],
    imageUrl: 'https://placehold.co/600x400/0a0a0a/C8FF00?text=BILFORMATION',
    role: 'Group Project',
    timeline: '2024',
    challenge: "Bilkent University's information office needed an efficient way to manage booking requests from high school counsellors and prioritize them effectively.",
    solution: [
      'Built a full-stack application with a ReactJS frontend for counsellors and university officials.',
      'Allows officials to accept/reject booking requests through a dedicated admin dashboard.',
      'Implemented a smart scheduling system prioritizing requests based on historical student data.',
    ],
    liveUrl: '#',
    sourceUrl: 'https://github.com/isaakhann/bilformation',
    isFeatured: true,
    index: '03',
  },
  {
    id: 'kardinero',
    title: 'Kardinero Medikal',
    subtitle: 'macOS ECG Application',
    shortDescription: 'A native macOS application to read, decode, and visualize patient ECG files for clinical analysis.',
    tags: ['.NET C#', 'Swift', 'Python', 'Desktop App'],
    imageUrl: 'https://placehold.co/600x400/0a0a0a/C8FF00?text=KARDINERO',
    role: 'Software Engineering Intern',
    timeline: 'Summer 2024',
    challenge: 'The company needed a native macOS application to read proprietary, encoded patient data files (.ocp) and print ECG waveforms for analysis.',
    solution: [
      'Created a desktop app for macOS using .NET C# and Swift for UI and core logic.',
      'Wrote Python scripts to parse the complex ECG file format, handling binary data and custom encoding.',
      'Developed features to render ECG waveforms accurately and assist in generating diagnoses.',
    ],
    liveUrl: null,
    sourceUrl: 'https://github.com/isaakhann/Kardinero_App',
    isFeatured: true,
    index: '04',
  },
  {
    id: 'HelpAi',
    title: 'HelpAI',
    subtitle: 'AI-Powered Helping System',
    shortDescription: 'An AI assistant that analyzes real-time on-screen content and meeting conversations, integrating open-source LLMs to generate contextual responses.',
    tags: ['ReactJS', 'FastAPI', 'Python', 'Data Science'],
    imageUrl: 'https://placehold.co/600x400/0a0a0a/C8FF00?text=HELPAI',
    role: 'Group Project',
    timeline: 'September 2025 – Present',
    challenge: 'Navigating high-pressure technical interviews makes it difficult to synthesize complex information and formulate structured responses in real-time.',
    solution: [
      'A low-latency AI assistant utilizing OCR and Speech-to-Text to monitor live on-screen content and audio, feeding data into open-source LLMs for instant, context-aware suggestions.',
    ],
    isFeatured: true,
    index: '05',
  },
  {
    id: 'hospital-management',
    title: 'Hospital Mgmt',
    subtitle: 'Algorithmic Patient Scheduling',
    shortDescription: 'A C++ application using Heaps to efficiently match patients with doctors, minimizing wait times.',
    tags: ['C++', 'Data Structures', 'Algorithms'],
    imageUrl: 'https://placehold.co/600x400/0a0a0a/C8FF00?text=HOSPITAL',
    isFeatured: false,
    index: '06',
  },
  {
    id: 'pet-sphere',
    title: 'PetSphere',
    subtitle: 'Java Pet Adoption App',
    shortDescription: 'A JavaFX application for pet adoption, connecting users with animal shelters in an intuitive desktop interface.',
    tags: ['Java', 'JavaFX', 'Desktop App'],
    imageUrl: 'https://placehold.co/600x400/0a0a0a/C8FF00?text=PETSPHERE',
    isFeatured: false,
    index: '07',
  },
  {
    id: 'space-invaders',
    title: 'Space Invaders',
    subtitle: 'Java Game Development',
    shortDescription: 'A fully playable Space Invaders clone built with the LibGDX framework in Java as a team project.',
    tags: ['Java', 'LibGDX', 'Game Dev'],
    imageUrl: 'https://placehold.co/600x400/0a0a0a/C8FF00?text=SPACE+INVADERS',
    isFeatured: false,
    index: '08',
  },
  {
    id: 'chord-craft',
    title: 'ChordCraft',
    subtitle: 'AI Music Composition Tool',
    shortDescription: 'A browser-based tool using algorithmic composition to suggest chord progressions and melodies based on mood and key.',
    tags: ['JavaScript', 'Web Audio API', 'Algorithms', 'CSS'],
    imageUrl: 'https://placehold.co/600x400/0a0a0a/C8FF00?text=CHORDCRAFT',
    role: 'Personal Project',
    timeline: 'Early 2025',
    challenge: 'I wanted to build a tool that lowers the barrier to music composition, letting anyone experiment with harmony without needing music theory knowledge.',
    solution: [
      'Built an interactive piano roll UI using vanilla JavaScript and the Web Audio API.',
      'Implemented chord generation logic based on diatonic harmony and voice leading rules.',
      'Added a mood-selector mapping emotional states to musical characteristics like tempo and mode.',
    ],
    isFeatured: false,
    index: '09',
  },
  {
    id: 'lens-log',
    title: 'LensLog',
    subtitle: 'Photography & EXIF Tracker',
    shortDescription: 'A personal photography showcase that automatically reads EXIF data from uploaded images to catalogue camera settings and locations.',
    tags: ['Python', 'ReactJS', 'FastAPI', 'Photography'],
    imageUrl: 'https://placehold.co/600x400/0a0a0a/C8FF00?text=LENSLOG',
    role: 'Personal Project',
    timeline: 'Winter 2024',
    isFeatured: false,
    index: '10',
  },
];

const skillsData = {
  technical: [
    { name: 'Java', level: 90 }, { name: 'C / C++', level: 85 },
    { name: 'Python', level: 88 }, { name: 'C# / .NET', level: 75 },
    { name: 'Swift', level: 65 }, { name: 'JavaScript', level: 85 },
    { name: 'ReactJS', level: 88 }, { name: 'FastAPI', level: 82 },
    { name: 'HTML & CSS', level: 90 }, { name: 'Mapbox', level: 70 },
    { name: 'Figma', level: 72 }, { name: 'GitHub', level: 90 },
  ],
  soft: ['Problem-solving', 'Team Oriented', 'Outspoken', 'Collaborative', 'Creative'],
  languages: ['English (C1)', 'Turkish (B2)', 'Urdu (Native)', 'Kashmiri (Native)', 'Hindi (Native)'],
};

const GITHUB_URL = 'https://github.com/isaakhann';
const LINKEDIN_URL = 'https://linkedin.com/in/isa-khan1123';

// --- ICONS ---
const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-3" />
  </svg>
);
const LinkedinIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const ExternalLinkIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
const ArrowUpRight = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 7h10v10" /><path d="M7 17 17 7" />
  </svg>
);

// --- HELPERS ---
const ScrollToTop = () => { useEffect(() => window.scrollTo(0, 0), []); return null; };

const useInView = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const ScrollProgressBar = () => {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => setP((window.scrollY / (document.documentElement.scrollHeight - innerHeight)) * 100);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return <div className="spb"><div className="spb-fill" style={{ width: `${p}%` }} /></div>;
};

// --- MARQUEE ---
const Marquee = () => {
  const items = ['SOFTWARE ENGINEER', 'FULL-STACK', 'DATA-DRIVEN', 'BILKENT CS', 'MUSIC MAKER', 'PHOTOGRAPHER', 'PROBLEM SOLVER', 'OPEN TO WORK'];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item">
            {item}<span className="marquee-sep">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// --- NAVBAR ---
const Navbar = ({ isSinglePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (!isSinglePage) return;
    const obs = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-30% 0px -70% 0px' }
    );
    document.querySelectorAll('.page-section').forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, [isSinglePage]);

  const links = [
    { id: 'home', label: 'Home' }, { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' }, { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo" onClick={() => window.scrollTo(0, 0)}>
          IAK<span className="logo-dot">.</span>
        </Link>
        {isSinglePage && (
          <>
            <div className="nav-links">
              {links.map(({ id, label }) => (
                <a key={id} href={`#${id}`} className={`nav-link ${active === id ? 'active' : ''}`}>{label}</a>
              ))}
            </div>
            <button className={`nav-toggle ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(o => !o)} aria-label="menu">
              <span /><span /><span />
            </button>
          </>
        )}
      </div>
      <div className={`nav-mobile ${isOpen ? 'open' : ''}`}>
        {links.map(({ id, label }) => (
          <a key={id} href={`#${id}`} className="nav-mobile-link" onClick={() => setIsOpen(false)}>{label}</a>
        ))}
      </div>
    </nav>
  );
};

// --- 3D AVATAR (Three.js / React Three Fiber) ---

// The actual GLB model — auto-centers, shows head+upper body, tracks mouse
const AvatarModel = ({ mouseNorm }) => {
  const { scene } = useGLTF('/model.glb');
  const groupRef = useRef();
  const headBoneRef = useRef(null);
  const neckBoneRef = useRef(null);
  const { camera } = useThree();

  useEffect(() => {
    // ── 1. Auto-fit: compute bounding box of the raw scene ──
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const modelHeight = size.y;       // full height in model units
    const modelTop    = box.max.y;    // top of head in model units

    // We want to show roughly the top 55% of the model (head + upper body)
    // Shift the group so that "eye level" (85% from bottom) sits at world y=0
    const eyeLevel = box.min.y + modelHeight * 0.75;
    groupRef.current.position.set(-center.x, -eyeLevel, -center.z);

    // Pull camera back enough to frame the upper body nicely
    // target: fill ~55% of model height in the viewport
    const visibleFraction = 0.55;
    const visibleHeight   = modelHeight * visibleFraction;
    const fovRad = (camera.fov * Math.PI) / 180;
    const dist   = visibleHeight / (2 * Math.tan(fovRad / 2)) * 1.1;
    camera.position.set(0, 0, dist);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    // ── 2. Find head / neck bones ──
    scene.traverse(obj => {
      const n = obj.name.toLowerCase();
      if (!headBoneRef.current && (n === 'head' || n.includes('head'))) headBoneRef.current = obj;
      if (!neckBoneRef.current && n.includes('neck')) neckBoneRef.current = obj;
    });

    // ── 3. Material quality ──
    scene.traverse(obj => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        if (obj.material) obj.material.envMapIntensity = 1.0;
      }
    });
  }, [scene, camera]);

  const targetRot  = useRef({ x: 0, y: 0 });
  const currentRot = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    targetRot.current.y =  (mouseNorm.x - 0.7) * 1.0;
    targetRot.current.x = -(mouseNorm.y ) * -0.6;

    const t = 1 - Math.pow(0.02, delta);
    currentRot.current.x += (targetRot.current.x - currentRot.current.x) * t;
    currentRot.current.y += (targetRot.current.y - currentRot.current.y) * t;

    if (headBoneRef.current) {
      headBoneRef.current.rotation.y = currentRot.current.y;
      headBoneRef.current.rotation.x = currentRot.current.x * 0.6;
    }
    if (neckBoneRef.current) {
      neckBoneRef.current.rotation.y = currentRot.current.y * 0.35;
      neckBoneRef.current.rotation.x = currentRot.current.x * 0.25;
    }

    // Gentle idle float on the whole group
    // if (groupRef.current) {
    //   groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.9) * 0.0008;
    // }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} />
    </group>
  );
};

// Preload the model
useGLTF.preload('/model.glb');

// Loading fallback — acid-green pulsing ring
const AvatarFallback = () => (
  <mesh>
    <torusGeometry args={[0.6, 0.04, 16, 60]} />
    <meshBasicMaterial color="#C8FF00" />
  </mesh>
);

// Canvas wrapper — the full 3D scene
const Avatar3D = ({ mouseNorm }) => (
  <div className="avatar-canvas-wrap">
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 42, near: 0.3, far: 20 }}
      shadows
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 3, 3]} intensity={2.0} castShadow shadow-mapSize={[1024, 1024]} />
      {/* Acid-green rim from behind-left */}
      <pointLight position={[-2.5, 1, -1.5]} intensity={1.4} color="#C8FF00" />
      {/* Warm fill right */}
      <pointLight position={[2.5, 0.5, 1]} intensity={0.5} color="#ffe8c0" />

      <Environment preset="city" />

      <Suspense fallback={<AvatarFallback />}>
        <AvatarModel mouseNorm={mouseNorm} />
      </Suspense>

      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={0.4}
        scale={3}
        blur={2}
        far={3}
        color="#C8FF00"
      />
    </Canvas>

    <div className="avatar-glow-ring" />
  </div>
);

// --- HERO ---
const HomeSection = () => {
  const heroRef = useRef(null);
  // Store mouse as a plain ref — update it directly without re-rendering
  const mouseNormRef = useRef({ x: 0.5, y: 0.4 });
  // But we need React state to pass into Avatar3D for useFrame to read latest value
  const [mouseNorm, setMouseNorm] = useState({ x: 0.5, y: 0.4 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = e => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseNormRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    window.addEventListener('mousemove', onMove);

    // Throttled state update at ~30fps (useFrame handles the smooth lerp internally)
    let last = 0;
    const tick = ts => {
      if (ts - last > 33) {
        last = ts;
        setMouseNorm({ ...mouseNormRef.current });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section id="home" className="hero page-section" ref={heroRef}>
      <div className="hero-noise" />
      <div className="hero-scanlines" />

      <div className="hero-inner">
        {/* LEFT — text */}
        <div className="hero-content">
          <div className="hero-status">
            <span className="status-dot" />
            <span>Available for opportunities</span>
          </div>

          <h1 className="hero-name">
            <span className="hero-line reveal-line" style={{ animationDelay: '0.05s' }}>ISA</span>
            <span className="hero-line hero-line--stroke reveal-line" style={{ animationDelay: '0.15s' }}>AHMAD</span>
            <span className="hero-line reveal-line" style={{ animationDelay: '0.25s' }}>KHAN</span>
          </h1>

          <div className="hero-foot reveal-fade" style={{ animationDelay: '0.45s' }}>
            <p className="hero-desc">
              Software Engineer building data-driven<br />web &amp; desktop applications.
            </p>
            <div className="hero-ctas">
              <a href="#projects" className="btn btn-primary">View Work <ArrowUpRight /></a>
              <a href="#contact" className="btn btn-ghost">Contact</a>
            </div>
            <div className="hero-socials">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon size={22} /></a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon size={22} /></a>
            </div>
          </div>
        </div>

        {/* RIGHT — real 3D avatar */}
        <div className="hero-avatar-col reveal-fade" style={{ animationDelay: '0.5s' }}>
          <Avatar3D mouseNorm={mouseNorm} />
        </div>
      </div>

      <div className="hero-meta">
        <span>BILKENT UNIVERSITY</span>
        <span className="hero-meta-sep">—</span>
        <span>CS '26</span>
      </div>
    </section>
  );
};

// --- ABOUT ---
const AboutSection = () => {
  const [ref, inView] = useInView();
  const stats = [
    { v: '3+', l: 'Years' }, { v: '10+', l: 'Projects' },
    { v: '2', l: 'Internships' }, { v: '5', l: 'Languages' },
  ];
  return (
    <section id="about" className="page-section about-section" ref={ref}>
      <div className={`container ${inView ? 'in-view' : ''}`}>
        <div className="sec-head">
          <span className="sec-num">00</span>
          <h2 className="sec-title">About</h2>
        </div>
        <div className="about-grid">
          <div className="about-img-col">
            <div className="about-img-wrap">
              <img src={profilePic} alt="Isa Ahmad Khan" className="about-img" />
              <div className="about-img-tag">ISA AHMAD KHAN</div>
            </div>
          </div>
          <div className="about-text-col">
            <p className="about-lead">
              I build software that matters — from energy platforms visualizing every wind farm in Turkey to medical tools decoding patient ECG data.
            </p>
            <p className="about-body">
              Software Engineering student at <strong>Bilkent University</strong>, Ankara.
              At <strong>Tarla.io</strong> I'm engineering a predictive analytics platform for Turkey's renewable energy sector.
              Previously at <strong>Kardinero Medikal</strong>, I built a native macOS ECG visualizer in Swift and .NET C#.
            </p>
            <p className="about-body">
              Beyond code: Vice President of <strong>Bilkent International House</strong>, hobbyist photographer, skier, and music producer.
            </p>
            <div className="about-stats">
              {stats.map(({ v, l }) => (
                <div key={l} className="a-stat">
                  <span className="a-stat-v">{v}</span>
                  <span className="a-stat-l">{l}</span>
                </div>
              ))}
            </div>
            <div className="about-links">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                <GithubIcon size={16} /> GitHub
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                <LinkedinIcon size={16} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- PROJECT ROW ---
const ProjectRow = ({ project, idx }) => {
  const [ref, inView] = useInView();
  const [hov, setHov] = useState(false);
  return (
    <Link
      to={`/projects/${project.id}`}
      ref={ref}
      className={`proj-row ${inView ? 'in-view' : ''} ${hov ? 'hov' : ''}`}
      style={{ transitionDelay: `${idx * 55}ms` }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span className="proj-num">{project.index}</span>
      <div className="proj-info">
        <span className="proj-title">{project.title}</span>
        <span className="proj-sub">{project.subtitle}</span>
      </div>
      <div className="proj-tags">
        {project.tags.slice(0, 3).map(t => <span key={t} className="proj-tag">{t}</span>)}
      </div>
      <span className="proj-arrow"><ArrowUpRight size={20} /></span>
    </Link>
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
    if (filter === 'Web') return p.tags.some(t => ['ReactJS', 'FastAPI', 'JavaScript', 'HTML', 'NextJS'].includes(t));
    if (filter === 'Desktop') return p.tags.some(t => ['Desktop App', '.NET C#', 'Swift', 'Java'].includes(t));
    if (filter === 'Game Dev') return p.tags.includes('Game Dev');
    return true;
  });

  return (
    <section id="projects" className="page-section" ref={ref}>
      <div className={`container ${inView ? 'in-view' : ''}`}>
        <div className="sec-head">
          <span className="sec-num">01</span>
          <h2 className="sec-title">Work</h2>
        </div>
        <div className="filter-bar">
          {filters.map(f => (
            <button key={f} className={`filter-pill ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <div className="proj-list">
          {filtered.map((p, i) => <ProjectRow key={p.id} project={p} idx={i} />)}
        </div>
      </div>
    </section>
  );
};

// --- SKILLS ---
const SkillBar = ({ name, level, i }) => {
  const [ref, inView] = useInView();
  return (
    <div className="skill-row" ref={ref}>
      <div className="skill-meta">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{level}</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" style={{ width: inView ? `${level}%` : 0, transitionDelay: `${i * 55}ms` }} />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const [ref, inView] = useInView();
  return (
    <section id="skills" className="page-section" ref={ref}>
      <div className={`container ${inView ? 'in-view' : ''}`}>
        <div className="sec-head">
          <span className="sec-num">02</span>
          <h2 className="sec-title">Skills</h2>
        </div>
        <div className="skills-grid">
          <div className="skills-bars">
            <p className="skills-col-label">TECHNICAL</p>
            {skillsData.technical.map(({ name, level }, i) => (
              <SkillBar key={name} name={name} level={level} i={i} />
            ))}
          </div>
          <div className="skills-side">
            <div className="skills-block">
              <p className="skills-col-label">SOFT SKILLS</p>
              <div className="pill-wrap">
                {skillsData.soft.map(s => <span key={s} className="s-pill">{s}</span>)}
              </div>
            </div>
            <div className="skills-block">
              <p className="skills-col-label">LANGUAGES</p>
              <div className="pill-wrap">
                {skillsData.languages.map(l => <span key={l} className="s-pill s-pill--lang">{l}</span>)}
              </div>
            </div>
            <div className="skills-callout">
              <span className="callout-label">LEARNING</span>
              <p>Machine Learning · Distributed Systems · Swift / iOS</p>
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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [ref, inView] = useInView();

  const handleSubmit = async e => {
    e.preventDefault(); setStatus(''); setError(''); setSending(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST', body: new FormData(e.currentTarget), headers: { Accept: 'application/json' },
      });
      if (res.ok) { setStatus("Sent. I'll be in touch soon."); e.target.reset(); }
      else throw new Error('Something went wrong.');
    } catch (err) { setError(err.message); }
    finally { setSending(false); }
  };

  return (
    <section id="contact" className="page-section contact-section" ref={ref}>
      <div className={`container ${inView ? 'in-view' : ''}`}>
        <div className="sec-head">
          <span className="sec-num">03</span>
          <h2 className="sec-title">Contact</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-left">
            <p className="contact-big">Let's build<br />something.</p>
            <p className="contact-body">Open to internships, collaborations, and interesting projects. Drop me a line.</p>
            <div className="contact-socials">
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="c-social"><GithubIcon size={18} /> GitHub</a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="c-social"><LinkedinIcon size={18} /> LinkedIn</a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" name="_gotcha" className="sr-only" tabIndex="-1" autoComplete="off" />
            {status && <div className="form-msg ok">{status}</div>}
            {error && <div className="form-msg err">{error}</div>}
            <div className="form-row">
              <div className="fg"><label>Name</label><input type="text" name="name" required placeholder="Your name" /></div>
              <div className="fg"><label>Email</label><input type="email" name="email" required placeholder="your@email.com" /></div>
            </div>
            <div className="fg"><label>Message</label><textarea name="message" rows={5} required placeholder="What's on your mind?" /></div>
            <button type="submit" className="btn btn-primary full" disabled={sending}>
              {sending ? 'Sending…' : 'Send Message'} {!sending && <ArrowUpRight />}
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
    <div className="footer-inner">
      <span className="footer-logo">IAK<span className="logo-dot">.</span></span>
      <div className="footer-socials">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"><GithubIcon size={18} /></a>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><LinkedinIcon size={18} /></a>
      </div>
      <span className="footer-copy">© {new Date().getFullYear()} Isa Ahmad Khan</span>
    </div>
  </footer>
);

// --- PROJECT DETAIL ---
const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const project = projectData.find(p => p.id === projectId);
  const others = projectData.filter(p => p.id !== projectId).slice(0, 4);

  if (!project) return (
    <div style={{ textAlign: 'center', padding: '10rem 2rem' }}>
      <h2 style={{ color: 'var(--c)' }}>Project not found.</h2>
      <Link to="/" className="btn btn-ghost" style={{ marginTop: '2rem', display: 'inline-flex' }}>← Back</Link>
    </div>
  );

  return (
    <>
      <Navbar isSinglePage={false} />
      <ScrollToTop />
      <main>
        <div className="detail-hero">
          <div className="container in-view">
            <Link to="/#projects" className="detail-back">← All Projects</Link>
            <p className="detail-eyebrow">{project.subtitle}</p>
            <h1 className="detail-title">{project.title}</h1>
            <div className="detail-badges">
              {project.role && <span className="detail-badge">{project.role}</span>}
              {project.timeline && <span className="detail-badge">{project.timeline}</span>}
            </div>
          </div>
        </div>

        <div className="container in-view detail-body">
          <img src={project.imageUrl.replace('600x400', '1200x600')} alt={project.title} className="detail-img" />
          <div className="detail-layout">
            <div className="detail-main">
              {project.challenge && (
                <div className="detail-block">
                  <h3 className="detail-block-label">THE CHALLENGE</h3>
                  <p>{project.challenge}</p>
                </div>
              )}
              {project.solution && (
                <div className="detail-block">
                  <h3 className="detail-block-label">THE SOLUTION</h3>
                  <ul className="detail-list">
                    {project.solution.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              )}
            </div>
            <aside className="detail-sidebar">
              <div className="detail-sidebar-box">
                <p className="detail-block-label">TECH STACK</p>
                <div className="proj-tags">
                  {project.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}
                </div>
                <div className="detail-ctas">
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary full">
                      Live Demo <ExternalLinkIcon />
                    </a>
                  )}
                  {project.sourceUrl && project.sourceUrl !== '#' && (
                    <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost full">
                      Source <GithubIcon size={16} />
                    </a>
                  )}
                </div>
              </div>
            </aside>
          </div>

          {others.length > 0 && (
            <div className="detail-more">
              <p className="detail-block-label" style={{ marginBottom: '1.5rem' }}>MORE PROJECTS</p>
              <div className="proj-list">
                {others.map((p, i) => <ProjectRow key={p.id} project={p} idx={i} />)}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

// --- ROOT LAYOUT ---
const SinglePageLayout = () => (
  <>
    <Navbar isSinglePage />
    <main>
      <HomeSection />
      <Marquee />
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
      <div className="root-wrap">
        <ScrollProgressBar />
        <Routes>
          <Route path="/" element={<SinglePageLayout />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}