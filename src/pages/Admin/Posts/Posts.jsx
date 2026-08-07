import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db, auth } from '../../../lib/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { SEO } from '../../../components/SEO/SEO';
import { ConfirmModal } from '../../../components/ConfirmModal/ConfirmModal';
import { Pencil, Trash2, Plus } from 'lucide-react';
import './Posts.css';

export function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteDoc(doc(db, 'posts', deleteTarget));
      setPosts(posts.filter(post => post.id !== deleteTarget));
    } catch (error) {
      console.error("Erro ao deletar post:", error);
    } finally {
      setDeleteTarget(null);
    }
  };

  const postToDelete = posts.find(p => p.id === deleteTarget);

  return (
    <div className="admin-posts">
      <SEO title="Meus Posts" />
      <header className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Meus Posts</h2>
        <Link to="/admin/editor" className="button">
          <Plus size={18} /> Novo Post
        </Link>
      </header>

      <main className="admin-content">
        {loading ? (
          <p>Carregando posts...</p>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <p>Você ainda não tem nenhum post.</p>
          </div>
        ) : (
          <div className="posts-table-container">
            <table className="posts-table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.createdAt ? new Date(post.createdAt.toDate()).toLocaleDateString('pt-BR') : '-'}</td>
                    <td>{post.published ? 'Publicado' : 'Rascunho'}</td>
                    <td className="actions-cell">
                      <Link to={`/admin/editor/${post.id}`} className="action-btn edit">
                        <Pencil size={18} />
                      </Link>
                      <button onClick={() => setDeleteTarget(post.id)} className="action-btn delete">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Custom Confirm Modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Excluir post?"
        message={postToDelete ? `O post "${postToDelete.title}" será removido permanentemente. Essa ação não pode ser desfeita.` : ''}
        confirmLabel="Sim, excluir"
        cancelLabel="Cancelar"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        variant="danger"
      />
    </div>
  );
}
