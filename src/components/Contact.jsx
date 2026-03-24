import { PERSON } from '../data/content';
import './Contact.css';

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__headline">
        <p className="contact__eyebrow">EN SAVOIR PLUS ?</p>
        <p className="contact__sub">Contactez-moi</p>
      </div>

      <div className="container contact__inner">
        <div className="contact__links">
          <a href={`tel:${PERSON.phone}`} className="contact__link">
            <span className="contact__link-icon">📞</span>
            {PERSON.phone}
          </a>
          <a href={`mailto:${PERSON.email}`} className="contact__link">
            <span className="contact__link-icon">✉️</span>
            {PERSON.email}
          </a>
          <a
            href={`https://${PERSON.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact__link"
          >
            <span className="contact__link-icon">💼</span>
            {PERSON.linkedin}
          </a>
        </div>

        <a href={`mailto:${PERSON.email}`} className="btn btn--white contact__cta">
          M'envoyer un message ✉️
        </a>
      </div>
    </section>
  );
}
