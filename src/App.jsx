import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { Layout } from './components/Layout/Layout';
import { AnalyticsTracker } from './components/AnalyticsTracker/AnalyticsTracker';
import { Home } from './pages/Home/Home';
import { Projects } from './pages/Projects/Projects';
import { Services } from './pages/Services/Services';
import { BlogList } from './pages/Blog/BlogList';
import { BlogPost } from './pages/Blog/BlogPost';
import { AdminLayout } from './components/AdminLayout/AdminLayout';
import { Login } from './pages/Admin/Login/Login';
import { Dashboard } from './pages/Admin/Dashboard/Dashboard';
import { Posts } from './pages/Admin/Posts/Posts';
import { Editor } from './pages/Admin/Editor/Editor';
import { Settings } from './pages/Admin/Settings/Settings';
import './App.css';

function AppRoutes() {
  const { settings, loadingSettings } = useSettings();

  if (loadingSettings) {
    return null; // ou um componente de loading global
  }

  const listBase = settings.permalinks?.listBase?.replace(/\/+$/, '') || '/blog';
  const postStructure = settings.permalinks?.postStructure?.replace(/\/+$/, '') || '/blog/:slug';

  return (
    <>
      <AnalyticsTracker />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        <Route path="/projetos" element={<Projects />} />
        <Route path="/servicos" element={<Services />} />
        <Route path={listBase} element={<BlogList />} />
        <Route path={postStructure} element={<BlogPost />} />
      </Route>

      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/posts" element={<Posts />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/editor" element={<Editor />} />
          <Route path="/admin/editor/:id" element={<Editor />} />
        </Route>
      </Route>
    </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <AppRoutes />
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
