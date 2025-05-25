import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteMataKuliah, getMataKuliah } from '@/services/api';
import type { MataKuliahType } from '@/types/MataKuliah';

export default function MataKuliahList() {
  const navigate = useNavigate();
  const [data, setData] = useState<MataKuliahType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = () => {
    getMataKuliah()
      .then((res) => setData(res.data as MataKuliahType[]))
      .catch(() => alert('Gagal mengambil data mata kuliah'));
  };

  useEffect(() => {
    getMataKuliah()
      fetchData();
  }, []);

  const handleDelete = async (kode: string) => {
    const confirmed = window.confirm('Apakah Anda yakin ingin menghapus mata kuliah ini?');
    if (!confirmed) return;

    try {
      await deleteMataKuliah(kode);
      alert('Data berhasil dihapus');
      fetchData();
    } catch (error) {
      alert('Gagal menghapus data mata kuliah');
      console.error(error);
    }
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-lg shadow border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3 border">Kode</th>
              <th className="px-4 py-3 border">Nama</th>
              <th className="px-4 py-3 border">SKS</th>
              <th className="px-4 py-3 border">Semester</th>
              <th className="px-4 py-3 border">Jurusan</th>
              <th className="px-4 py-3 border">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {pageData.map((matkul) => (
              <tr key={matkul.kode} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{matkul.kode}</td>
                <td className="px-4 py-2 border">{matkul.nama}</td>
                <td className="px-4 py-2 border">{matkul.sks}</td>
                <td className="px-4 py-2 border">{matkul.semester}</td>
                <td className="px-4 py-2 border">{matkul.jurusan}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => navigate(`/mata-kuliah/edit/${matkul.kode}`)}
                    className="text-blue-600 hover:underline me-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(matkul.kode)}
                    className="text-red-600 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Tidak ada data mata kuliah.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-4">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 rounded ${
              currentPage === i + 1
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-800 border'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
