import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { SEO } from '../../../components/SEO/SEO';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { defaultSettings } from '../../../contexts/SettingsContext';
import './Settings.css';

export function Settings() {
  const [formData, setFormData] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'config', 'global');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            hero: { ...defaultSettings.hero, ...(data.hero || {}) },
            social: { ...defaultSettings.social, ...(data.social || {}) },
            theme: { ...defaultSettings.theme, ...(data.theme || {}) },
            permalinks: { ...defaultSettings.permalinks, ...(data.permalinks || {}) }
          });
        }
      } catch (error) {
        console.error("Erro ao buscar configurações:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, 'config', 'global'), formData);
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert('Erro ao salvar as configurações.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading-screen">Carregando...</div>;

  return (
    <div className="admin-dashboard settings-page">
      <SEO title="Configurações Globais" />
      
      <header className="settings-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Configurações Globais</h2>
        <div className="admin-actions">
          <button className="button" onClick={handleSave} disabled={saving}>
            <Save size={18} /> {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </header>

      <div className="settings-content">
        <section className="settings-section">
          <h3>Página Inicial (Hero)</h3>
          <div className="input-group">
            <label>Nome</label>
            <input type="text" value={formData.hero.name} onChange={(e) => handleChange('hero', 'name', e.target.value)} />
          </div>
          <div className="input-group">
            <label>Título Profissional</label>
            <input type="text" value={formData.hero.title} onChange={(e) => handleChange('hero', 'title', e.target.value)} />
          </div>
          <div className="input-group">
            <label>E-mail de Contato</label>
            <input type="email" value={formData.hero.email} onChange={(e) => handleChange('hero', 'email', e.target.value)} />
          </div>
          <div className="input-group">
            <label>URL da Foto de Perfil</label>
            <input type="text" value={formData.hero.profileImage} onChange={(e) => handleChange('hero', 'profileImage', e.target.value)} />
          </div>
          <div className="input-group">
            <label>Parágrafos da Biografia</label>
            {formData.hero.paragraphs?.map((p, index) => (
              <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <textarea 
                  rows="3" 
                  value={p} 
                  onChange={(e) => {
                    const newParagraphs = [...formData.hero.paragraphs];
                    newParagraphs[index] = e.target.value;
                    handleChange('hero', 'paragraphs', newParagraphs);
                  }} 
                  style={{ flexGrow: 1 }}
                />
                <button 
                  type="button" 
                  className="button button--outline" 
                  style={{ padding: '0 12px', height: 'fit-content' }}
                  onClick={() => {
                    const newParagraphs = formData.hero.paragraphs.filter((_, i) => i !== index);
                    handleChange('hero', 'paragraphs', newParagraphs);
                  }}
                  title="Remover parágrafo"
                >
                  X
                </button>
              </div>
            ))}
            <button 
              type="button" 
              className="button button--outline"
              onClick={() => {
                handleChange('hero', 'paragraphs', [...(formData.hero.paragraphs || []), '']);
              }}
            >
              + Adicionar Parágrafo
            </button>
          </div>
        </section>

        <section className="settings-section">
          <h3>Redes Sociais</h3>
          <div className="input-group">
            <label>GitHub URL</label>
            <input type="url" value={formData.social.github} onChange={(e) => handleChange('social', 'github', e.target.value)} />
          </div>
          <div className="input-group">
            <label>LinkedIn URL</label>
            <input type="url" value={formData.social.linkedin} onChange={(e) => handleChange('social', 'linkedin', e.target.value)} />
          </div>
          <div className="input-group">
            <label>Instagram URL (Opcional)</label>
            <input type="url" value={formData.social.instagram} onChange={(e) => handleChange('social', 'instagram', e.target.value)} />
          </div>
        </section>

        <section className="settings-section">
          <h3>Aparência (Cores)</h3>
          <p className="section-description">Atenção: alterar a cor de fundo requer uso de cores escuras para manter o contraste do texto (que é claro).</p>
          <div className="color-grid">
            <div className="input-group">
              <label>Cor de Destaque (Accent)</label>
              <div className="color-picker-wrapper">
                <input type="color" value={formData.theme.accent} onChange={(e) => handleChange('theme', 'accent', e.target.value)} />
                <span>{formData.theme.accent}</span>
              </div>
            </div>
            <div className="input-group">
              <label>Cor de Fundo Principal</label>
              <div className="color-picker-wrapper">
                <input type="color" value={formData.theme.bgDeep} onChange={(e) => handleChange('theme', 'bgDeep', e.target.value)} />
                <span>{formData.theme.bgDeep}</span>
              </div>
            </div>
            <div className="input-group">
              <label>Cor Secundária (Cards)</label>
              <div className="color-picker-wrapper">
                <input type="color" value={formData.theme.bgCard} onChange={(e) => handleChange('theme', 'bgCard', e.target.value)} />
                <span>{formData.theme.bgCard}</span>
              </div>
            </div>
          </div>
          <div className="input-group" style={{ marginTop: 'var(--space-md)' }}>
            <label>Fonte do Site</label>
            <select 
              value={formData.theme.fontFamily} 
              onChange={(e) => handleChange('theme', 'fontFamily', e.target.value)}
              style={{ width: '100%', padding: 'var(--space-sm) var(--space-md)', background: 'var(--bg-deep)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}
            >
              <option value="Inter, system-ui, sans-serif">Inter (Padrão)</option>
              <option value="'Roboto', sans-serif">Roboto</option>
              <option value="'Outfit', sans-serif">Outfit</option>
              <option value="'JetBrains Mono', monospace">JetBrains Mono (Código)</option>
              <option value="serif">Serif Clássica</option>
            </select>
          </div>
        </section>

        <section className="settings-section">
          <h3>Links Permanentes (Permalinks)</h3>
          <p className="section-description">Defina a estrutura de URLs dinâmicas do seu site.</p>
          <div className="input-group">
            <label>Página de Lista do Blog (Base)</label>
            <div className="url-preview">
              <span className="url-domain">meusite.com</span>
              <input 
                type="text" 
                value={formData.permalinks.listBase} 
                onChange={(e) => handleChange('permalinks', 'listBase', e.target.value)} 
                placeholder="/blog"
              />
            </div>
          </div>
          <div className="input-group" style={{marginTop: 'var(--space-md)'}}>
            <label>Estrutura da URL do Artigo</label>
            <p className="section-description" style={{marginBottom: '8px'}}>Variáveis: <code>:year</code>, <code>:month</code>, <code>:day</code>, <code>:id</code>, <code>:slug</code></p>
            <div className="url-preview">
              <span className="url-domain">meusite.com</span>
              <input 
                type="text" 
                value={formData.permalinks.postStructure} 
                onChange={(e) => handleChange('permalinks', 'postStructure', e.target.value)} 
                placeholder="/blog/:slug ou /:year/:month/:slug"
                style={{ width: '100%', textAlign: 'left', paddingLeft: '8px' }}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
