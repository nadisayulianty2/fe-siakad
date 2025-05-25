import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import MahasiswaLayout from '@/pages/Mahasiswa';
import MahasiswaList from '@/pages/Mahasiswa/MahasiswaList';
import MahasiswaForm from '@/pages/Mahasiswa/MahasiswaForm';
import MataKuliahLayout from './pages/MataKuliah';
import MataKuliahList from './pages/MataKuliah/MataKuliahList';
import MataKuliahForm from './pages/MataKuliah/MataKuliahForm';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mahasiswa" element={<MahasiswaLayout />}>
            <Route index element={<MahasiswaList />} />
            <Route path="new" element={<MahasiswaForm />} />
          </Route>
          <Route path="/mata-kuliah" element={<MataKuliahLayout />}>
            <Route index element={<MataKuliahList />} />
            <Route path="new" element={<MataKuliahForm />} />
            <Route path="/mata-kuliah/edit/:kode" element={<MataKuliahForm />} />
          </Route>
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
