import MahasiswaList from './MahasiswaList';

export default function Mahasiswa() {

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Manajemen Mahasiswa</h1>
      <MahasiswaList />
    </div>
  );
}
