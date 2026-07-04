import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Home } from './pages/Home/Home';
import { Projects } from './pages/Projects/Projects';
import { Services } from './pages/Services/Services';
import './App.css';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/projetos" element={<Projects />} />
        <Route path="/servicos" element={<Services />} />
      </Route>
    </Routes>
  );
}

export default App;
