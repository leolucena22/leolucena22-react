import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <h3>leolucena22</h3>
          </Link>
        </div>

        <div className={`links${menuOpen ? ' active' : ''}`}>
          <ul>
            <li>
              <NavLink to="/" end onClick={closeMenu}>
                Sobre mim
              </NavLink>
            </li>
            <li>
              <NavLink to="/projetos" onClick={closeMenu}>
                Projetos
              </NavLink>
            </li>
            <li>
              <NavLink to="/servicos" onClick={closeMenu}>
                Serviços
              </NavLink>
            </li>
          </ul>
        </div>

        <button
          className={`burger-menu${menuOpen ? ' active' : ''}`}
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>
      </nav>

      <div
        className={`overlay${menuOpen ? ' active' : ''}`}
        onClick={closeMenu}
      />
    </>
  );
}
