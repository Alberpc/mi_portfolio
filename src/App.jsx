import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Globe,
  X,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

// --- IMPORTS DE IMÁGENES ---
import portfolioImg from "./assets/img/portfolio.png";
import portfolio2Img from "./assets/img/portfolio2.png";
import proyectoWoo from "./assets/img/proyecto-woocommerce.png";
import proyectoLovable from "./assets/img/proyecto-lovable.jpg";
import proyectoAirtable from "./assets/img/proyecto-airtable.png";
import proyectoN8n from "./assets/img/proyecto-n8n.png";

// --- SIMULACIÓN DE DATOS (projects.json) ---
const PROJECTS_DATA = [
  {
    id: 1,
    title:
      "Automatización de gestión de pedidos y facturación en WooCommerce con IA",
    image: proyectoWoo,
    description:
      "Procesamiento automático de pedidos cuando el pago se completa. Generación de factura, resumen con IA para logística y notificación interna sin intervención manual.",
    impact: "Reduce errores y tiempo operativo en eCommerce.",
  },
  {
    id: 2,
    title: "Clasificación automática de leads y recomendación de acción con IA",
    image: proyectoLovable,
    description:
      "Análisis de leads entrantes para clasificarlos por interés (caliente, tibio, frío). La IA genera resumen y acción recomendada y guarda histórico consultable.",
    impact: "Permite priorizar oportunidades desde el primer contacto.",
  },
  {
    id: 3,
    title: "Gestión inteligente de tickets de soporte con agentes IA",
    image: proyectoAirtable,
    description:
      "Sistema de gestión de tickets de soporte que comienza con un formulario de incidencias. Agentes de IA analizan el mensaje, evalúan el contexto y asignan una prioridad automática. Según el resultado, el sistema actualiza el estado del ticket y alerta al equipo solo cuando es crítico.",
    impact: "Reduce ruido operativo y acelera la resolución de incidencias",
  },
  {
    id: 4,
    title: "Generación automática de informes con IA",
    image: proyectoN8n,
    description:
      "Sistema que analiza datos de ventas y genera informes ejecutivos en PDF. Incluye KPIs, tablas y análisis automático enviados por email.",
    impact: "Reporting profesional sin trabajo manual.",
  },
];

// --- ESTILOS CSS (Simulando index.css) ---
const styles = `
:root {
  --bg-color: #f8f9fa;
  --card-bg: #ffffff;
  --text-primary: #1a202c;
  --text-secondary: #4a5568;
  --accent-color: #3182ce;
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --radius-md: 0.5rem;
  --radius-full: 9999px;
  --spacing-section: 6rem;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* --- HERO SECTION --- */
.hero-section {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
}

.avatar-container {
  perspective: 1000px;
  margin-bottom: 2rem;
  cursor: pointer;
}

.avatar {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 3px solid var(--card-bg);
  box-shadow: var(--shadow-lg);
  object-fit: cover;
  transition: transform 0.1s ease-out;
}

.hero-name {
  font-size: 3rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.hero-role {
  font-size: 1.25rem;
  color: var(--accent-color);
  font-weight: 600;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-bio {
  max-width: 600px;
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  line-height: 1.8;
}

.social-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.social-icon {
  color: var(--text-secondary);
  transition: all 0.2s ease;
  padding: 0.5rem;
  border-radius: var(--radius-md);
}

.social-icon:hover {
  color: var(--text-primary);
  background-color: rgba(0,0,0,0.05);
  transform: translateY(-2px);
}

.tech-stack {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2.5rem;
  max-width: 700px;
}

.tech-tag {
  background-color: rgba(0,0,0,0.05);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(0,0,0,0.05);
  cursor: default;
  transition: all 0.2s ease;
}

.tech-tag:hover {
  background-color: var(--card-bg);
  color: var(--accent-color);
  border-color: var(--accent-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

/* --- PROJECTS SECTION --- */
.projects-section {
  padding: var(--spacing-section) 2rem;
  max-width: 1200px;
  margin: 0 auto;
  border-top: 1px solid var(--border-color);
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 4rem;
  font-weight: 700;
}

.projects-grid {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
}

.project-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  width: 100%;
  max-width: 700px;
  overflow: hidden;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  display: flex;
  flex-direction: row;
}

.project-card-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.project-image-container {
  width: 100%;
  height: 250px;
  overflow: hidden;
  border-bottom: 1px solid var(--border-color);
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image {
  transform: scale(1.03);
}

.project-details {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

.project-impact {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-style: italic;
  border-left: 3px solid var(--accent-color);
  padding-left: 1rem;
}

.btn-view-more {
  background: transparent;
  border: 1px solid var(--text-secondary);
  color: var(--text-primary);
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-view-more:hover {
  background: var(--text-primary);
  color: white;
  border-color: var(--text-primary);
}

/* --- MODAL --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(3px);
  animation: fadeIn 0.2s ease-out;
}

.modal-content {
  background: var(--card-bg);
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow-y: auto;
  animation: slideUp 0.3s ease-out;
  display: flex;
  flex-direction: column;
}

.modal-close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  z-index: 10;
  transition: background 0.2s;
}

.modal-close-btn:hover {
  background: #f1f1f1;
}

.modal-image {
  width: 100%;
  height: 350px;
  object-fit: cover;
}

.modal-body {
  padding: 2.5rem;
}

.modal-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.modal-desc {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.8;
}

/* --- FOOTER --- */
.footer {
  padding: 6rem 2rem;
  background-color: #e9ecef;
  border-top: 1px solid var(--border-color);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.footer-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.footer-text {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 500px;
}

.footer-links {
  margin-top: 1rem;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap; 
  justify-content: center;
}

.footer-link {
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 1rem;
  display: flex; 
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(0,0,0,0.05);
  padding: 0.75rem 1.5rem; 
  border-radius: var(--radius-full);
  border: 1px solid rgba(0,0,0,0.05);
  transition: all 0.2s ease;
}

.footer-link:hover {
  background-color: var(--card-bg);
  color: var(--accent-color);
  border-color: var(--accent-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.footer-link::after {
  display: none; 
}

/* --- ANIMATIONS --- */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* --- RESPONSIVE --- */
@media (max-width: 768px) {
  .hero-name { font-size: 2.5rem; }
  .hero-bio { font-size: 1.1rem; }
  .modal-image { height: 200px; }
  .modal-body { padding: 1.5rem; }
}
`;

