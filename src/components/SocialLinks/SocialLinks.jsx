import { useSettings } from '../../contexts/SettingsContext';
import './SocialLinks.css';

const iconMap = {
  linkedin: 'fa-brands fa-linkedin-in',
  instagram: 'fa-brands fa-instagram',
  github: 'fa-brands fa-github',
};

export function SocialLinks({ compact = false }) {
  const { settings } = useSettings();
  const socialData = settings?.social || {};

  return (
    <div className={`social-links${compact ? ' social-links--compact' : ''}`}>
      {Object.entries(socialData).map(([key, href]) => {
        if (!href) return null;
        const icon = iconMap[key] || `fa-brands fa-${key}`;
        
        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={key}
          >
            <i className={icon}></i>
          </a>
        );
      })}
    </div>
  );
}
