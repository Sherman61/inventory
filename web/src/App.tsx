import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Boxes } from './pages/Boxes';
import { BoxDetail } from './pages/BoxDetail';
import { Scan } from './pages/Scan';

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/boxes" element={<Boxes />} />
          <Route path="/boxes/:id" element={<BoxDetail />} />
          <Route path="/scan" element={<Scan />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
