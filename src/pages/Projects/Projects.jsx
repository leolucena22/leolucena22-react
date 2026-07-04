import { PageHeader } from '../../components/PageHeader/PageHeader';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import './Projects.css';

const projectsData = [
  {
    icon: 'fa-solid fa-file-signature',
    title: 'Sistema de Termo de Autorização',
    desc: 'Plataforma para gerar, enviar e registrar termos de autorização de forma rápida e segura. Permite personalização do documento, coleta de aceite/assinatura digital e padronização do processo.',
    link: 'https://leolucena22.github.io/projects/termo-autorizacao/',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    icon: 'fa-brands fa-whatsapp',
    title: 'Sistema de Mensagens Dinâmicas',
    desc: 'Ferramenta para agilizar o envio de mensagens personalizadas via WhatsApp a partir de planilhas Excel. Ideal para organizadores de eventos, professores e equipes de atendimento.',
    link: 'https://leolucena22.github.io/projects/enviar-mensagem/',
    tags: ['HTML', 'CSS', 'JavaScript', 'Excel'],
  },
  {
    icon: 'fa-solid fa-chart-line',
    title: 'Simulador CDI',
    desc: 'Ferramenta para facilitar o cálculo de investimentos atrelados ao CDI. Ideal para investidores e estudantes que desejam simular rendimentos com base em taxas atualizadas e parâmetros personalizados.',
    link: 'https://leolucena22.github.io/projects/calculadora-cdi',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    icon: 'fa-solid fa-align-left',
    title: 'Formatador de Resumos',
    desc: 'Ferramenta para automatizar a formatação de resumos científicos. Permite que pesquisadores e acadêmicos padronizem seus textos rapidamente, garantindo estrutura correta e conteúdo pronto para submissão.',
    link: 'https://leolucena22.github.io/projects/formatar-resumo',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    icon: 'fa-solid fa-bullseye',
    title: 'Calculadora de Metas',
    desc: 'Ferramenta para acompanhamento de metas financeiras dentro de eventos. Permite monitorar o progresso em tempo real, garantindo visão clara sobre o atingimento de objetivos.',
    link: 'https://leolucena22.github.io/projects/meta-sabado',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    icon: 'fa-solid fa-weight-scale',
    title: 'Calculadora IMC',
    desc: 'Calculadora de Índice de Massa Corporal. Ao inserir peso e altura, a ferramenta calcula seu IMC e exibe a classificação correspondente de forma rápida e visual.',
    link: 'https://leolucena22.github.io/projects/imc/',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    icon: 'fa-solid fa-certificate',
    title: 'Gerador de Certificados',
    desc: 'Criação automática de textos para diversos tipos de certificados: participação, apresentação de trabalho, revisão e mais. Texto personalizado pronto para copiar e utilizar.',
    link: 'https://leolucena22.github.io/projects/certificados/',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    icon: 'fa-solid fa-link',
    title: 'Gerador de Links Diretos',
    desc: 'Ferramenta que facilita a criação de links diretos para modelos de documentos: resumos expandidos, apresentações orais e e-banners. Interface simples e objetiva.',
    link: 'https://leolucena22.github.io/projects/gerador-links-anexos',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    icon: 'fa-brands fa-whatsapp',
    title: 'Iniciar Conversa no WhatsApp',
    desc: 'Inicie uma conversa diretamente no WhatsApp com um número específico, sem precisar salvar o contato no celular. Rápido e prático.',
    link: 'https://leolucena22.github.io/projects/whatsapp/',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    icon: 'fa-solid fa-cubes',
    title: 'Calculadora de Pedras',
    desc: 'Ferramenta para calcular quantidades de pedras cariri em diferentes tamanhos. Útil para profissionais de construção e paisagismo.',
    link: 'https://leolucena22.github.io/projects/calculadora-pedras',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
];

export function Projects() {
  const gridRef = useScrollReveal({ threshold: 0.05 });

  return (
    <>
      <PageHeader
        label="Portfólio"
        title="Projetos"
        subtitle="Ferramentas e aplicações web que desenvolvi para resolver problemas reais."
      />

      <section className="projects-section">
        <div className="projects-grid stagger-children" ref={gridRef}>
          {projectsData.map((project) => (
            <div className="project-card" key={project.title}>
              <div className="project-card__icon">
                <i className={project.icon}></i>
              </div>
              <h4 className="project-card__title">{project.title}</h4>
              <p className="project-card__desc">{project.desc}</p>
              <div className="project-card__tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tech-tag">{tag}</span>
                ))}
              </div>
              <a
                className="project-card__link"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
