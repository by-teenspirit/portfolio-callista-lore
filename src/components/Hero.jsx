import { PERSON } from '../data/content';
import './Hero.css';

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      {/* Formes décoratives */}
      <div className="hero__shape hero__shape--1" />
      <div className="hero__shape hero__shape--2" />
      <div className="hero__shape hero__shape--3" />

      <div className="container hero__content">
        <p className="hero__tagline animate-fade-up">
          {PERSON.tagline}
        </p>
        <h1 className="hero__title animate-fade-up animate-fade-up--delay-1">
          <span className="hero__title-line">{PERSON.title[0]}</span>
          <span className="hero__title-line hero__title-line--accent">{PERSON.title[1]}</span>
        </h1>
        <div className="hero__actions animate-fade-up animate-fade-up--delay-2">
          <button className="btn btn--white" onClick={scrollToProjects}>
            Voir mes projets
          </button>
          <button className="btn btn--outline hero__btn-outline" onClick={scrollToContact}>
            Me contacter
          </button>
        </div>
      </div>

      {/* Flèche scroll */}
      <div className="hero__scroll-hint">
        <span className="hero__scroll-arrow">↓</span>
      </div>
    </section>
  );
}
