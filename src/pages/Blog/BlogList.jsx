import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { SEO } from '../../components/SEO/SEO';
import { useSettings } from '../../contexts/SettingsContext';
import { generatePostLink } from '../../utils/permalinks';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import './BlogList.css';

export function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { settings, loadingSettings } = useSettings();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, 'posts'), 
          where('published', '==', true)
        );
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })).sort((a, b) => {
          const dateA = a.createdAt ? a.createdAt.toMillis() : 0;
          const dateB = b.createdAt ? b.createdAt.toMillis() : 0;
          return dateB - dateA;
        });
        setPosts(postsData);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loadingSettings) return <div className="loading-state">Carregando...</div>;

  const postStructure = settings?.permalinks?.postStructure || '/blog/:slug';

  return (
    <>
      <SEO 
        title="Blog" 
        description="Artigos, tutoriais e pensamentos sobre desenvolvimento web, tecnologia e carreira."
        url="/blog"
      />
      <PageHeader
        label="Artigos"
        title="Blog"
        subtitle="Compartilhando conhecimento e experiências sobre tecnologia."
      />

      <section className="blog-list-section">
        <div className="blog-grid">
          {loading ? (
            <div className="empty-state">Carregando artigos...</div>
          ) : posts.length === 0 ? (
            <div className="empty-state">Nenhum artigo publicado ainda.</div>
          ) : (
            posts.map(post => (
              <article key={post.id} className="blog-card">
                {post.coverImage && (
                  <Link to={generatePostLink(post, postStructure)} className="blog-card__image">
                    <img src={post.coverImage} alt={post.title} loading="lazy" />
                  </Link>
                )}
                <div className="blog-card__content">
                  <div className="blog-card__meta">
                    <Calendar size={14} />
                    <span>
                      {post.createdAt ? new Date(post.createdAt.toMillis()).toLocaleDateString('pt-BR', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      }) : ''}
                    </span>
                  </div>
                  <h3 className="blog-card__title">
                    <Link to={generatePostLink(post, postStructure)}>{post.title}</Link>
                  </h3>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                  <Link to={generatePostLink(post, postStructure)} className="blog-card__link">
                    Ler mais <span>→</span>
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </>
  );
}
