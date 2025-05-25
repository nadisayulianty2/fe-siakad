import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMataKuliahByKode, createMataKuliah, updateMataKuliah } from '@/services/api';
import type { MataKuliahType } from '@/types/MataKuliah';

const initialForm: MataKuliahType = {
  kode: '',
  nama: '',
  semester: '',
  jurusan: '',
  sks: null
};

export default function MataKuliahForm() {
  const [form, setForm] = useState<MataKuliahType>(initialForm);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const navigate = useNavigate();
  const { kode } = useParams<{ kode: string }>();

  useEffect(() => {
    if (kode) {
      setLoadingData(true);
      getMataKuliahByKode(kode)
        .then((response) => {
          if (response.data) {
            setForm(response.data);
          } else {
            alert('Data mata kuliah tidak ditemukan');
            navigate('/mata-kuliah');
          }
        })
        .catch(() => {
          alert('Gagal memuat data');
          navigate('/mata-kuliah');
        })
        .finally(() => setLoadingData(false));
    }
  }, [kode, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'sks' ? Number(value) : value,
    } as MataKuliahType));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (kode) {
        // Edit mode
        await updateMataKuliah(kode, form);
      } else {
        // Create mode
        await createMataKuliah(form);
      }
      navigate('/mata-kuliah');
    } catch (err) {
      alert('Gagal menyimpan data mata kuliah');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) return <div>Loading data...</div>;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded shadow mt-6">
      <h1 className="text-2xl font-bold mb-6">{kode ? 'Edit Mata Kuliah' : 'Tambah Mata Kuliah'}</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-1">Kode</label>
          <input
            name="kode"
            type="text"
            value={form.kode}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
            placeholder="Misal: IF101"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Nama</label>
          <input
            name="nama"
            type="text"
            value={form.nama}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
            placeholder="Nama Mata Kuliah"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">SKS</label>
          <input
            name="sks"
            type="number"
            min={1}
            value={form.sks ?? ''}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
            placeholder="Jumlah SKS"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Semester</label>
          <input
            name="semester"
            type="text"
            value={form.semester}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
            placeholder="Misal: Ganjil 2025"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Jurusan</label>
          <input
            name="jurusan"
            type="text"
            value={form.jurusan}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
            placeholder="Nama Jurusan"
          />
        </div>

        <div className="md:col-span-2 flex justify-between mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/mata-kuliah')}
            className="text-sm text-gray-500 hover:underline"
          >
            Batal / Kembali
          </button>
        </div>
      </form>
    </div>
  );
}
