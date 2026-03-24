import { Link } from 'react-router-dom';
import Badge from '../components/Badge';
import './ProjectPage.css';

export default function ProjectPage({ project }) {
  return (
    <main className="project-page">
      {/* Hero du projet */}
      <div
        className="project-page__hero"
        style={{ '--project-color': project.color }}
      >
        <div className="container project-page__hero-inner">
          <Link to="/#projects" className="project-page__back">
            ← Retour aux projets
          </Link>
          <div className="project-page__meta">
            <span className="project-page__year">{project.year}</span>
          </div>
          <h1 className="project-page__title">{project.title}</h1>
          <p className="project-page__desc">{project.description}</p>
          <div className="project-page__tags">
            {project.tags.map((tag) => (
              <Badge key={tag.label} label={tag.label} type={tag.type} />
            ))}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container project-page__content">

        {/* Placeholder image couverture */}
        <div className="project-page__cover-placeholder">
          {project.cover ? (
            <img src={project.cover} alt={`Couverture ${project.title}`} />
          ) : (
            <div
              className="project-page__cover-empty"
              style={{ background: project.color }}
            >
              <span className="project-page__cover-initial">
                {project.title.charAt(0)}
              </span>
              <p>Image du projet à venir</p>
            </div>
          )}
        </div>

        {/* Sections à remplir */}
        <div className="project-page__sections">

          <section className="project-section">
            <h2 className="project-section__title">Contexte du projet</h2>
            <div className="project-section__placeholder">
              <span>📝</span>
              <p>Cette section sera complétée prochainement.</p>
              <p className="project-section__hint">
                Décrivez ici le contexte, le client, les enjeux et la problématique du projet.
              </p>
            </div>
          </section>

          <section className="project-section">
            <h2 className="project-section__title">Ma démarche UX</h2>
            <div className="project-section__placeholder">
              <span>🔍</span>
              <p>Cette section sera complétée prochainement.</p>
              <p className="project-section__hint">
                Détaillez votre processus : recherche utilisateur, ateliers, personas, parcours...
              </p>
            </div>
          </section>

          <section className="project-section">
            <h2 className="project-section__title">Solutions & livrables</h2>
            <div className="project-section__placeholder">
              <span>💡</span>
              <p>Cette section sera complétée prochainement.</p>
              <p className="project-section__hint">
                Montrez vos wireframes, maquettes, prototypes et le design system produit.
              </p>
            </div>
          </section>

          <section className="project-section">
            <h2 className="project-section__title">Résultats & apprentissages</h2>
            <div className="project-section__placeholder">
              <span>📊</span>
              <p>Cette section sera complétée prochainement.</p>
              <p className="project-section__hint">
                Partagez les résultats obtenus, les métriques et ce que vous avez appris.
              </p>
            </div>
          </section>

        </div>

        {/* Navigation entre projets */}
        <div className="project-page__nav">
          <Link to="/#projects" className="btn btn--outline">
            ← Voir tous les projets
          </Link>
        </div>
      </div>
    </main>
  );
}
