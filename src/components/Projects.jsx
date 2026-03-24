import ProjectCard from './ProjectCard';
import { PROJECTS } from '../data/content';
import './Projects.css';

export default function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="projects__header">
          <h2 className="section-title">
            mes projets
            <span className="projects__crown">👑</span>
          </h2>
          <p className="projects__subtitle">
            Une sélection de projets UX, design et développement
          </p>
        </div>

        <div className="projects__grid">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="projects__more">
          <p className="projects__more-text">et bien d'autres !</p>
        </div>
      </div>
    </section>
  );
}
