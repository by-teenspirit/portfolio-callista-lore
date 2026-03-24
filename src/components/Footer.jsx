import { PERSON } from '../data/content';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__left">
          <span>📞 {PERSON.phone}</span>
          <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a>
        </div>
        <div className="footer__center">
          <span className="footer__logo">Callista</span>
          <span className="footer__copy">© {new Date().getFullYear()} — Portfolio</span>
        </div>
        <div className="footer__right">
          <a href={`https://${PERSON.linkedin}`} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
