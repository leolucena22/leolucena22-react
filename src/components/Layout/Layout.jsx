import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import { ScrollProgress } from '../ScrollProgress/ScrollProgress';
import { CursorGlow } from '../CursorGlow/CursorGlow';
import { useScrollToTop } from '../../hooks/useScrollToTop';

export function Layout() {
  useScrollToTop();
  const { pathname } = useLocation();

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main className="page-transition" key={pathname}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
