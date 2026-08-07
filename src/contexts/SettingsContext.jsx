import { createContext, useState, useEffect, useContext } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

const SettingsContext = createContext();

export const defaultSettings = {
  hero: {
    name: 'Leonardo Lucena',
    title: 'Full Stack Developer',
    paragraphs: [
      'Desenvolvedor Full Stack apaixonado por tecnologia e educação. Com formação técnica em Redes de Computadores e cursando Bacharelado em Sistemas de Informação no IFCE, atuo com desenvolvimento web utilizando HTML, CSS, JavaScript, TypeScript e React, além de trabalhar com WordPress, Go e Python.',
      'No campo profissional, presto suporte de T.I para o Instituto Multiprofissional de Ensino (IME), SOBREC e Editora Integrar, com foco em gestão de sistemas OJS e manutenção de plataformas. Também organizo congressos e seminários acadêmicos e faço parte da equipe da VASP Empreendimentos, onde aplico soluções tecnológicas inovadoras.'
    ],
    email: 'leolucena22@vivaldi.net',
    profileImage: '/assets/Perfil - editada.png'
  },
  social: {
    github: 'https://github.com/leolucena22',
    linkedin: 'https://linkedin.com/in/leolucena22',
    instagram: '',
  },
  theme: {
    accent: '#00e5ff',
    bgDeep: '#07070d',
    bgCard: '#12121f',
    fontFamily: 'Inter, system-ui, sans-serif'
  },
  permalinks: {
    listBase: '/blog',
    postStructure: '/blog/:slug'
  }
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loadingSettings, setLoadingSettings] = useState(true);

  useEffect(() => {
    const docRef = doc(db, 'config', 'global');
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSettings({
          hero: { ...defaultSettings.hero, ...(data.hero || {}) },
          social: { ...defaultSettings.social, ...(data.social || {}) },
          theme: { ...defaultSettings.theme, ...(data.theme || {}) },
          permalinks: { ...defaultSettings.permalinks, ...(data.permalinks || {}) }
        });
      }
      setLoadingSettings(false);
    }, (error) => {
      console.error("Erro ao carregar configurações globais:", error);
      setLoadingSettings(false);
    });

    return () => unsubscribe();
  }, []);

  // Inject CSS variables dynamically when theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme.accent) {
      root.style.setProperty('--accent', settings.theme.accent);
      root.style.setProperty('--accent-dim', settings.theme.accent + '1A'); // 10% opacity
      root.style.setProperty('--accent-glow', settings.theme.accent + '40'); // 25% opacity
    }
    
    if (settings.theme.bgDeep) {
      root.style.setProperty('--bg-deep', settings.theme.bgDeep);
    }
    
    if (settings.theme.bgCard) {
      // Sincronizando bg-surface com bg-card para manter harmonia
      root.style.setProperty('--bg-surface', settings.theme.bgCard); 
      root.style.setProperty('--bg-card', settings.theme.bgCard);
    }
    
    if (settings.theme.fontFamily) {
      root.style.setProperty('--font-sans', settings.theme.fontFamily);
    }
  }, [settings.theme]);

  return (
    <SettingsContext.Provider value={{ settings, loadingSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
