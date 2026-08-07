import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { SEO } from '../../../components/SEO/SEO';
import { ArrowLeft, Save } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Editor.css';

export function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const fetchPost = async () => {
        try {
          const docRef = doc(db, 'posts', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setTitle(data.title || '');
            setSlug(data.slug || '');
            setExcerpt(data.excerpt || '');
            setContent(data.content || '');
            setCoverImage(data.coverImage || '');
            setPublished(data.published || false);
          } else {
            console.error("Post não encontrado");
            navigate('/admin/dashboard');
          }
        } catch (error) {
          console.error("Erro ao buscar post:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [id, navigate, isEditing]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!isEditing) {
      setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title || !slug || !content) {
      alert('Título, Slug e Conteúdo são obrigatórios.');
      return;
    }

    setSaving(true);
    const postData = {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      published,
      updatedAt: serverTimestamp(),
    };

    try {
      if (isEditing) {
        await setDoc(doc(db, 'posts', id), postData, { merge: true });
      } else {
        postData.createdAt = serverTimestamp();
        await addDoc(collection(db, 'posts'), postData);
      }
      navigate('/admin/posts');
    } catch (error) {
      console.error("Erro ao salvar post:", error);
      alert('Erro ao salvar post. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading-screen">Carregando editor...</div>;

  return (
    <div className="editor-container">
      <SEO title={isEditing ? "Editar Post" : "Novo Post"} />
      
      <header className="editor-header">
        <Link to="/admin/posts" className="back-link">
          <ArrowLeft size={18} /> Voltar
        </Link>
        <div className="editor-actions">
          <button 
            type="button" 
            className="button" 
            onClick={handleSave} 
            disabled={saving}
          >
            <Save size={18} /> {saving ? 'Salvando...' : 'Salvar Post'}
          </button>
        </div>
      </header>

      <div className="editor-layout">
        <aside className="editor-sidebar">
          <div className="input-group">
            <label>Título *</label>
            <input 
              type="text" 
              value={title} 
              onChange={handleTitleChange} 
              placeholder="Ex: Como criei meu portfólio" 
              required 
            />
          </div>
          
          <div className="input-group">
            <label>Slug (URL amigável) *</label>
            <input 
              type="text" 
              value={slug} 
              onChange={(e) => setSlug(e.target.value)} 
              placeholder="ex: como-criei-meu-portfolio" 
              required 
            />
          </div>

          <div className="input-group">
            <label>URL da Imagem de Capa</label>
            <input 
              type="text" 
              value={coverImage} 
              onChange={(e) => setCoverImage(e.target.value)} 
              placeholder="https://..." 
            />
          </div>

          <div className="input-group">
            <label>Resumo (Excerpt)</label>
            <textarea 
              value={excerpt} 
              onChange={(e) => setExcerpt(e.target.value)} 
              rows="3"
              placeholder="Um breve resumo do artigo..."
            />
          </div>

          <div className="checkbox-group">
            <label>
              <input 
                type="checkbox" 
                checked={published} 
                onChange={(e) => setPublished(e.target.checked)} 
              />
              Post está Publicado?
            </label>
          </div>
        </aside>

        <main className="editor-main split-view">
          <div className="input-group content-editor">
            <label>Conteúdo (Markdown) *</label>
            <textarea 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              placeholder="Escreva seu post aqui usando Markdown..."
              required
            />
          </div>
          <div className="preview-container">
            <label className="preview-label">Visualização Prévia (Preview)</label>
            <div className="markdown-preview">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content || '*Comece a digitar para ver o preview...*'}
              </ReactMarkdown>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
