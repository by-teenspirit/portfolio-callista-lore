import Badge from './Badge';
import { PERSON } from '../data/content';
import './About.css';

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <h2 className="section-title">
          <span className="icon">👤</span>
          à propos de moi
        </h2>

        <div className="about__skills-row">
          {PERSON.skills.map((skill) => (
            <Badge key={skill.label} label={skill.label} type={skill.type} />
          ))}
        </div>

        <div className="about__grid">
          <div className="about__text">
            {PERSON.bio.map((para, i) => (
              <p key={i} className="about__para">{para}</p>
            ))}
          </div>
          <div className="about__photo">
            <div className="about__photo-placeholder">
              <span>Photo</span>
              <p>à venir</p>
            </div>
            <div className="about__photo-deco" />
          </div>
        </div>
      </div>
    </section>
  );
}