// --- COMPONENTES ---

const Hero = () => {
  const [tiltStyle, setTiltStyle] = useState({});
  const avatarRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!avatarRef.current) return;

    const { left, top, width, height } =
      avatarRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const xRot = ((y - height / 2) / height) * 20;
    const yRot = ((x - width / 2) / width) * -20;

    setTiltStyle({
      transform: `perspective(500px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale(1.05)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)",
    });
  };

  return (
    <section className="hero-section">
      <div
        className="avatar-container"
        ref={avatarRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={portfolio2Img}
          alt="Alberto Pérez"
          className="avatar"
          style={tiltStyle}
        />
      </div>

      <h1 className="hero-name">Alberto Pérez</h1>
      <h2 className="hero-role">Automation & AI Builder</h2>

      <p className="hero-bio">
        Automatizo tareas repetitivas y construyo sistemas con IA para que
        ahorres tiempo y escales sin fricción.
      </p>

      <div className="tech-stack">
        <span className="tech-tag">n8n</span>
        <span className="tech-tag">Make</span>
        <span className="tech-tag">Zapier</span>
        <span className="tech-tag">Airtable</span>
        <span className="tech-tag">AI Agents</span>
        <span className="tech-tag">RAG</span>
        <span className="tech-tag">APIs</span>
      </div>

      <div className="social-links">
        <a
          href="https://github.com/Alberpc"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label="GitHub"
        >
          <Github size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/alberto-p%C3%A9rez-cabrera/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label="LinkedIn"
        >
          <Linkedin size={24} />
        </a>
        <a
          href="mailto:alberto88pc@gmail.com"
          className="social-icon"
          aria-label="Email"
        >
          <Mail size={24} />
        </a>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, onOpen }) => {
  return (
    <article className="project-card">
      <div className="project-card-content">
        <div className="project-image-container">
          <img
            src={project.image}
            alt={project.title}
            className="project-image"
          />
        </div>
        <div className="project-details">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-impact">{project.impact}</p>
          <button className="btn-view-more" onClick={() => onOpen(project)}>
            Ver más <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </article>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedProject]);

  return (
    <section className="projects-section">
      <h2 className="section-title">Proyectos</h2>

      <div className="projects-grid">
        {PROJECTS_DATA.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={setSelectedProject}
          />
        ))}
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
            >
              <X size={24} color="#1a202c" />
            </button>

            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="modal-image"
            />

            <div className="modal-body">
              <h3 className="modal-title">{selectedProject.title}</h3>
              <p className="modal-desc">{selectedProject.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <h3 className="footer-title">¿Hablamos?</h3>
      <p className="footer-text">
        Puedo ayudarte a automatizar procesos o construir sistemas con IA
        adaptados a tu negocio.
      </p>
      <div className="footer-links">
        <a href="mailto:alberto88pc@gmail.com" className="footer-link">
          <Mail size={20} />
        </a>

        <a
          href="https://www.linkedin.com/in/alberto-p%C3%A9rez-cabrera/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <Linkedin size={20} />
        </a>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="app-container">
      <style>{styles}</style>
      <Hero />
      <Projects />
      <Footer />
    </div>
  );
};

export default App;
