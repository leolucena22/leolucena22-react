import './SocialLinks.css';

const socialData = [
  { href: 'https://www.linkedin.com/in/leolucena22/', label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in' },
  { href: 'https://instagram.com/leolucena22', label: 'Instagram', icon: 'fa-brands fa-instagram' },
  { href: 'https://github.com/leolucena22', label: 'GitHub', icon: 'fa-brands fa-github' },
  { href: 'https://facebook.com/leolucena22', label: 'Facebook', icon: 'fa-brands fa-facebook-f' },
  { href: 'https://twitter.com/leolucena22', label: 'Twitter / X', icon: 'fa-brands fa-x-twitter' },
  { href: 'https://tiktok.com/@leolucena22', label: 'TikTok', icon: 'fa-brands fa-tiktok' },
  { href: 'https://youtube.com/@leolucena2203', label: 'YouTube', icon: 'fa-brands fa-youtube' },
  { href: 'https://steamcommunity.com/id/leolucena22/', label: 'Steam', icon: 'fa-brands fa-steam' },
];

export function SocialLinks({ compact = false }) {
  return (
    <div className={`social-links${compact ? ' social-links--compact' : ''}`}>
      {socialData.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
        >
          <i className={link.icon}></i>
        </a>
      ))}
    </div>
  );
}
