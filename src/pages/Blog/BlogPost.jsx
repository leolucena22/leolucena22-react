import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { SEO } from '../../components/SEO/SEO';
import { Calendar, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './BlogPost.css';

export function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const q = query(collection(db, 'posts'), where('slug', '==', slug), limit(1));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const postData = querySnapshot.docs[0].data();
          if (postData.published) {
            setPost({ id: querySnapshot.docs[0].id, ...postData });
          } else {
            navigate('/blog');
          }
        } else {
          navigate('/blog');
        }
      } catch (error) {
        console.error("Erro ao buscar post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  if (loading) {
    return <div className="loading-screen">Carregando artigo...</div>;
  }

  if (!post) {
    return null; // O redirect já lidou com isso no useEffect
  }

  const formattedDate = post.createdAt 
    ? new Date(post.createdAt.toDate()).toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'long', year: 'numeric'
      })
    : '';

  return (
    <article className="blog-post-page">
      <SEO 
        title={post.title} 
        description={post.excerpt}
        url={`/blog/${post.slug}`}
        image={post.coverImage}
      />
      
      <div className="blog-post-header">
        <Link to="/blog" className="back-link">
          <ArrowLeft size={18} /> Voltar para o Blog
        </Link>
        <div className="blog-post-meta">
          <Calendar size={16} />
          <span>Publicado em {formattedDate}</span>
        </div>
        <h1 className="blog-post-title">{post.title}</h1>
      </div>

      {post.coverImage && (
        <div className="blog-post-cover">
          <img src={post.coverImage} alt={post.title} />
        </div>
      )}

      <div className="blog-post-content markdown-preview">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}
