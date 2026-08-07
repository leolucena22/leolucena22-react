import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { doc, setDoc, increment } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';

export function AnalyticsTracker() {
  const location = useLocation();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) return; // Não conta visitas do dono logado
    if (location.pathname.startsWith('/admin')) return;

    const recordVisit = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const statsRef = doc(db, 'stats', today);
        
        const path = location.pathname;
        const safePath = path === '/' ? 'home' : path.replace(/^\//, '').replace(/\//g, '_');

        await setDoc(statsRef, {
          totalViews: increment(1),
          [`paths.${safePath}`]: increment(1)
        }, { merge: true });
      } catch (error) {
        console.error("Erro ao gravar métrica:", error);
      }
    };

    recordVisit();
  }, [location.pathname, currentUser]);

  return null;
}
