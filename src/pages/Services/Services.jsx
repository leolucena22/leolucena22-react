import { PageHeader } from '../../components/PageHeader/PageHeader';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Services.css';

const servicesData = [
  {
    id: 'desenvolvimento-web',
    icon: 'fa-solid fa-code',
    title: 'Desenvolvimento de Sistemas Web',
    desc: 'Como Desenvolvedor Full Stack, crio sites, landing pages, sistemas web e aplicações sob medida para o seu negócio. Trabalho com HTML, CSS, JavaScript, TypeScript, React e WordPress, garantindo design responsivo, performance otimizada e uma experiência moderna para seus usuários.',
    image: '/assets/services/6.png',
    whatsapp: 'https://wa.me/5588992267095?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20sobre%20o%20servi%C3%A7o%20de%20Desenvolvimento%20de%20Sistemas%20Web%3F%20',
  },
  {
    id: 'formatacao',
    icon: 'fa-solid fa-desktop',
    title: 'Formatação',
    desc: 'Dê uma nova vida ao seu computador! Formatamos e otimizamos seu sistema para máximo desempenho e segurança. Trabalhamos com Windows 10/11 e diversas distribuições Linux, como Ubuntu, Mint, Arch, Debian e Fedora. Incluímos atualização do sistema e configurações personalizadas.',
    image: '/assets/services/1.png',
    whatsapp: 'https://wa.me/5588992267095?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20sobre%20o%20servi%C3%A7o%20de%20formata%C3%A7%C3%A3o%3F%20',
    reverse: true,
  },
  {
    id: 'instalacao',
    icon: 'fa-brands fa-windows',
    title: 'Instalação de programas',
    desc: 'Evite dores de cabeça com instalações complicadas! Configuramos os programas essenciais para seu trabalho e lazer, incluindo Microsoft Office, LibreOffice, Pacote Adobe, CorelDRAW, navegadores, VLC, antivírus e muito mais. Tudo atualizado e pronto para uso!',
    image: '/assets/services/2.png',
    whatsapp: 'https://wa.me/5588992267095?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20sobre%20o%20servi%C3%A7o%20de%20Instala%C3%A7%C3%A3o%20de%20Programas%3F%20',
  },
  {
    id: 'upgrade',
    icon: 'fa-solid fa-microchip',
    title: 'Upgrade de peças',
    desc: 'Seu PC está lento? Podemos ajudar! Fazemos a substituição e instalação de HDs, SSDs e memórias RAM para turbinar seu computador. Com mais armazenamento e velocidade, você terá mais desempenho para rodar programas pesados e melhorar sua produtividade!',
    image: '/assets/services/3.png',
    whatsapp: 'https://wa.me/5588992267095?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20sobre%20o%20servi%C3%A7o%20de%20Upgrade%20de%20Pe%C3%A7as%3F%20',
    reverse: true,
  },
  {
    id: 'clone',
    icon: 'fa-solid fa-hard-drive',
    title: 'Clone de sistema',
    desc: 'Seu computador muito mais rápido sem perder nada! Migramos todo o seu sistema, arquivos e programas do HD para um SSD, garantindo desempenho superior sem complicações. Troque para um SSD sem precisar reinstalar nada!',
    image: '/assets/services/4.png',
    whatsapp: 'https://wa.me/5588992267095?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20sobre%20o%20servi%C3%A7o%20de%20Clone%20de%20Sistema%3F%20',
  },
  {
    id: 'android',
    icon: 'fa-brands fa-android',
    title: 'Manutenção Android',
    desc: 'Problemas no celular? Recuperamos seu acesso e protegemos seus dados! Removemos senhas esquecidas, realizamos backup de arquivos importantes e garantimos que seu Android volte a funcionar sem complicações.',
    image: '/assets/services/5.png',
    whatsapp: 'https://wa.me/5588992267095?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20sobre%20o%20servi%C3%A7o%20de%20Manuten%C3%A7%C3%A3o%20de%20sistemas%20Android%3F%20',
    reverse: true,
  },
];

export function Services() {
  const listRef = useScrollReveal({ threshold: 0.05 });

  return (
    <>
      <PageHeader
        label="Suporte técnico"
        title="Serviços"
        subtitle="Soluções profissionais para seu computador e dispositivos móveis."
      />

      <section className="services-section">
        <div className="services-list stagger-children" ref={listRef}>
          {servicesData.map((service) => (
            <div
              className={`service-card${service.reverse ? ' service-card--reverse' : ''}`}
              id={service.id}
              key={service.id}
            >
              <div className="service-card__visual">
                <img src={service.image} alt={service.title} loading="lazy" />
              </div>
              <div className="service-card__content">
                <div className="service-card__icon">
                  <i className={service.icon}></i>
                </div>
                <h2 className="service-card__title">{service.title}</h2>
                <p className="service-card__desc">{service.desc}</p>
                <a
                  href={service.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="service-card__cta"
                >
                  Saiba mais <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
