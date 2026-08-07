import { Helmet } from 'react-helmet-async';

export function SEO({ title, description, url, image }) {
  const defaultTitle = "Leonardo Lucena — Full Stack Developer";
  const defaultDescription = "Leonardo Lucena – Full Stack Developer apaixonado por tecnologia e educação. Desenvolvimento web, suporte de T.I e organização de eventos acadêmicos.";
  const defaultUrl = "https://leolucena22.github.io";
  const defaultImage = "https://leolucena22.github.io/assets/Perfil - editada.png";

  const seoTitle = title ? `${title} | Leonardo Lucena` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoUrl = url ? `${defaultUrl}${url}` : defaultUrl;
  const seoImage = image || defaultImage;

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:image" content={seoImage} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
    </Helmet>
  );
}
