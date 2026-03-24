import { Link } from 'react-router-dom';
import Badge from './Badge';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projets/${project.slug}`} className="project-card">
      <div
        className="project-card__cover"
        style={{ '--card-color': project.color }}
      >
        {project.cover ? (
          <img src={project.cover} alt={project.title} />
        ) : (
          <div className="project-card__placeholder">
            <span className="project-card__initial">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
        <div className="project-card__overlay">
          <span className="project-card__cta">Voir le projet →</span>
        </div>
      </div>
      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <Badge key={tag.label} label={tag.label} type={tag.type} />
          ))}
        </div>
        {project.status && (
          <span className="project-card__status">{project.status}</span>
        )}
      </div>
    </Link>
  );
}
