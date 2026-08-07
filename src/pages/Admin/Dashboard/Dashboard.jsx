import { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { SEO } from '../../../components/SEO/SEO';
import { TrendingUp, FileText, Eye } from 'lucide-react';
import './Dashboard.css';

export function Dashboard() {
  const [stats, setStats] = useState({ todayViews: 0, totalPosts: 0, topPage: '-' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const postsSnap = await getDocs(collection(db, 'posts'));
        const totalPosts = postsSnap.size;

        const today = new Date().toISOString().split('T')[0];
        const statsRef = doc(db, 'stats', today);
        const statsSnap = await getDoc(statsRef);
        
        let todayViews = 0;
        let topPage = '-';
        let highestViews = 0;

        if (statsSnap.exists()) {
          const data = statsSnap.data();
          todayViews = data.totalViews || 0;
          
          if (data.paths) {
            for (const [path, views] of Object.entries(data.paths)) {
              if (views > highestViews) {
                highestViews = views;
                topPage = path.replace(/_/g, '/');
                if (topPage === 'home') topPage = '/';
              }
            }
          }
        }

        setStats({ todayViews, totalPosts, topPage });
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="admin-overview">
      <SEO title="Visão Geral | Painel Admin" />
      <header className="admin-header" style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Visão Geral</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Acompanhe o desempenho do seu site.</p>
      </header>

      {loading ? (
        <p>Carregando métricas...</p>
      ) : (
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: 'rgba(0, 229, 255, 0.1)', color: 'var(--accent)' }}>
              <Eye size={24} />
            </div>
            <div className="metric-info">
              <h3>Visitas Hoje</h3>
              <p className="metric-value">{stats.todayViews}</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
              <FileText size={24} />
            </div>
            <div className="metric-info">
              <h3>Total de Artigos</h3>
              <p className="metric-value">{stats.totalPosts}</p>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
              <TrendingUp size={24} />
            </div>
            <div className="metric-info">
              <h3>Página em Alta</h3>
              <p className="metric-value" style={{ fontSize: '1.2rem' }}>{stats.topPage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
