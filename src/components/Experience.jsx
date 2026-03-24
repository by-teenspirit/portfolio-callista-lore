import Badge from './Badge';
import { EXPERIENCES, FORMATIONS, PRIX, CENTRES_INTERET } from '../data/content';
import './Experience.css';

function ExperienceCard({ exp }) {
  return (
    <div className="exp-card">
      <div className="exp-card__header">
        <div>
          <h3 className="exp-card__company">{exp.company}</h3>
          <p className="exp-card__role">{exp.role}</p>
        </div>
        <span className="exp-card__period">{exp.period}</span>
      </div>
      <div className="exp-card__tags">
        {exp.tags.map((tag) => (
          <span key={tag} className="badge badge--outline">{tag}</span>
        ))}
      </div>
      <ul className="exp-card__bullets">
        {exp.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

function FormationCard({ item }) {
  return (
    <div className="exp-card exp-card--formation">
      <div className="exp-card__header">
        <div>
          <h3 className="exp-card__company">{item.title}</h3>
          {item.subtitle && <p className="exp-card__subtitle">{item.subtitle}</p>}
          <p className="exp-card__role">{item.school}</p>
        </div>
        <span className="exp-card__period">{item.period}</span>
      </div>
      <div className="exp-card__tags">
        {item.tags.map((tag) => (
          <span key={tag} className="badge badge--outline">{tag}</span>
        ))}
      </div>
      <ul className="exp-card__bullets">
        {item.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Experience() {
  return (
    <section className="section experience" id="experience">
      <div className="container">
        <div className="experience__grid">
          {/* Colonne gauche : expériences */}
          <div className="experience__col">
            <h2 className="section-title">
              <span className="icon">💼</span>
              expériences
            </h2>
            <div className="experience__list">
              {EXPERIENCES.map((exp) => (
                <ExperienceCard key={exp.company} exp={exp} />
              ))}
            </div>
          </div>

          {/* Colonne droite : formations + prix + centres */}
          <div className="experience__col">
            <h2 className="section-title">
              <span className="icon">🎓</span>
              formations
            </h2>
            <div className="experience__list">
              {FORMATIONS.map((f) => (
                <FormationCard key={f.title} item={f} />
              ))}
            </div>

            {/* Prix */}
            <h2 className="section-title" style={{ marginTop: 'var(--space-12)' }}>
              <span className="icon">🏆</span>
              prix
            </h2>
            <div className="experience__list">
              {PRIX.map((p) => (
                <div key={p.title} className="exp-card exp-card--prize">
                  <div className="exp-card__header">
                    <div>
                      <h3 className="exp-card__company">{p.title}</h3>
                      <p className="exp-card__role">{p.subtitle}</p>
                    </div>
                    <span className="exp-card__period">{p.period}</span>
                  </div>
                  <div className="exp-card__tags">
                    {p.tags.map((tag) => (
                      <span key={tag} className="badge badge--outline">{tag}</span>
                    ))}
                  </div>
                  <ul className="exp-card__bullets">
                    {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            {/* Centres d'intérêt */}
            <h2 className="section-title" style={{ marginTop: 'var(--space-12)' }}>
              <span className="icon">✨</span>
              centres d'intérêt
            </h2>
            <div className="interests__grid">
              {CENTRES_INTERET.map((item) => (
                <div key={item.label} className="interest-chip">
                  <span className="interest-chip__icon">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
