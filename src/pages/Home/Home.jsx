import { useEffect, useRef } from 'react';
import { SocialLinks } from '../../components/SocialLinks/SocialLinks';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Home.css';

export function Home() {
  const skillsRef = useScrollReveal();
  const profileRef = useRef(null);

  // Tilt effect on profile image (desktop only)
  useEffect(() => {
    const container = profileRef.current;
    if (!container || !window.matchMedia('(pointer: fine)').matches) return;

    const img = container.querySelector('img');
    if (!img) return;

    function handleMouseMove(e) {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      img.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
      img.style.transition = 'transform 0.1s ease-out';
    }

    function handleMouseLeave() {
      img.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg)';
      img.style.transition = 'transform 0.5s ease-out';
    }

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section id="about" className="hero">
        <div className="hero__content">
          <div className="status-badge">
            Disponível para projetos
          </div>

          <h1 className="hero__name">Leonardo Lucena</h1>
          <h2 className="hero__title">Full Stack Developer</h2>

          <p>
            Desenvolvedor Full Stack apaixonado por tecnologia e educação. Com formação técnica em
            Redes de Computadores e cursando Bacharelado em Sistemas de Informação no IFCE,
            atuo com desenvolvimento web utilizando HTML, CSS, JavaScript, TypeScript e React,
            além de trabalhar com WordPress, Go e Python.
          </p>

          <p>
            No campo profissional, presto suporte de T.I para o Instituto Multiprofissional de Ensino (IME),
            SOBREC e Editora Integrar, com foco em gestão de sistemas OJS e manutenção de plataformas.
            Também organizo congressos e seminários acadêmicos e faço parte da equipe da VASP Empreendimentos,
            onde aplico soluções tecnológicas inovadoras.
          </p>

          <a href="mailto:leolucena22@vivaldi.net" target="_blank" rel="noopener noreferrer" className="button">
            Entre em contato
          </a>

          <SocialLinks />
        </div>

        <div className="hero__image" ref={profileRef}>
          <img src="/assets/Perfil - editada.png" alt="Foto de Leonardo Lucena" />
        </div>
      </section>

      {/* Skills / Highlights */}
      <section className="skills-section reveal stagger-children" ref={skillsRef}>
        <span className="section-label">Especialidades</span>
        <h2 className="section-title">O que eu faço</h2>

        <div className="bento-grid">
          <div className="bento-card bento-card--wide">
            <div className="bento-icon">
              <i className="fa-solid fa-code"></i>
            </div>
            <h4>Desenvolvimento Web</h4>
            <p>
              Criação de aplicações web com HTML, CSS, JavaScript, TypeScript e React.
              Experiência com WordPress, deploy em Cloudflare Workers e GitHub Pages.
              25+ repositórios públicos no GitHub.
            </p>
          </div>

          <div className="bento-card">
            <div className="bento-icon">
              <i className="fa-solid fa-terminal"></i>
            </div>
            <h4>Linguagens</h4>
            <p>
              JavaScript, TypeScript, Go, Python, Java, C, Ruby, Shell Script e SQL.
              Fluente em Linux e automação com Shell.
            </p>
          </div>

          <div className="bento-card">
            <div className="bento-icon">
              <i className="fa-solid fa-desktop"></i>
            </div>
            <h4>Suporte de T.I</h4>
            <p>
              Formatação, upgrades de hardware, configuração de roteadores e manutenção de sistemas Windows, Linux e Android.
            </p>
          </div>

          <div className="bento-card">
            <div className="bento-icon">
              <i className="fa-solid fa-network-wired"></i>
            </div>
            <h4>Redes &amp; Infraestrutura</h4>
            <p>
              Formação técnica em Redes de Computadores. Configuração de redes domésticas e empresariais com segurança.
            </p>
          </div>

          <div className="bento-card bento-card--wide">
            <div className="bento-icon">
              <i className="fa-solid fa-calendar-check"></i>
            </div>
            <h4>Eventos Acadêmicos &amp; Gestão</h4>
            <p>
              Organização de congressos e seminários pelo IME e SOBREC. Gestão de
              plataformas OJS, sistemas de certificados, inscrições e suporte técnico
              para a Editora Integrar e VASP Empreendimentos.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
