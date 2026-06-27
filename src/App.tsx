import "./styles.css";
import { useState, useEffect, useRef } from "react";
import { FadeIn } from "./Animation";
import { FaLinkedin, FaArtstation, FaEnvelope } from "react-icons/fa";
import { SiUnrealengine, SiAutodesk, SiBlender } from "react-icons/si";
import { FaCube, FaWindows, FaAndroid, FaVrCardboard } from "react-icons/fa";

// Import your project detail pages
import LandRoverDefender from "./LandRoverDefender";
import RangeRoverVelar from "./RangeRoverVelar";
import ATVConfigurator from "./ATVConfigurator";
import JaguarFTYPE from "./JaguarFTYPE";
import PanavisionCommercial from "./PanavisionCommercial";
import LiveConfiguator from "./LiveConfiguator";
/* ===============================
   Reusable Image Component
================================ */
function Image({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      draggable={false}
    />
  );
}

/* ===============================
   Glass Grid Reveal
================================ */
function GlassGridReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const handleMove = (e: MouseEvent) => {
      if (!ref.current || raf) return;
      raf = requestAnimationFrame(() => {
        const rect = ref.current!.getBoundingClientRect();
        ref.current!.style.setProperty("--x", `${e.clientX - rect.left}px`);
        ref.current!.style.setProperty("--y", `${e.clientY - rect.top}px`);
        raf = 0;
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return <div className="glass-grid-reveal" ref={ref} />;
}

/* ===============================
   Skill Component
================================ */
function Skill({
  icon: Icon,
  name,
  color,
}: {
  icon: any;
  name: string;
  color: string;
}) {
  return (
    <div className="skill-tag" style={{ borderColor: color }}>
      <Icon style={{ color: color }} />
      <span>{name}</span>
    </div>
  );
}

/* ===============================
   Project Data
================================ */
const PROJECTS = [
  {
    title: "Land Rover Defender",
    image: "/project1.png",
    description:
      "Photorealistic Unreal Engine visualization with cinematic lighting.",
    tools: ["Unreal Engine",  "-Maya"],
    component: "land-rover",
  },
  {
    title: "Range Rover Velar",
    image: "/project2.png",
    description: "Luxury SUV visualization focused on reflections.",
    tools: ["Unreal Engine",  "-Maya"],
    component: "range-rover",
  },
  {
    title: "ATV Bike Configurator",
    image: "/project3.png",
    description: "Real-time configurator with interactive UI.",
    tools: ["Unreal Engine",  "-Maya"],
    component: "atv-configurator",
  },
  {
    title: "Jaguar F-TYPE Convertible",
    image: "/project4.png",
    description: "High-end automotive render.",
    tools: ["Unreal Engine"],
    component: "jaguar-f-type",
  },
  {
    title: "Panavision Commercial",
    image: "/Panavision Commercial.png",
    description: "Commercial film production visualization.",
    tools: ["Arnold Render", "-Maya"],
    component: "panavision-commercial",
  },

  {
    title: "Live 3D Truck Configurator",
    image: "/project5.png",
    description: "Interactive real-time configurator with 3D model controls.",
    tools: ["Three.js, React Three Fiber, and JavaScript,",],
    component: "live-configurator",
  },
];

/* ===============================
   WITH PROJECT PAGES
================================ */
export default function App() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const handleProjectClick = (component: string) => {
    setActiveProject(component);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveProject(null);
  };

  // Show project detail page if active
  if (activeProject) {
    return (
      <div className="App">
        {activeProject === "land-rover" && <LandRoverDefender />}
        {activeProject === "range-rover" && <RangeRoverVelar />}
        {activeProject === "atv-configurator" && <ATVConfigurator />}
        {activeProject === "jaguar-f-type" && <JaguarFTYPE />}
        {activeProject === "panavision-commercial" && <PanavisionCommercial />}
        {activeProject === "live-configurator" && <LiveConfiguator />}
      </div>
    );
  }

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Portfolio</div>
        <ul className="menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#software">Software</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero hero-bg" id="home">
        <GlassGridReveal />
        <FadeIn>
          <div className="hero-left">
            <div className="avatar">
              <Image src="/Profile_Photo.jpg" alt="Profile photo" />
            </div>
            <h1>Hi, I'm <span className="gradient-text">Jalpesh</span></h1>
            <h2>Senior 3D Visualization Artist – Unreal Engine | AR/VR</h2>
            <p>Senior Visualization Artist with 7+ years of experience in photorealistic rendering.</p>
            <div className="buttons">
              <a href="#projects" className="primary">View My Work</a>
              <a href="/Jalpesh_Kholiya_Resume.pdf" className="primary" download>Download Resume</a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Software Skills */}
      <section className="skills" id="software">
        <FadeIn><h2>Software & Tools</h2></FadeIn>
        <FadeIn delay={100}>
          <div className="skills-grid">
            <Skill icon={SiUnrealengine} name="Unreal Engine" color="#ffffff" />
            <Skill icon={SiAutodesk} name="Autodesk 3ds Max" color="#0696D7" />
            <Skill icon={FaCube} name="Autodesk Maya" color="#00A8A9" />
            <Skill icon={SiAutodesk} name="Autodesk VRED" color="#0696D7" />
            <Skill icon={SiBlender} name="Blender" color="#E87D0D" />
            <Skill icon={FaAndroid} name="Android" color="#3DDC84" />
            <Skill icon={FaVrCardboard} name="VR/AR" color="#9B59B6" />
          </div>
        </FadeIn>
      </section>

      {/* Projects */}
      <section className="project-index" id="projects">
        <FadeIn><h2>My Projects</h2></FadeIn>
        <div className="project-row">
          {PROJECTS.map((project) => (
            <div key={project.title} className="project-item" onClick={() => handleProjectClick(project.component)}>
              <div className="project-image-container">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay"><span>View Project</span></div>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tools">
                {project.tools.map((tool: string) => <span key={tool}>{tool}</span>)}
              </div>
              <div className="project-arrow">↗</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="contact" id="contact">
        <FadeIn><h2>Get In Touch</h2></FadeIn>
        <FadeIn delay={100}>
          <p>Open for collaborations and freelance opportunities</p>
        </FadeIn>
        <div className="contact-links">
          <a href="mailto:your@email.com" className="contact-btn"><FaEnvelope /> Email</a>
          <a href="https://www.artstation.com/jalpesh17" className="contact-btn" target="_blank"><FaArtstation /> ArtStation</a>
          <a href="https://www.linkedin.com/in/jalpesh-kholiya-28a545170/" className="contact-btn" target="_blank"><FaLinkedin /> LinkedIn</a>
        </div>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Jalpesh — Built with React
      </footer>
    </div>
  );
}