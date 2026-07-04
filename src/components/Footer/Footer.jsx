import { Link } from 'react-router-dom';
import { SocialLinks } from '../SocialLinks/SocialLinks';
import './Footer.css';

export function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <h4>leolucena22</h4>
          </Link>
          <p className="footer-tagline">
            Full Stack Developer apaixonado por tecnologia e educação.
          </p>
        </div>

        <div className="footer-links">
          <h5>Links</h5>
          <ul>
            <li><Link to="/">Sobre mim</Link></li>
            <li><Link to="/projetos">Projetos</Link></li>
            <li><Link to="/servicos">Serviços</Link></li>
          </ul>
        </div>

        <div className="footer-social">
          <h5>Social</h5>
          <SocialLinks compact />
        </div>
      </div>

      <div className="footer-bottom">
        <a href="https://github.com/leolucena22" target="_blank" rel="noopener noreferrer">
          &copy; {new Date().getFullYear()} leolucena22
        </a>
      </div>
    </footer>
  );
}
